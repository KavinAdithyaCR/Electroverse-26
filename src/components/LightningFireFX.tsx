import { useEffect, useRef, useState, useCallback } from 'react';
import { useMediaQuery } from '../hooks/useHooks';

interface LightningSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  branchLevel: number;
  width: number;
}

interface LightningBolt {
  id: number;
  startX: number;
  startY: number;
  impactX: number;
  impactY: number;
  segments: LightningSegment[];
  life: number;
  maxLife: number;
  glowColor: string;
  flickerPattern: number[];
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
}

interface ShockwaveRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  opacity: number;
  lineWidth: number;
}

export default function LightningFireFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [flashOpacity, setFlashOpacity] = useState(0);
  const [flashColor, setFlashColor] = useState('rgba(99, 102, 241, ');

  // References for animation loop
  const boltsRef = useRef<LightningBolt[]>([]);
  const sparkParticlesRef = useRef<SparkParticle[]>([]);
  const shockwavesRef = useRef<ShockwaveRing[]>([]);
  const animFrameRef = useRef<number>(0);
  const lastStrikeTimeRef = useRef<number>(Date.now());
  const nextStrikeIntervalRef = useRef<number>(3000);

  // Generate hyper-realistic photorealistic atmospheric lightning bolt
  const createLightningBolt = useCallback(
    (startX: number, startY: number, endX: number, endY: number) => {
      const segments: LightningSegment[] = [];

      const generateBranch = (
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        displace: number,
        level: number
      ) => {
        const dist = Math.hypot(x2 - x1, y2 - y1);

        if (displace < 4 || level > 4 || dist < 5) {
          // Progressively taper thickness down the channel path
          const progressY = Math.min(1, Math.max(0, y1 / (endY || 1)));
          const baseWidth = isMobile ? 2.6 : 4.2;
          const taperedWidth = Math.max(0.6, (baseWidth * (1 - progressY * 0.45)) / (level * 1.1 + 1));

          segments.push({
            x1,
            y1,
            x2,
            y2,
            branchLevel: level,
            width: taperedWidth,
          });
          return;
        }

        const dx = x2 - x1;
        const dy = y2 - y1;
        const normalX = -dy / dist;
        const normalY = dx / dist;

        // Perpendicular offset with stepped leader micro-jitter
        const offset = (Math.random() - 0.5) * displace;
        const microJitterX = (Math.random() - 0.5) * (displace * 0.18);
        const microJitterY = (Math.random() - 0.5) * (displace * 0.18);

        const midX = (x1 + x2) / 2 + normalX * offset + microJitterX;
        const midY = (y1 + y2) / 2 + normalY * offset + microJitterY;

        generateBranch(x1, y1, midX, midY, displace * 0.52, level);
        generateBranch(midX, midY, x2, y2, displace * 0.52, level);

        // Forking probability (stepped leader branching)
        if (Math.random() < 0.42 && level < 3) {
          const mainAngle = Math.atan2(dy, dx);
          const forkAngle = mainAngle + (Math.random() - 0.5) * 1.25; // 30° to 60° branch deflection
          const forkLength = dist * (0.28 + Math.random() * 0.35);
          const forkEndX = midX + Math.cos(forkAngle) * forkLength;
          const forkEndY = midY + Math.sin(forkAngle) * forkLength + forkLength * 0.12;

          generateBranch(midX, midY, forkEndX, forkEndY, displace * 0.42, level + 1);
        }
      };

      const dist = Math.hypot(endX - startX, endY - startY);
      generateBranch(startX, startY, endX, endY, dist * 0.25, 0);

      // Return stroke strobe sequence (high-speed photographic return strokes)
      const flickerPattern = [1.0, 0.15, 0.95, 0.3, 1.0, 0.45, 0.8, 0.2, 0.6, 0.1, 0.3, 0.05, 0.0];

      // Ionized plasma glow colors
      const randColor = Math.random();
      let glowColor = 'rgba(99, 102, 241, 0.95)';
      if (randColor < 0.3) {
        glowColor = 'rgba(236, 72, 153, 0.95)'; // Electric Pink / Magenta
      } else if (randColor < 0.6) {
        glowColor = 'rgba(6, 182, 212, 0.95)'; // Neon Cyan
      } else if (randColor < 0.85) {
        glowColor = 'rgba(139, 92, 246, 0.95)'; // Vivid Violet
      } else {
        glowColor = 'rgba(245, 158, 11, 0.95)'; // Golden Amber
      }

      const bolt: LightningBolt = {
        id: Math.random(),
        startX,
        startY,
        impactX: endX,
        impactY: endY,
        segments,
        life: 0,
        maxLife: flickerPattern.length,
        glowColor,
        flickerPattern,
      };

      boltsRef.current.push(bolt);

      // Spawn Impact Electric Sparks
      const sparkCount = isMobile ? 14 : 32;
      const sparkColors = ['#ffffff', '#ec4899', '#06b6d4', '#f59e0b', '#6366f1'];
      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 10 + 3.5;
        sparkParticlesRef.current.push({
          x: endX,
          y: endY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - Math.random() * 4,
          size: Math.random() * 2.5 + 1.2,
          life: 0,
          maxLife: Math.random() * 25 + 12,
          color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
        });
      }

      // Spawn Shockwave Ionization Ring
      shockwavesRef.current.push({
        x: endX,
        y: endY,
        radius: 4,
        maxRadius: Math.random() * 80 + 50,
        color: glowColor,
        opacity: 0.85,
        lineWidth: 2.5,
      });

      // Atmospheric Flash Effect
      setFlashColor(glowColor.replace('0.95)', ''));
      setFlashOpacity(0.18);
      setTimeout(() => setFlashOpacity(0.03), 40);
      setTimeout(() => setFlashOpacity(0.15), 80);
      setTimeout(() => setFlashOpacity(0), 220);
    },
    [isMobile]
  );

  // Trigger strike at target position or random
  const triggerStrikeAt = useCallback(
    (x?: number, y?: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const targetX = x ?? Math.random() * canvas.width;
      const targetY = y ?? Math.random() * (canvas.height * 0.7) + canvas.height * 0.18;
      const startX = targetX + (Math.random() - 0.5) * 360;
      const startY = 0;

      createLightningBolt(startX, startY, targetX, targetY);
    },
    [createLightningBolt]
  );

  // Click event listener for interactive lightning strike
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        return;
      }
      triggerStrikeAt(e.clientX, e.clientY);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [triggerStrikeAt]);

  // Main Canvas Render Loop
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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      // Auto-trigger periodic lightning strikes
      if (now - lastStrikeTimeRef.current > nextStrikeIntervalRef.current) {
        triggerStrikeAt();
        lastStrikeTimeRef.current = now;
        nextStrikeIntervalRef.current = Math.random() * 3500 + 2500;
      }

      // 1. Render Lightning Bolts
      const bolts = boltsRef.current;
      for (let i = bolts.length - 1; i >= 0; i--) {
        const bolt = bolts[i];
        bolt.life++;

        if (bolt.life >= bolt.maxLife) {
          bolts.splice(i, 1);
          continue;
        }

        const alphaMultiplier = bolt.flickerPattern[bolt.life] ?? 0;
        if (alphaMultiplier <= 0.01) continue;

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Volumetric Atmospheric Glow at Cloud Top & Impact Site
        const topGlowGrad = ctx.createRadialGradient(
          bolt.startX, bolt.startY, 0,
          bolt.startX, bolt.startY, Math.max(150, canvas.width * 0.35)
        );
        topGlowGrad.addColorStop(0, bolt.glowColor);
        topGlowGrad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(bolt.startX, bolt.startY, Math.max(150, canvas.width * 0.35), 0, Math.PI * 2);
        ctx.fillStyle = topGlowGrad;
        ctx.globalAlpha = alphaMultiplier * 0.15;
        ctx.fill();

        // Pass 1: Broad Volumetric Atmospheric Bloom
        for (const seg of bolt.segments) {
          ctx.beginPath();
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
          ctx.strokeStyle = bolt.glowColor;
          ctx.lineWidth = seg.width * 5.5;
          ctx.globalAlpha = alphaMultiplier * 0.3;
          ctx.shadowBlur = 35;
          ctx.shadowColor = bolt.glowColor;
          ctx.stroke();
        }

        // Pass 2: Inner Ionized Plasma Sheath
        for (const seg of bolt.segments) {
          ctx.beginPath();
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
          ctx.strokeStyle = bolt.glowColor;
          ctx.lineWidth = seg.width * 2.8;
          ctx.globalAlpha = alphaMultiplier * 0.75;
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#ffffff';
          ctx.stroke();
        }

        // Pass 3: Blinding White-Hot Core (Superheated Plasma)
        for (const seg of bolt.segments) {
          ctx.beginPath();
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = Math.max(1, seg.width * 1.1);
          ctx.globalAlpha = alphaMultiplier;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }

      // Reset shadow blur
      ctx.shadowBlur = 0;

      // 2. Render Shockwaves
      const shockwaves = shockwavesRef.current;
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 5;
        sw.opacity -= 0.038;

        if (sw.opacity <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = sw.color;
        ctx.lineWidth = sw.lineWidth;
        ctx.globalAlpha = Math.max(0, sw.opacity);
        ctx.stroke();
      }

      // 3. Render Sparks
      const sparks = sparkParticlesRef.current;
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life++;
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.93;
        s.vy *= 0.93;
        s.vy += 0.14; // Gravity

        if (s.life >= s.maxLife) {
          sparks.splice(i, 1);
          continue;
        }

        const alpha = 1 - s.life / s.maxLife;

        // Spark Line Tail
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 2.2, s.y - s.vy * 2.2);
        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.size;
        ctx.globalAlpha = alpha;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [triggerStrikeAt]);

  return (
    <>
      {/* Real Lightning Atmosphere Flash Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          backgroundColor: `${flashColor}${flashOpacity})`,
          zIndex: 5,
          transition: 'background-color 0.03s linear',
        }}
        aria-hidden="true"
      />

      {/* Real Lightning Canvas Overlay */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 6,
        }}
        aria-hidden="true"
      />
    </>
  );
}


