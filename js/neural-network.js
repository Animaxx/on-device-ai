class NeuralNetwork {
    constructor() {
        this.canvas = document.getElementById('neural-network-bg');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        
        this.init();
        this.bindEvents();
        this.animate();
    }
    
    init() {
        this.resize();
        this.createNodes();
        this.createConnections();
        this.createParticles();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createNodes() {
        const nodeCount = Math.min(50, Math.floor((this.canvas.width * this.canvas.height) / 25000));
        this.nodes = [];
        
        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 2,
                pulsePhase: Math.random() * Math.PI * 2,
                activity: Math.random(),
                type: Math.floor(Math.random() * 3) // 0: input, 1: hidden, 2: output
            });
        }
    }
    
    createConnections() {
        this.connections = [];
        const maxDistance = 150;
        
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance && Math.random() > 0.7) {
                    this.connections.push({
                        from: i,
                        to: j,
                        strength: Math.random(),
                        pulsePhase: Math.random() * Math.PI * 2,
                        active: false
                    });
                }
            }
        }
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: Math.random(),
                maxLife: Math.random() * 100 + 50
            });
        }
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.activateNearbyNodes();
        });
        
        // Scroll-based activation
        window.addEventListener('scroll', () => {
            this.triggerActivity();
        });
    }
    
    activateNearbyNodes() {
        const activationRadius = 100;
        
        this.nodes.forEach(node => {
            const dx = node.x - this.mouse.x;
            const dy = node.y - this.mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < activationRadius) {
                node.activity = Math.min(1, node.activity + 0.1);
                this.activateConnections(this.nodes.indexOf(node));
            }
        });
    }
    
    activateConnections(nodeIndex) {
        this.connections.forEach(connection => {
            if (connection.from === nodeIndex || connection.to === nodeIndex) {
                connection.active = true;
                setTimeout(() => {
                    connection.active = false;
                }, 1000);
            }
        });
    }
    
    triggerActivity() {
        // Random activation during scroll
        if (Math.random() > 0.7) {
            const randomNode = Math.floor(Math.random() * this.nodes.length);
            this.nodes[randomNode].activity = 1;
            this.activateConnections(randomNode);
        }
    }
    
    updateNodes() {
        this.nodes.forEach(node => {
            // Movement
            node.x += node.vx;
            node.y += node.vy;
            
            // Boundary collision
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;
            
            // Keep in bounds
            node.x = Math.max(0, Math.min(this.canvas.width, node.x));
            node.y = Math.max(0, Math.min(this.canvas.height, node.y));
            
            // Activity decay
            node.activity *= 0.995;
            
            // Pulse animation
            node.pulsePhase += 0.02;
        });
    }
    
    updateConnections() {
        this.connections.forEach(connection => {
            connection.pulsePhase += 0.03;
            if (connection.active) {
                connection.strength = Math.min(1, connection.strength + 0.1);
            } else {
                connection.strength *= 0.98;
            }
        });
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;
            
            if (particle.life <= 0 || particle.x < 0 || particle.x > this.canvas.width || 
                particle.y < 0 || particle.y > this.canvas.height) {
                particle.x = Math.random() * this.canvas.width;
                particle.y = Math.random() * this.canvas.height;
                particle.life = particle.maxLife;
                particle.vx = (Math.random() - 0.5) * 2;
                particle.vy = (Math.random() - 0.5) * 2;
            }
        });
    }
    
    drawNodes() {
        this.nodes.forEach(node => {
            const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7;
            const activity = node.activity;
            
            // Node color based on type
            const colors = [
                `rgba(0, 255, 255, ${0.6 + activity * 0.4})`,  // Input - cyan
                `rgba(138, 43, 226, ${0.6 + activity * 0.4})`, // Hidden - purple
                `rgba(0, 255, 65, ${0.6 + activity * 0.4})`    // Output - green
            ];
            
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
            this.ctx.fillStyle = colors[node.type];
            this.ctx.fill();
            
            // Glow effect for active nodes
            if (activity > 0.5) {
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, node.radius * pulse * 2, 0, Math.PI * 2);
                this.ctx.fillStyle = colors[node.type].replace(/[\d\.]+\)$/g, '0.1)');
                this.ctx.fill();
            }
        });
    }
    
    drawConnections() {
        this.connections.forEach(connection => {
            const fromNode = this.nodes[connection.from];
            const toNode = this.nodes[connection.to];
            
            if (!fromNode || !toNode) return;
            
            const pulse = Math.sin(connection.pulsePhase) * 0.3 + 0.7;
            const alpha = connection.strength * pulse * 0.5;
            
            if (alpha > 0.01) {
                this.ctx.beginPath();
                this.ctx.moveTo(fromNode.x, fromNode.y);
                this.ctx.lineTo(toNode.x, toNode.y);
                this.ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
                this.ctx.lineWidth = connection.active ? 2 : 1;
                this.ctx.stroke();
                
                // Data packet animation on active connections
                if (connection.active && connection.strength > 0.5) {
                    this.drawDataPacket(fromNode, toNode, connection.pulsePhase);
                }
            }
        });
    }
    
    drawDataPacket(fromNode, toNode, phase) {
        const progress = (Math.sin(phase * 2) + 1) / 2;
        const x = fromNode.x + (toNode.x - fromNode.x) * progress;
        const y = fromNode.y + (toNode.y - fromNode.y) * progress;
        
        this.ctx.beginPath();
        this.ctx.arc(x, y, 3, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(0, 255, 65, 0.8)';
        this.ctx.fill();
        
        // Trail effect
        this.ctx.beginPath();
        this.ctx.arc(x, y, 6, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(0, 255, 65, 0.2)';
        this.ctx.fill();
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            const alpha = particle.life / particle.maxLife;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 255, 255, ${alpha * 0.3})`;
            this.ctx.fill();
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateNodes();
        this.updateConnections();
        this.updateParticles();
        
        this.drawConnections();
        this.drawNodes();
        this.drawParticles();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NeuralNetwork();
});
