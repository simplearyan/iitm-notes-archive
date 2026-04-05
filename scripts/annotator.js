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
    let isProMode = true; // Use Adaptive Viewport by default for mobile safety
    let elements = [];
    let tempElement = null;
    
    let container, iframe, canvasStatic, ctxStatic, rcStatic, canvasDynamic, ctxDynamic, rcDynamic;

    console.log("IITM Annotator: Protocol Security Shield V1.0 (Ready)");

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
        window.addEventListener('pointercancel', handleUp); // Handle touch interruptions
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('keydown', handleKeyDown);
        
        iframe = document.getElementById('viewer');
        
        window.addEventListener('hashchange', () => {
            if (isEnabled) loadAnnotations();
            // Re-bind scroll listener to new content
            setTimeout(bindIframeScroll, 1000); 
        });

        // Initial bind
        setTimeout(bindIframeScroll, 2000);

        resizeCanvas();
    }

    // --- SECURITY SAFE HELPERS ---
    function getSafeWindow() {
        try {
            if (iframe && iframe.contentWindow) {
                // Try to access a property to trigger a security error if blocked
                const test = iframe.contentWindow.location.href;
                return iframe.contentWindow;
            }
        } catch (e) {}
        return null;
    }

    function getSafeDoc() {
        try {
            if (iframe && iframe.contentDocument) return iframe.contentDocument;
            const win = getSafeWindow();
            if (win) return win.document;
        } catch (e) {}
        return null;
    }

    function getSafeScroll() {
        const win = getSafeWindow();
        if (win) {
            try {
                return { x: win.pageXOffset || 0, y: win.pageYOffset || 0 };
            } catch (e) {}
        }
        return { x: 0, y: 0 };
    }

    function bindIframeScroll() {
        const win = getSafeWindow();
        if (!win) {
            console.warn("IITM Annotator: Iframe scroll access is blocked by browser security (likely file:// protocol). Sticky/Adaptive scrolling will be disabled.");
            return;
        }
        win.addEventListener('scroll', () => {
            if (isEnabled && isProMode) requestAnimationFrame(redraw);
        }, { passive: true });
    }

    function toggleAnnoMode() {
        isProMode = !isProMode;
        const btn = document.getElementById('anno-mode-btn');
        if (btn) {
            btn.title = isProMode ? "Adaptive Performance Mode (⚡)" : "Natural Sticky Mode (🏝️)";
            const icon = btn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', isProMode ? 'zap' : 'monitor');
                if (window.lucide) lucide.createIcons();
            }
            btn.classList.toggle('text-amber-500', isProMode);
            btn.classList.toggle('text-emerald-500', !isProMode);
        }
        resizeCanvas();
        redraw();
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
            canvasDynamic.style.touchAction = 'none'; // Prevent scrolling while drawing
        }
    }

    function resizeCanvas() {
        if (!container || !canvasStatic) return;
        const rect = container.getBoundingClientRect();
        let fullWidth = rect.width;
        let fullHeight = rect.height;

        const doc = getSafeDoc();
        // In Sticky Mode, we grow the canvas to the full document height
        if (!isProMode && doc) {
            const body = doc.body;
            const html = doc.documentElement;
            if (body && html) {
                fullHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
                fullWidth = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
            }
        }

        [canvasStatic, canvasDynamic].forEach(c => {
            if (c.width !== fullWidth || c.height !== fullHeight) {
                c.width = fullWidth;
                c.height = fullHeight;
            }
        });
        redraw();
    }

    function getCoords(e) {
        const rect = canvasDynamic.getBoundingClientRect();
        const scroll = getSafeScroll();
        return {
            px: (e.clientX - rect.left), 
            py: (e.clientY - rect.top),  
            x: (e.clientX - rect.left) + scroll.x, 
            y: (e.clientY - rect.top) + scroll.y   
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
        
        const scroll = getSafeScroll();
        // ⚡ Apply transform to dynamic layer if in Pro Mode
        if (isProMode && (scroll.x > 0 || scroll.y > 0)) {
            ctxDynamic.save();
            ctxDynamic.setTransform(1, 0, 0, 1, -scroll.x, -scroll.y);
            drawElement(rcDynamic, tempElement);
            ctxDynamic.restore();
        } else {
            drawElement(rcDynamic, tempElement);
        }
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
        
        const scroll = getSafeScroll();
        // 🚀 PRO MODE TRANSFORM 🚀
        if (isProMode && (scroll.x > 0 || scroll.y > 0)) {
            ctxStatic.save();
            ctxStatic.setTransform(1, 0, 0, 1, -scroll.x, -scroll.y);
            elements.forEach(el => drawElement(rcStatic, el));
            ctxStatic.restore();
        } else {
            elements.forEach(el => drawElement(rcStatic, el));
        }
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

        // 🚀 NAVIGATION PROXY: Scroll the iframe even while drawing
        const navigationKeys = ['arrowup', 'arrowdown', 'pageup', 'pagedown', 'home', 'end'];
        if (navigationKeys.includes(key)) {
            const win = getSafeWindow();
            if (win) {
                const scrollAmount = 60;
                const pageAmount = win.innerHeight * 0.8;

                switch(key) {
                    case 'arrowup': win.scrollBy({ top: -scrollAmount, behavior: 'auto' }); break;
                    case 'arrowdown': win.scrollBy({ top: scrollAmount, behavior: 'auto' }); break;
                    case 'pageup': win.scrollBy({ top: -pageAmount, behavior: 'smooth' }); break;
                    case 'pagedown': win.scrollBy({ top: pageAmount, behavior: 'smooth' }); break;
                    case 'home': win.scrollTo({ top: 0, behavior: 'smooth' }); break;
                    case 'end': win.scrollTo({ top: win.document.body.scrollHeight, behavior: 'smooth' }); break;
                }
                if (currentTool !== 'cursor') e.preventDefault();
            }
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
    window.toggleAnnoMode = toggleAnnoMode;

    window.IITM_Annotator = { init, toggle: toggleAnnotator, toggleMode: toggleAnnoMode };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
