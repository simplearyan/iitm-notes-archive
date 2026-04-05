/**
 * IITM Archive Annotator - Premium Engine (V2.0)
 * Optimized for High-Performance, Touch Support, and Keyboard Productivity.
 */
(function() {
    let isEnabled = false;
    let isDrawing = false;
    let activePointerId = null;
    let currentTool = 'pen';
    let currentColor = '#4f46e5'; 
    let currentWeight = 4;
    let elements = [];
    let tempElement = null;
    
    let container, canvasStatic, ctxStatic, rcStatic, canvasDynamic, ctxDynamic, rcDynamic;

    function init() {
        container = document.getElementById('iframe-container');
        if (!container) return;

        if (document.getElementById('anno-canvas-static')) return;

        // Create Canvas Layers
        canvasStatic = document.createElement('canvas');
        canvasStatic.id = 'anno-canvas-static';
        canvasStatic.className = 'absolute inset-0 z-[1] pointer-events-none transition-opacity duration-300 opacity-0';
        
        canvasDynamic = document.createElement('canvas');
        canvasDynamic.id = 'anno-canvas-dynamic';
        canvasDynamic.className = 'absolute inset-0 z-[2] transition-opacity duration-300 opacity-0 pointer-events-none';
        
        container.appendChild(canvasStatic);
        container.appendChild(canvasDynamic);

        ctxStatic = canvasStatic.getContext('2d');
        rcStatic = rough.canvas(canvasStatic);
        ctxDynamic = canvasDynamic.getContext('2d');
        rcDynamic = rough.canvas(canvasDynamic);

        // Interaction
        canvasDynamic.addEventListener('pointerdown', handleDown);
        window.addEventListener('pointermove', handleMove);
        window.addEventListener('pointerup', handleUp);
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('keydown', handleKeyDown);
        
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
            canvasStatic.classList.remove('opacity-0');
            canvasDynamic.classList.remove('opacity-0');
            // Check current tool for pointer-events
            updateCanvasInteractivity();
            toolbar.classList.remove('hidden');
            if (btn) btn.classList.add('active-draw');
            loadAnnotations();
        } else {
            canvasStatic.classList.add('opacity-0', 'pointer-events-none');
            canvasDynamic.classList.add('opacity-0', 'pointer-events-none');
            toolbar.classList.add('hidden');
            if (btn) btn.classList.remove('active-draw');
        }
    }

    function updateCanvasInteractivity() {
        if (!isEnabled) return;
        if (currentTool === 'cursor') {
            canvasDynamic.style.pointerEvents = 'none';
            canvasDynamic.style.cursor = 'default';
            // Focus the iframe so keyboard scrolling works immediately
            const iframe = document.querySelector('iframe');
            if (iframe) iframe.focus();
        } else {
            canvasDynamic.style.pointerEvents = 'auto';
            canvasDynamic.style.cursor = 'crosshair';
        }
    }

    function resizeCanvas() {
        if (!container || !canvasStatic) return;
        const rect = container.getBoundingClientRect();
        [canvasStatic, canvasDynamic].forEach(c => {
            if (c.width !== rect.width || c.height !== rect.height) {
                c.width = rect.width;
                c.height = rect.height;
            }
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
        if (!isEnabled || !e.isPrimary || e.button !== 0 || currentTool === 'cursor') return;
        
        isDrawing = true;
        activePointerId = e.pointerId;
        const pos = getCoords(e);

        if (currentTool === 'eraser') {
            eraseAt(pos.x, pos.y);
            return;
        }

        tempElement = {
            type: currentTool,
            points: [[pos.x, pos.y]],
            stroke: currentColor,
            strokeWidth: currentWeight,
            seed: Math.floor(Math.random() * 100000)
        };
    }

    function handleMove(e) {
        if (!isDrawing || e.pointerId !== activePointerId) return;
        const pos = getCoords(e);
        
        if (currentTool === 'eraser') {
            eraseAt(pos.x, pos.y);
            return;
        }

        if (!tempElement) return;

        if (currentTool === 'pen') {
            tempElement.points.push([pos.x, pos.y]);
        } else {
            if (tempElement.points.length > 1) tempElement.points[1] = [pos.x, pos.y];
            else tempElement.points.push([pos.x, pos.y]);
        }

        ctxDynamic.clearRect(0, 0, canvasDynamic.width, canvasDynamic.height);
        drawElement(rcDynamic, tempElement);
    }

    function handleUp(e) {
        if (!isDrawing || e.pointerId !== activePointerId) return;
        
        if (tempElement) {
            elements.push(tempElement);
            tempElement = null;
        }
        
        isDrawing = false;
        activePointerId = null;
        
        ctxDynamic.clearRect(0, 0, canvasDynamic.width, canvasDynamic.height);
        saveAnnotations();
        redraw();
    }

    function eraseAt(x, y) {
        const threshold = currentWeight * 2 + 10;
        const initialCount = elements.length;
        elements = elements.filter(el => {
            if (el.type === 'pen') {
                return !el.points.some(p => Math.hypot(p[0]-x, p[1]-y) < threshold);
            } else {
                return !el.points.some(p => Math.hypot(p[0]-x, p[1]-y) < threshold);
            }
        });
        if (elements.length !== initialCount) {
            saveAnnotations();
            redraw();
        }
    }

    function undo() {
        if (elements.length > 0) {
            elements.pop();
            saveAnnotations();
            redraw();
        }
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
            roughness: el.type === 'pen' ? 0.5 : 1,
            seed: el.seed 
        };

        if (el.type === 'pen') {
            rc.linearPath(el.points, opts);
        } else if (el.type === 'line') {
            const [p1, p2] = el.points;
            if (p2) rc.line(p1[0], p1[1], p2[0], p2[1], opts);
        } else if (el.type === 'rect') {
            const [p1, p2] = el.points;
            if (p2) rc.rectangle(Math.min(p1[0], p2[0]), Math.min(p1[1], p2[1]), Math.abs(p2[0]-p1[0]), Math.abs(p2[1]-p1[1]), opts);
        } else if (el.type === 'ellipse') {
            const [p1, p2] = el.points;
            if (p2) {
                const cx = (p1[0] + p2[0]) / 2;
                const cy = (p1[1] + p2[1]) / 2;
                rc.ellipse(cx, cy, Math.abs(p2[0]-p1[0]), Math.abs(p2[1]-p1[1]), opts);
            }
        } else if (el.type === 'triangle') {
             const [p1, p2] = el.points;
             if (p2) {
                 const x1 = p1[0], y1 = p1[1];
                 const x2 = p2[0], y2 = p2[1];
                 rc.polygon([[x1 + (x2-x1)/2, y1], [x1, y2], [x2, y2]], opts);
             }
        } else if (el.type === 'arrow') {
            const [p1, p2] = el.points;
            if (p2) {
                drawArrow(rc, p1[0], p1[1], p2[0], p2[1], opts);
            }
        }
    }

    function drawArrow(rc, x1, y1, x2, y2, opts) {
        rc.line(x1, y1, x2, y2, opts);
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const headlen = 15 + (opts.strokeWidth || 4) * 2;
        rc.line(x2, y2, x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6), opts);
        rc.line(x2, y2, x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6), opts);
    }


    function handleKeyDown(e) {
        if (!isEnabled) return;
        const active = document.activeElement;
        if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) return;

        const key = e.key.toLowerCase();
        const isCtrl = e.ctrlKey || e.metaKey;

        if (isCtrl && key === 'z') { e.preventDefault(); undo(); return; }
        if (key === 'escape') { toggleAnnotator(); return; }

        const toolMap = { 'v':'cursor', 'a':'cursor', 'p':'pen', 'l':'line', 'r':'rect', 'o':'ellipse', 'c':'ellipse', 't':'triangle', 'e':'eraser', 'w':'arrow' };
        if (toolMap[key]) { setAnnoTool(toolMap[key]); return; }

        const colorMap = { '1':'#4f46e5', '2':'#10b981', '3':'#ef4444', '4':'#f59e0b', '5':'#1e293b' };
        if (colorMap[key]) { setAnnoColor(colorMap[key]); return; }

        const weights = [2, 4, 8];
        if (key === '[' || key === ']') {
            const idx = weights.indexOf(currentWeight);
            const nextIdx = key === '[' ? (idx - 1 + weights.length) % weights.length : (idx + 1) % weights.length;
            setAnnoWeight(weights[nextIdx]);
        }

        if (key === 'x' || (key === 'delete' && !isCtrl)) clearAnno();
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

    // Toolbox Exposed Controls
    window.setAnnoTool = (tool) => {
        currentTool = tool;
        updateCanvasInteractivity();
        document.querySelectorAll('.anno-tool-btn').forEach(b => {
            b.classList.toggle('active-tool', b.dataset.tool === tool);
        });
    };

    window.setAnnoColor = (color) => {
        currentColor = color;
        document.querySelectorAll('.anno-color-dot').forEach(b => {
            b.classList.toggle('active-color', b.dataset.color === color);
        });
    };

    window.setAnnoWeight = (weight) => {
        currentWeight = parseInt(weight);
        document.querySelectorAll('.anno-weight-btn').forEach(b => {
            b.classList.toggle('active-weight', parseInt(b.dataset.weight) === currentWeight);
        });
    };

    window.clearAnno = () => {
        elements = [];
        saveAnnotations();
        redraw();
    };

    window.undoAnno = undo;
    window.toggleAnno = toggleAnnotator;

    window.IITM_Annotator = { init, toggle: toggleAnnotator };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
