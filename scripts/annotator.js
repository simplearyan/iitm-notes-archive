/**
 * IITM Archive Annotator - Core Logic
 */
(function() {
    let isEnabled = false;
    let isDrawing = false;
    let currentTool = 'pen';
    let currentColor = '#6366f1'; // Indigo-500
    let currentWeight = 3;
    let elements = [];
    let tempElement = null;
    
    let container, canvasStatic, ctxStatic, rcStatic, canvasDynamic, ctxDynamic, rcDynamic, toolbar;

    function init() {
        container = document.getElementById('iframe-container');
        if (!container) return;

        // Create Canvas Layers
        canvasStatic = document.createElement('canvas');
        canvasStatic.id = 'anno-canvas-static';
        canvasStatic.className = 'absolute inset-0 z-[1] pointer-events-none transition-opacity duration-300 opacity-0';
        
        canvasDynamic = document.createElement('canvas');
        canvasDynamic.id = 'anno-canvas-dynamic';
        canvasDynamic.className = 'absolute inset-0 z-[2] pointer-events-none transition-opacity duration-300 opacity-0';
        
        container.appendChild(canvasStatic);
        container.appendChild(canvasDynamic);

        ctxStatic = canvasStatic.getContext('2d');
        rcStatic = rough.canvas(canvasStatic);
        ctxDynamic = canvasDynamic.getContext('2d');
        rcDynamic = rough.canvas(canvasDynamic);

        // Events
        canvasDynamic.addEventListener('pointerdown', handleDown);
        window.addEventListener('pointermove', handleMove);
        window.addEventListener('pointerup', handleUp);
        window.addEventListener('resize', resizeCanvas);
        
        // Listen for lesson changes to reload annotations
        window.addEventListener('hashchange', () => {
            if (isEnabled) loadAnnotations();
        });

        resizeCanvas();
    }

    function toggleAnnotator() {
        isEnabled = !isEnabled;
        const btn = document.getElementById('draw-toggle-btn');
        const toolbar = document.getElementById('anno-toolbar');
        
        if (isEnabled) {
            canvasStatic.classList.remove('opacity-0', 'pointer-events-none');
            canvasDynamic.classList.remove('opacity-0', 'pointer-events-none');
            canvasDynamic.classList.add('cursor-crosshair');
            toolbar.classList.remove('hidden');
            if (btn) btn.classList.add('active-draw');
            loadAnnotations();
        } else {
            canvasStatic.classList.add('opacity-0', 'pointer-events-none');
            canvasDynamic.classList.add('opacity-0', 'pointer-events-none');
            canvasDynamic.classList.remove('cursor-crosshair');
            toolbar.classList.add('hidden');
            if (btn) btn.classList.remove('active-draw');
        }
    }

    function resizeCanvas() {
        if (!container || !canvasStatic) return;
        const rect = container.getBoundingClientRect();
        [canvasStatic, canvasDynamic].forEach(c => {
            c.width = rect.width;
            c.height = rect.height;
        });
        redraw();
    }

    function getCoords(e) {
        const rect = canvasDynamic.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    function handleDown(e) {
        if (!isEnabled || e.button !== 0) return;
        isDrawing = true;
        const pos = getCoords(e);

        tempElement = {
            type: currentTool,
            points: [[pos.x, pos.y]],
            stroke: currentColor,
            strokeWidth: currentWeight,
            seed: Math.floor(Math.random() * 100000)
        };
    }

    function handleMove(e) {
        if (!isDrawing || !tempElement) return;
        const pos = getCoords(e);
        
        if (currentTool === 'pen') {
            tempElement.points.push([pos.x, pos.y]);
        } else {
            // Shapes use start and end points
            if (tempElement.points.length > 1) tempElement.points[1] = [pos.x, pos.y];
            else tempElement.points.push([pos.x, pos.y]);
        }

        ctxDynamic.clearRect(0, 0, canvasDynamic.width, canvasDynamic.height);
        drawElement(rcDynamic, tempElement);
    }

    function handleUp() {
        if (!isDrawing || !tempElement) return;
        elements.push(tempElement);
        tempElement = null;
        isDrawing = false;
        
        ctxDynamic.clearRect(0, 0, canvasDynamic.width, canvasDynamic.height);
        saveAnnotations();
        redraw();
    }

    function redraw() {
        if (!ctxStatic) return;
        ctxStatic.clearRect(0, 0, canvasStatic.width, canvasStatic.height);
        elements.forEach(el => drawElement(rcStatic, el));
    }

    function drawElement(rc, el) {
        const opts = { 
            stroke: el.stroke, 
            strokeWidth: el.strokeWidth, 
            roughness: el.type === 'pen' ? 0.5 : 1.5,
            seed: el.seed 
        };

        if (el.type === 'pen') {
            rc.linearPath(el.points, opts);
        } else if (el.type === 'rect') {
            const [p1, p2] = el.points;
            if (!p2) return;
            rc.rectangle(Math.min(p1[0], p2[0]), Math.min(p1[1], p2[1]), Math.abs(p2[0]-p1[0]), Math.abs(p2[1]-p1[1]), opts);
        } else if (el.type === 'arrow') {
            const [p1, p2] = el.points;
            if (!p2) return;
            drawArrow(rc, p1[0], p1[1], p2[0], p2[1], opts);
        }
    }

    function drawArrow(rc, x1, y1, x2, y2, opts) {
        rc.line(x1, y1, x2, y2, opts);
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const headlen = 15;
        rc.line(x2, y2, x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6), opts);
        rc.line(x2, y2, x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6), opts);
    }

    function clearAnnotations() {
        if (confirm('Clear all drawings for this module?')) {
            elements = [];
            saveAnnotations();
            redraw();
        }
    }

    function saveAnnotations() {
        const key = 'anno_' + window.location.hash;
        localStorage.setItem(key, JSON.stringify(elements));
    }

    function loadAnnotations() {
        const key = 'anno_' + window.location.hash;
        const data = localStorage.getItem(key);
        elements = data ? JSON.parse(data) : [];
        redraw();
    }

    // Toolbox Controls
    window.setAnnoTool = (tool) => {
        currentTool = tool;
        document.querySelectorAll('.anno-tool-btn').forEach(b => b.classList.toggle('active-tool', b.dataset.tool === tool));
    };

    window.setAnnoColor = (color) => {
        currentColor = color;
        document.querySelectorAll('.anno-color-btn').forEach(b => b.classList.toggle('ring-2', b.dataset.color === color));
    };

    window.clearAnno = clearAnnotations;
    window.toggleAnno = toggleAnnotator;

    // Export to global for UI
    window.IITM_Annotator = { init, toggle: toggleAnnotator };

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
