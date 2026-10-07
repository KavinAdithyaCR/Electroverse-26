import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('INITIALIZING SYSTEM...');
  const [phase, setPhase] = useState<'loading' | 'ready' | 'done'>('loading');

  useEffect(() => {
    const startTime = Date.now();
    const minDuration = 2200;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const elapsed = Date.now() - startTime;
        const target = Math.min((elapsed / minDuration) * 100, 100);
        const next = prev + (target - prev) * 0.1;

        if (next >= 30 && next < 60) setStatus('LOADING MODULES...');
        if (next >= 60 && next < 85) setStatus('CONNECTING GRID...');
        if (next >= 85 && next < 98) setStatus('CALIBRATING SYSTEMS...');
        if (next >= 98) {
          setStatus('SYSTEM ONLINE ⚡');
          setPhase('ready');
        }

        return Math.min(next, 100);
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase === 'ready') {
      const timer = setTimeout(() => {
        setPhase('done');
        setTimeout(onComplete, 600);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#030014',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
          }}
        >
          {/* Grid background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(rgba(61, 159, 255, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(61, 159, 255, 0.025) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
            }}
          />

          {/* Logo emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.8rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <img
              src="/logo.jpg"
              alt="ELECTROVERSE '26 Logo"
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                border: '2px solid #f59e0b',
                boxShadow: '0 0 25px rgba(245, 158, 11, 0.5)',
              }}
            />
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.7rem, 5vw, 3rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #ffffff 0%, #fbbf24 50%, #00f0ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                lineHeight: 1.1,
                width: '100%',
              }}
            >
              <span>ELECTROVERSE</span>
              <span style={{ fontSize: '0.6em', opacity: 0.8, color: '#00f0ff', marginLeft: '0.05em' }}>'26</span>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.5rem, 2vw, 0.65rem)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
              maxWidth: '85%',
              lineHeight: 1.6,
              marginTop: '-0.5rem',
            }}
          >
            Department of Electrical & Electronics Engineering
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              width: '200px',
              height: '2px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '1px',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--accent-primary), var(--tone-violet))',
                borderRadius: '1px',
                boxShadow: '0 0 8px var(--accent-primary)',
                width: `${progress}%`,
                transition: 'width 0.1s ease-out',
              }}
            />
          </motion.div>

          {/* Status text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: phase === 'ready' ? 'var(--accent-primary)' : 'var(--text-tertiary)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              transition: 'color 0.3s',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {status}
          </motion.div>

          {/* Percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.2em',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {Math.round(progress)}%
          </motion.div>

          {/* Electric pulse on ready */}
          {phase === 'ready' && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 20, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,212,255,0.3), transparent)',
                zIndex: 0,
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
