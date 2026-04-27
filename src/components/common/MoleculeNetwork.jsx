'use client';
import React, { useEffect, useRef } from 'react';

export default function MoleculeNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let particles = [];
    let mouse = { x: null, y: null, radius: 180 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    class Particle {
      constructor(x, y, dx, dy, size) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(255, 255, 255, 0)';
        ctx.fill();
      }

      update() {
        // Bounce off edges gracefully
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

        // Mouse Interactivity (Attraction)
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            // Force grows stronger the closer the mouse is (up to a limit)
            const force = (mouse.radius - distance) / mouse.radius;
            // Repel/Dodge effect (subtracting force)
            this.x -= forceDirectionX * force * 3.5;
            this.y -= forceDirectionY * force * 3.5;
          }
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    const init = () => {
      particles = [];
      // Calculate responsive number of particles based on screen real estate
      const particleNum = Math.floor((canvas.width * canvas.height) / 12000);
      
      for (let i = 0; i < particleNum; i++) {
        let size = Math.random() * 1.5 + 0.5;
        let x = Math.random() * (canvas.width - size * 2) + size * 2;
        let y = Math.random() * (canvas.height - size * 2) + size * 2;
        // Slow ambient drift velocities
        let dx = (Math.random() - 0.5) * 0.4;
        let dy = (Math.random() - 0.5) * 0.4;
        particles.push(new Particle(x, y, dx, dy, size));
      }
    };

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          // Avoid expensive Math.sqrt for comparisons
          let distance = dx * dx + dy * dy;
          
          // Connect nodes within a certain distance radius (~100px)
          if (distance < 10000) {
            // Opacity fades gracefully based on distance
            let opacityValue = 1 - (distance / 10000);
            // Clearly visible transparency tint
            ctx.strokeStyle = `rgba(200, 150, 255, ${opacityValue * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      connect();
    };

    // Event listeners
    const handleMouseMove = (e) => {
      // Offset by scroll position if necessary, though this is fixed full viewport
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    // Clear mouse position when leaving window so molecules don't stick to edge
    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    // Initial setup
    resize();
    animate();

    // Cleanup phase
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="block w-full h-full pointer-events-none"
    />
  );
}
