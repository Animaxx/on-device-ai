/**
 * On Device AI - Neural Network Canvas Animation
 * Drifting nodes + edges that react to mouse proximity
 */

(function () {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const CONFIG = {
        nodeCount: 55,
        maxDistance: 140,
        mouseRadius: 120,
        mouseForce: 0.06,
        driftSpeed: 0.35,
        nodeRadius: { min: 1.5, max: 3.5 },
        edgeOpacity: 0.07,
        nodeOpacity: { min: 0.15, max: 0.55 },
        accentColor: '0, 200, 200',
        whiteColor: '255, 255, 255',
    };

    let width, height, nodes, mouse, animationId;
    mouse = { x: -9999, y: -9999 };

    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }

    function createNode() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * CONFIG.driftSpeed,
            vy: (Math.random() - 0.5) * CONFIG.driftSpeed,
            r: CONFIG.nodeRadius.min + Math.random() * (CONFIG.nodeRadius.max - CONFIG.nodeRadius.min),
            opacity: CONFIG.nodeOpacity.min + Math.random() * (CONFIG.nodeOpacity.max - CONFIG.nodeOpacity.min),
            isAccent: Math.random() < 0.25,
        };
    }

    function init() {
        resize();
        nodes = Array.from({ length: CONFIG.nodeCount }, createNode);
    }

    function drawStatic() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            for (let j = i + 1; j < nodes.length; j++) {
                const m = nodes[j];
                const dx = m.x - n.x;
                const dy = m.y - n.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONFIG.maxDistance) {
                    const alpha = CONFIG.edgeOpacity * (1 - dist / CONFIG.maxDistance);
                    ctx.beginPath();
                    ctx.moveTo(n.x, n.y);
                    ctx.lineTo(m.x, m.y);
                    ctx.strokeStyle = `rgba(${CONFIG.whiteColor}, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            const color = n.isAccent ? CONFIG.accentColor : CONFIG.whiteColor;
            ctx.fillStyle = `rgba(${color}, ${n.opacity})`;
            ctx.fill();
        }
    }

    function tick() {
        ctx.clearRect(0, 0, width, height);

        for (const n of nodes) {
            const dx = mouse.x - n.x;
            const dy = mouse.y - n.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < CONFIG.mouseRadius && dist > 0) {
                const force = (1 - dist / CONFIG.mouseRadius) * CONFIG.mouseForce;
                n.vx += (dx / dist) * force;
                n.vy += (dy / dist) * force;
            }

            const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
            const maxSpeed = CONFIG.driftSpeed * 3;
            if (speed > maxSpeed) {
                n.vx = (n.vx / speed) * maxSpeed;
                n.vy = (n.vy / speed) * maxSpeed;
            }

            n.vx *= 0.98;
            n.vy *= 0.98;

            n.x += n.vx;
            n.y += n.vy;

            if (n.x < -20) n.x = width + 20;
            else if (n.x > width + 20) n.x = -20;
            if (n.y < -20) n.y = height + 20;
            else if (n.y > height + 20) n.y = -20;
        }

        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            for (let j = i + 1; j < nodes.length; j++) {
                const m = nodes[j];
                const dx = m.x - n.x;
                const dy = m.y - n.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONFIG.maxDistance) {
                    const alpha = CONFIG.edgeOpacity * (1 - dist / CONFIG.maxDistance);
                    ctx.beginPath();
                    ctx.moveTo(n.x, n.y);
                    ctx.lineTo(m.x, m.y);
                    ctx.strokeStyle = `rgba(${CONFIG.whiteColor}, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        for (const n of nodes) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            const color = n.isAccent ? CONFIG.accentColor : CONFIG.whiteColor;
            ctx.fillStyle = `rgba(${color}, ${n.opacity})`;
            ctx.fill();

            if (n.isAccent) {
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r + 2, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(${CONFIG.accentColor}, ${n.opacity * 0.3})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }

        animationId = requestAnimationFrame(tick);
    }

    function handleVisibility() {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else if (!prefersReducedMotion) {
            tick();
        }
    }

    window.addEventListener('resize', () => {
        resize();
        if (prefersReducedMotion) drawStatic();
    });

    canvas.closest('.hero')?.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.closest('.hero')?.addEventListener('mouseleave', () => {
        mouse.x = -9999;
        mouse.y = -9999;
    });

    document.addEventListener('visibilitychange', handleVisibility);

    init();

    if (prefersReducedMotion) {
        drawStatic();
    } else {
        tick();
    }
})();
