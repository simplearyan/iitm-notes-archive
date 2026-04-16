/**
 * IITM Annotation Engine (Rough-Board)
 * Optimized for Mobile, Touch, and Performance.
 */

const ANN = {
    active: false,
    tool: 'pen',
    color: '#6366f1',
    size: 3.5,
    canvas: null,
    rc: null,
    shapes: [],
    currentPath: null,
    currentDoc: '',
    penPoints: [], // Points for freehand tool

    init() {
        this.canvas = document.getElementById('annotation-layer');
        if (!this.canvas) return;
        this.rc = rough.svg(this.canvas);
        this.setupEvents();
        console.log("🖋️ IITM Annotator: Initialized V10 (Mobile & Touch)");
        
        // Initial tool state
        this.setTool('pen');
        this.setColor(this.color);
        this.setSize(this.size);
    },

    toggle() {
        this.active = !this.active;
        this.canvas.classList.toggle('active', this.active);
        document.body.classList.toggle('drawing-mode', this.active);
        
        const toolbar = document.getElementById('anno-toolbar');
        const toggleBtn = document.getElementById('toggle-anno');
        
        if (this.active) {
            toolbar.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
            toggleBtn.classList.add('bg-indigo-600', 'rotate-45');
        } else {
            toolbar.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
            toggleBtn.classList.remove('bg-indigo-600', 'rotate-45');
        }
    },

    setTool(t) {
        this.tool = t;
        document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
        const btn = document.getElementById(`tool-${t}`);
        if (btn) btn.classList.add('active');
    },

    setColor(c) { 
        this.color = c; 
        document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
        const activeDot = Array.from(document.querySelectorAll('.color-dot')).find(d => {
            const oc = d.getAttribute('onclick');
            return oc && oc.includes(c);
        });
        if (activeDot) activeDot.classList.add('active');
    },

    setSize(s) { 
        this.size = s; 
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        const activeBtn = document.getElementById(`size-${s}`);
        if (activeBtn) activeBtn.classList.add('active');
    },

    setupEvents() {
        let startX, startY;
        let isDrawing = false;

        const getCoords = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: clientX - rect.left,
                y: clientY - rect.top
            };
        };

        const handleStart = (e) => {
            if (!this.active) return;
            if (e.touches && this.active) e.preventDefault();
            
            isDrawing = true;
            const coords = getCoords(e);
            startX = coords.x;
            startY = coords.y;
            this.penPoints = [[startX, startY]];
        };

        const handleMove = (e) => {
            if (!isDrawing) return;
            if (e.touches && this.active) e.preventDefault();
            
            const coords = getCoords(e);
            const x = coords.x;
            const y = coords.y;

            if (this.currentPath) {
                if (Array.isArray(this.currentPath)) this.currentPath.forEach(n => n.remove());
                else this.currentPath.remove();
            }
            
            const options = { stroke: this.color, strokeWidth: this.size, roughness: 1.2, seed: 42 };
            
            if (this.tool === 'pen') {
                this.penPoints.push([x, y]);
                this.currentPath = this.rc.linearPath(this.penPoints, options);
            } else if (this.tool === 'line') {
                this.currentPath = this.rc.line(startX, startY, x, y, options);
            } else if (this.tool === 'arrow') {
                this.currentPath = this.createArrow(startX, startY, x, y, options);
            } else {
                this.currentPath = this.rc.rectangle(startX, startY, x - startX, y - startY, options);
            }

            if (Array.isArray(this.currentPath)) this.currentPath.forEach(n => this.canvas.appendChild(n));
            else this.canvas.appendChild(this.currentPath);
        };

        const handleEnd = (e) => {
            if (!isDrawing) return;
            isDrawing = false;
            
            const coords = getCoords(e);
            const endX = coords.x || (this.penPoints.length ? this.penPoints[this.penPoints.length-1][0] : startX);
            const endY = coords.y || (this.penPoints.length ? this.penPoints[this.penPoints.length-1][1] : startY);

            const persistentSeed = Math.floor(Math.random() * 999999);

            if (this.tool === 'pen' && this.penPoints.length > 2) {
                this.shapes.push({
                    tool: 'pen',
                    points: [...this.penPoints],
                    options: { stroke: this.color, strokeWidth: this.size, roughness: 1.2, seed: persistentSeed }
                });
            } else if (Math.abs(endX - startX) > 2 || Math.abs(endY - startY) > 2) {
                this.shapes.push({
                    tool: this.tool,
                    start: [startX, startY],
                    end: [endX, endY],
                    options: { stroke: this.color, strokeWidth: this.size, roughness: 1.5, seed: persistentSeed }
                });
            }
            
            this.save();
            
            if (this.currentPath) {
                if (Array.isArray(this.currentPath)) this.currentPath.forEach(n => n.remove());
                else this.currentPath.remove();
            }
            this.currentPath = null;
            this.penPoints = [];
            this.redraw();
        };

        // Mouse Events
        this.canvas.addEventListener('mousedown', handleStart);
        this.canvas.addEventListener('mousemove', handleMove);
        this.canvas.addEventListener('mouseup', handleEnd);

        // Touch Events
        this.canvas.addEventListener('touchstart', handleStart, { passive: false });
        this.canvas.addEventListener('touchmove', handleMove, { passive: false });
        this.canvas.addEventListener('touchend', handleEnd, { passive: false });
        this.canvas.addEventListener('touchcancel', handleEnd, { passive: false });
    },

    createArrow(x1, y1, x2, y2, options) {
        const line = this.rc.line(x1, y1, x2, y2, options);
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const headLen = 15;
        const x3 = x2 - headLen * Math.cos(angle - Math.PI / 6);
        const y3 = y2 - headLen * Math.sin(angle - Math.PI / 6);
        const x4 = x2 - headLen * Math.cos(angle + Math.PI / 6);
        const y4 = y2 - headLen * Math.sin(angle + Math.PI / 6);
        const head = this.rc.linearPath([[x3, y3], [x2, y2], [x4, y4]], options);
        return [line, head];
    },

    save() {
        if (!this.currentDoc) return;
        try {
            localStorage.setItem(`iitm_anno_${this.currentDoc}`, JSON.stringify(this.shapes));
            console.log(`💾 Saved ${this.shapes.length} shapes for ${this.currentDoc}`);
        } catch(e) {
            console.error("Save failure:", e);
        }
    },

    load(docPath) {
        this.currentDoc = docPath;
        try {
            const saved = localStorage.getItem(`iitm_anno_${docPath}`);
            this.shapes = saved ? JSON.parse(saved) : [];
            this.redraw();
            console.log(`📂 Loaded ${this.shapes.length} shapes for ${docPath}`);
        } catch(e) {
            this.shapes = [];
            this.redraw();
        }
    },

    redraw() {
        if (!this.canvas) return;
        this.canvas.innerHTML = '';
        
        const main = document.getElementById('main-content');
        if (main) {
            // Force a height recalculation to match the full scrollable area
            const scrollH = main.scrollHeight;
            const scrollW = main.scrollWidth;
            this.canvas.setAttribute('height', scrollH);
            this.canvas.setAttribute('width', scrollW);
            this.canvas.style.height = `${scrollH}px`;
            this.canvas.style.width = `${scrollW}px`;
        }

        this.shapes.forEach(s => {
            let node;
            if (s.tool === 'pen') {
                node = this.rc.linearPath(s.points, s.options);
            } else if (s.tool === 'line') {
                node = this.rc.line(s.start[0], s.start[1], s.end[0], s.end[1], s.options);
            } else if (s.tool === 'arrow') {
                const arrowParts = this.createArrow(s.start[0], s.start[1], s.end[0], s.end[1], s.options);
                arrowParts.forEach(n => this.canvas.appendChild(n));
                return;
            } else {
                node = this.rc.rectangle(s.start[0], s.start[1], s.end[0] - s.start[0], s.end[1] - s.start[1], s.options);
            }
            if (node) this.canvas.appendChild(node);
        });
    },

    undo() {
        this.shapes.pop();
        this.redraw();
        this.save();
    },

    clear() {
        this.shapes = [];
        this.redraw();
        this.save();
    }
}

// Expose to window for global access
window.ANN = ANN;
