import { useEffect, useRef } from 'react';
import { useMediaQuery } from '../hooks/useHooks';

export default function ElectricBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Circuit trace nodes
    const nodeCount = isMobile ? 8 : 20;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      connections: [] as number[],
    }));

    // Connect nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.sqrt(
          (nodes[i].x - nodes[j].x) ** 2 + (nodes[i].y - nodes[j].y) ** 2
        );
        if (d < 400) {
          nodes[i].connections.push(j);
        }
      }
    }

    // Electric pulses traveling along connections
    interface Pulse {
      fromNode: number;
      toNode: number;
      progress: number;
      speed: number;
      color: string;
    }

    const pulses: Pulse[] = [];
    const pulseColors = ['#6366f1', '#ec4899', '#06b6d4', '#f59e0b', '#8b5cf6'];

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Draw circuit traces (subtle colorful traces)
      for (const node of nodes) {
        for (const connIdx of node.connections) {
          const target = nodes[connIdx];
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);

          // Create right-angle paths like circuit traces
          const midX = (node.x + target.x) / 2;
          ctx.lineTo(midX, node.y);
          ctx.lineTo(midX, target.y);
          ctx.lineTo(target.x, target.y);

          ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.18)';
        ctx.fill();
      }

      // Spawn new pulses
      if (frame % (isMobile ? 120 : 60) === 0 && pulses.length < (isMobile ? 3 : 8)) {
        const nodeIdx = Math.floor(Math.random() * nodes.length);
        const node = nodes[nodeIdx];
        if (node.connections.length > 0) {
          const connIdx =
            node.connections[
              Math.floor(Math.random() * node.connections.length)
            ];
          pulses.push({
            fromNode: nodeIdx,
            toNode: connIdx,
            progress: 0,
            speed: 0.005 + Math.random() * 0.01,
            color: pulseColors[Math.floor(Math.random() * pulseColors.length)],
          });
        }
      }

      // Animate pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const from = nodes[pulse.fromNode];
        const to = nodes[pulse.toNode];
        const midX = (from.x + to.x) / 2;

        let px: number, py: number;
        if (pulse.progress < 0.33) {
          const t = pulse.progress / 0.33;
          px = from.x + (midX - from.x) * t;
          py = from.y;
        } else if (pulse.progress < 0.66) {
          const t = (pulse.progress - 0.33) / 0.33;
          px = midX;
          py = from.y + (to.y - from.y) * t;
        } else {
          const t = (pulse.progress - 0.66) / 0.34;
          px = midX + (to.x - midX) * t;
          py = to.y;
        }

        // Pulse glow
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, 20);
        gradient.addColorStop(0, pulse.color);
        gradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(px, py, 20, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.6;
        ctx.fill();

        // Pulse dot
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.globalAlpha = 1;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.6,
      }}
      aria-hidden="true"
    />
  );
}
