// AI Processing Simulator and Interactive Demos
class AIProcessingSimulator {
    constructor() {
        this.canvas = document.getElementById('ai-processing-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.isProcessing = false;
        this.processingData = [];
        this.currentModel = 'llama';
        this.tokensPerSecond = 0;
        this.memoryUsage = 0;
        
        this.init();
        this.bindEvents();
        this.startSimulation();
    }
    
    init() {
        this.resizeCanvas();
        this.createProcessingNodes();
    }
    
    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = 300;
    }
    
    createProcessingNodes() {
        this.processingData = [];
        const nodeCount = 8;
        
        for (let i = 0; i < nodeCount; i++) {
            this.processingData.push({
                x: (this.canvas.width / (nodeCount + 1)) * (i + 1),
                y: this.canvas.height / 2,
                radius: 20,
                activity: 0,
                connections: [],
                type: i < 2 ? 'input' : i > nodeCount - 3 ? 'output' : 'hidden',
                pulsePhase: Math.random() * Math.PI * 2
            });
        }
        
        // Create connections between nodes
        for (let i = 0; i < this.processingData.length - 1; i++) {
            this.processingData[i].connections.push({
                to: i + 1,
                strength: 0,
                dataPackets: []
            });
        }
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Model selector
        const modelCards = document.querySelectorAll('.model-card');
        modelCards.forEach(card => {
            card.addEventListener('click', () => {
                modelCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                this.currentModel = card.dataset.model;
                this.updateModelStats();
                this.triggerProcessing();
            });
        });
    }
    
    updateModelStats() {
        const modelStats = {
            llama: { tokens: 45, memory: 8.2 },
            gemini: { tokens: 38, memory: 4.1 },
            mistral: { tokens: 42, memory: 7.8 },
            deepseek: { tokens: 40, memory: 6.9 }
        };
        
        const stats = modelStats[this.currentModel];
        document.getElementById('current-model').textContent = 
            this.currentModel.charAt(0).toUpperCase() + this.currentModel.slice(1);
        
        // Animate the stat changes
        this.animateValue('tokens-per-second', this.tokensPerSecond, stats.tokens, 2000);
        this.animateValue('memory-usage', this.memoryUsage, stats.memory, 2000, '%');
        
        this.tokensPerSecond = stats.tokens;
        this.memoryUsage = stats.memory;
    }
    
    animateValue(elementId, start, end, duration, suffix = '') {
        const element = document.getElementById(elementId);
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = start + (end - start) * this.easeOutCubic(progress);
            
            element.textContent = Math.round(current * 10) / 10 + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    triggerProcessing() {
        this.isProcessing = true;
        
        // Activate nodes in sequence
        this.processingData.forEach((node, index) => {
            setTimeout(() => {
                node.activity = 1;
                this.activateConnections(index);
            }, index * 100);
        });
        
        setTimeout(() => {
            this.isProcessing = false;
            this.processingData.forEach(node => node.activity = 0);
        }, 3000);
    }
    
    activateConnections(nodeIndex) {
        const node = this.processingData[nodeIndex];
        node.connections.forEach(connection => {
            connection.strength = 1;
            connection.dataPackets.push({
                progress: 0,
                speed: 0.02 + Math.random() * 0.03
            });
            
            setTimeout(() => {
                connection.strength *= 0.9;
            }, 500);
        });
    }
    
    updateProcessing() {
        this.processingData.forEach(node => {
            // Update activity decay
            node.activity *= 0.95;
            node.pulsePhase += 0.05;
            
            // Update connections and data packets
            node.connections.forEach(connection => {
                connection.strength *= 0.98;
                
                connection.dataPackets = connection.dataPackets.filter(packet => {
                    packet.progress += packet.speed;
                    return packet.progress < 1;
                });
            });
        });
    }
    
    drawProcessing() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections first
        this.processingData.forEach((node, index) => {
            node.connections.forEach(connection => {
                const targetNode = this.processingData[connection.to];
                const alpha = connection.strength * 0.8;
                
                if (alpha > 0.1) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(node.x, node.y);
                    this.ctx.lineTo(targetNode.x, targetNode.y);
                    this.ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
                    this.ctx.lineWidth = 2;
                    this.ctx.stroke();
                }
                
                // Draw data packets
                connection.dataPackets.forEach(packet => {
                    const x = node.x + (targetNode.x - node.x) * packet.progress;
                    const y = node.y + (targetNode.y - node.y) * packet.progress;
                    
                    this.ctx.beginPath();
                    this.ctx.arc(x, y, 4, 0, Math.PI * 2);
                    this.ctx.fillStyle = 'rgba(0, 255, 65, 0.9)';
                    this.ctx.fill();
                });
            });
        });
        
        // Draw nodes
        this.processingData.forEach(node => {
            const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7;
            const activity = node.activity;
            
            // Node colors by type
            const colors = {
                input: `rgba(0, 255, 255, ${0.6 + activity * 0.4})`,
                hidden: `rgba(138, 43, 226, ${0.6 + activity * 0.4})`,
                output: `rgba(0, 255, 65, ${0.6 + activity * 0.4})`
            };
            
            // Main node
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
            this.ctx.fillStyle = colors[node.type];
            this.ctx.fill();
            
            // Glow effect
            if (activity > 0.3) {
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, node.radius * pulse * 1.5, 0, Math.PI * 2);
                this.ctx.fillStyle = colors[node.type].replace(/[\d\.]+\)$/g, '0.2)');
                this.ctx.fill();
            }
        });
    }
    
    startSimulation() {
        const animate = () => {
            this.updateProcessing();
            this.drawProcessing();
            requestAnimationFrame(animate);
        };
        
        // Initial model setup
        this.updateModelStats();
        
        // Periodic processing simulation
        setInterval(() => {
            if (!this.isProcessing && Math.random() > 0.7) {
                this.triggerProcessing();
            }
        }, 3000);
        
        animate();
    }
}

// Voice Waveform Simulator
class VoiceWaveformSimulator {
    constructor() {
        this.canvas = document.getElementById('voice-waveform');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.isRecording = false;
        this.waveformData = [];
        this.animationId = null;
        
        this.init();
        this.bindEvents();
    }
    
    init() {
        this.resizeCanvas();
        this.generateIdleWaveform();
    }
    
    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = 100;
    }
    
    generateIdleWaveform() {
        this.waveformData = [];
        const points = this.canvas.width / 4;
        
        for (let i = 0; i < points; i++) {
            this.waveformData.push(Math.random() * 0.1 + 0.05);
        }
    }
    
    generateActiveWaveform() {
        this.waveformData = [];
        const points = this.canvas.width / 4;
        
        for (let i = 0; i < points; i++) {
            const intensity = Math.sin(i * 0.2) * 0.5 + 0.5;
            this.waveformData.push(Math.random() * intensity * 0.8 + 0.2);
        }
    }
    
    bindEvents() {
        const demoBtn = document.getElementById('voice-demo-btn');
        if (!demoBtn) return;
        
        demoBtn.addEventListener('click', () => {
            if (!this.isRecording) {
                this.startRecording();
            } else {
                this.stopRecording();
            }
        });
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    startRecording() {
        this.isRecording = true;
        const btn = document.getElementById('voice-demo-btn');
        btn.innerHTML = '<i class="fas fa-stop"></i><span>Stop Demo</span>';
        btn.classList.add('recording');
        
        this.animate();
    }
    
    stopRecording() {
        this.isRecording = false;
        const btn = document.getElementById('voice-demo-btn');
        btn.innerHTML = '<i class="fas fa-microphone"></i><span>Demo Voice Processing</span>';
        btn.classList.remove('recording');
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        this.generateIdleWaveform();
        this.drawWaveform();
    }
    
    animate() {
        if (!this.isRecording) return;
        
        this.generateActiveWaveform();
        this.drawWaveform();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    drawWaveform() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const barWidth = this.canvas.width / this.waveformData.length;
        const centerY = this.canvas.height / 2;
        
        this.waveformData.forEach((amplitude, index) => {
            const barHeight = amplitude * centerY;
            const x = index * barWidth;
            
            // Create gradient
            const gradient = this.ctx.createLinearGradient(0, centerY - barHeight, 0, centerY + barHeight);
            gradient.addColorStop(0, this.isRecording ? 'rgba(0, 255, 65, 0.9)' : 'rgba(0, 255, 255, 0.7)');
            gradient.addColorStop(1, this.isRecording ? 'rgba(0, 255, 65, 0.3)' : 'rgba(0, 255, 255, 0.3)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x, centerY - barHeight, barWidth - 1, barHeight * 2);
        });
    }
}

// Remote Connection Simulator
class RemoteConnectionSimulator {
    constructor() {
        this.connectionSpeed = 1.0;
        this.connectionLatency = 50;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        this.startConnectionAnimation();
        this.updateStats();
    }
    
    startConnectionAnimation() {
        const dataFlow = document.querySelector('.data-flow');
        if (!dataFlow) return;
        
        setInterval(() => {
            if (!this.isAnimating) {
                this.isAnimating = true;
                dataFlow.style.animation = 'data-transfer 2s ease-in-out';
                
                setTimeout(() => {
                    this.isAnimating = false;
                    dataFlow.style.animation = '';
                    this.updateStats();
                }, 2000);
            }
        }, 3000);
    }
    
    updateStats() {
        // Simulate varying connection performance
        this.connectionSpeed = 3.2 + Math.random() * 2.5;
        this.connectionLatency = 8 + Math.random() * 10;
        
        const speedElement = document.getElementById('connection-speed');
        const latencyElement = document.getElementById('connection-latency');
        
        if (speedElement) speedElement.textContent = this.connectionSpeed.toFixed(1) + 'x';
        if (latencyElement) latencyElement.textContent = Math.round(this.connectionLatency) + 'ms';
    }
}

// Initialize all simulators when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.aiProcessingSimulator = new AIProcessingSimulator();
    window.voiceWaveformSimulator = new VoiceWaveformSimulator();
    window.remoteConnectionSimulator = new RemoteConnectionSimulator();
});
