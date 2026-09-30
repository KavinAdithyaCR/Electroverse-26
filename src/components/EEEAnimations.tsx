import { useEffect, useRef } from 'react';

// Sinusoidal waveform animation (oscilloscope-style)
export function WaveformAnimation({
  width = 200,
  height = 60,
  color = '#00d4ff',
  phases = 1,
  speed = 0.02,
  style = {},
}: {
  width?: number;
  height?: number;
  color?: string;
  phases?: number;
  speed?: number;
  style?: React.CSSProperties;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const offsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width * 2; // For retina
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(2, 2);

    const phaseColors = ['#00d4ff', '#00f5d4', '#7b2ff7'];

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      offsetRef.current += speed;

      for (let p = 0; p < phases; p++) {
        ctx.beginPath();
        ctx.strokeStyle = phases > 1 ? phaseColors[p % 3] : color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.7;

        const phaseOffset = (p * Math.PI * 2) / 3;

        for (let x = 0; x < width; x++) {
          const y =
            height / 2 +
            Math.sin((x / width) * Math.PI * 4 + offsetRef.current + phaseOffset) *
              (height * 0.35);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [width, height, color, phases, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        opacity: 0.4,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

// Energy flow animation (generation → load)
export function EnergyFlowAnimation({
  style = {},
}: {
  style?: React.CSSProperties;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = 300;
    const h = 40;
    canvas.width = w * 2;
    canvas.height = h * 2;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(2, 2);

    // Nodes: Generation, Transmission, Distribution, Load
    const nodes = [
      { x: 20, label: '⚡' },
      { x: 100, label: '🔌' },
      { x: 200, label: '🏗️' },
      { x: 280, label: '💡' },
    ];

    interface FlowParticle {
      x: number;
      speed: number;
      color: string;
    }

    const particles: FlowParticle[] = [];

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      frame++;

      // Draw connecting line
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, h / 2);
      ctx.lineTo(nodes[nodes.length - 1].x, h / 2);
      ctx.strokeStyle = 'rgba(0,212,255,0.15)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw nodes
      for (const node of nodes) {
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, node.x, h / 2);
      }

      // Spawn particles
      if (frame % 15 === 0) {
        particles.push({
          x: nodes[0].x,
          speed: 1 + Math.random() * 1.5,
          color: Math.random() > 0.5 ? '#00d4ff' : '#00f5d4',
        });
      }

      // Animate particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speed;
        if (p.x > nodes[nodes.length - 1].x) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, h / 2, 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.8;
        ctx.fill();

        // Glow
        const grad = ctx.createRadialGradient(p.x, h / 2, 0, p.x, h / 2, 8);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.globalAlpha = 0.3;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        opacity: 0.5,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
