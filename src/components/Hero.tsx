import { useRef } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../data/config';
import { useMousePosition, useMediaQuery } from '../hooks/useHooks';
import MagneticButton from './MagneticButton';
import { ChevronDown, Zap } from 'lucide-react';

export default function Hero() {
  const mouse = useMousePosition();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const sectionRef = useRef<HTMLElement>(null);

  // Subtle parallax factors
  const px = isMobile ? 0 : ((mouse.x / window.innerWidth) - 0.5) * 14;
  const py = isMobile ? 0 : ((mouse.y / window.innerHeight) - 0.5) * 14;

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const easeExpo = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        minHeight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '3rem 1.5rem 1rem',
      }}
    >
      {/* Grid overlay */}
      <div className="grid-bg" aria-hidden="true" />

      {/* Dual ambient radial glows: Amber power grid (left) & Cyan electric signal (right) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '50vw',
          height: '50vw',
          maxWidth: 650,
          maxHeight: 650,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, rgba(251, 191, 36, 0.08) 50%, transparent 75%)',
          transform: `translate(${px * 0.4}px, ${py * 0.4}px)`,
          transition: 'transform 0.4s var(--ease-smooth)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '50vw',
          height: '50vw',
          maxWidth: 650,
          maxHeight: 650,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.22) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 75%)',
          transform: `translate(${-px * 0.4}px, ${-py * 0.4}px)`,
          transition: 'transform 0.4s var(--ease-smooth)',
          pointerEvents: 'none',
        }}
      />

      {/* Content stack */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          width: '100%',
          transform: `translate(${px * 0.08}px, ${py * 0.08}px)`,
          transition: 'transform 0.4s var(--ease-smooth)',
        }}
      >
        {/* Official Logo Emblem Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 2.2, ease: easeExpo }}
          style={{
            display: 'inline-flex',
            position: 'relative',
            marginBottom: '1.5rem',
          }}
        >
          {/* Pulsing orbital energy ring around logo */}
          <div
            style={{
              position: 'absolute',
              inset: -12,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.5), rgba(0, 240, 255, 0.5))',
              filter: 'blur(16px)',
              opacity: 0.75,
              animation: 'pulse-glow 3s infinite alternate',
            }}
          />
          <img
            src="/logo.jpg"
            alt="ELECTROVERSE '26 Official Emblem"
            style={{
              width: 'clamp(100px, 18vw, 180px)',
              height: 'clamp(100px, 18vw, 180px)',
              objectFit: 'cover',
              borderRadius: '50%',
              border: '2px solid rgba(245, 158, 11, 0.6)',
              boxShadow: '0 0 40px rgba(245, 158, 11, 0.4), 0 0 80px rgba(0, 240, 255, 0.3)',
              position: 'relative',
              zIndex: 2,
            }}
          />
        </motion.div>

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6, ease: easeExpo }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.2rem' }}
        >
          <span className="eyebrow" style={{ border: '1px solid rgba(245, 158, 11, 0.4)', color: '#fbbf24' }}>
            <Zap size={13} color="#f59e0b" />
            {siteConfig.type}
          </span>
        </motion.div>

        {/* Main title: ELECTROVERSE '26 (Full, unified title) */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(16px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, delay: 2.8, ease: easeExpo }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.8rem, 5.5vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #ffffff 0%, #fbbf24 35%, #00f0ff 70%, #f59e0b 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 6s ease infinite',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.6rem',
            filter: 'drop-shadow(0 0 25px rgba(245, 158, 11, 0.3))',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
            width: '100%',
            margin: '0 auto',
          }}
        >
          <span>ELECTROVERSE</span>
          <span style={{ fontSize: '0.6em', marginLeft: '0.05em' }}>'26</span>
        </motion.h1>



        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 3.3, ease: easeExpo }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.75rem, 2vw, 1.1rem)',
            fontWeight: 500,
            color: 'var(--text-secondary)',
            letterSpacing: '0.02em',
            maxWidth: 620,
            margin: '0 auto 2.5rem',
            textWrap: 'balance' as 'balance',
          }}
        >
          {siteConfig.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 3.5, ease: easeExpo }}
          style={{
            display: 'flex',
            gap: '0.85rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <a href="https://forms.gle/mdLKPiBsBYi769i87" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <MagneticButton
              variant="primary"
              size="md"
              onClick={() => {}}
            >
              ⚡ Register Now
            </MagneticButton>
          </a>
          <MagneticButton
            variant="secondary"
            size="md"
            onClick={() =>
              document
                .getElementById('events')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Explore Events
          </MagneticButton>
        </motion.div>

        {/* Cash Prize Creative Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 3.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            marginTop: '1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.4rem 1rem',
            background: 'linear-gradient(90deg, rgba(251, 191, 36, 0.05), rgba(245, 158, 11, 0.15), rgba(251, 191, 36, 0.05))',
            border: '1px solid rgba(251, 191, 36, 0.4)',
            borderRadius: '30px',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.2), inset 0 0 10px rgba(251, 191, 36, 0.1)',
            cursor: 'default',
          }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)' }}
        >
          <span style={{ fontSize: '1.2rem' }}>🏆</span>
          <span
            style={{
              color: '#fbbf24',
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              fontSize: '0.8rem',
            }}
          >
            Win Exciting Cash Prizes!
          </span>
        </motion.div>


      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="interactive"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.4, duration: 0.8 }}
        aria-label="Scroll to about section"
        style={{
          position: 'absolute',
          bottom: '2rem',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          transition: 'color 0.25s var(--ease-expo)',
        }}
      >

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} color="#f59e0b" strokeWidth={1.5} />
        </motion.div>
      </motion.button>

      {/* Decorative side lines */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, delay: 2.8, ease: easeExpo }}
        style={{
          position: 'absolute',
          left: 'clamp(1rem, 4vw, 3rem)',
          top: '20%',
          height: '60%',
          width: '1px',
          background:
            'linear-gradient(180deg, transparent, rgba(245, 158, 11, 0.25), transparent)',
          transformOrigin: 'top',
        }}
      />
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, delay: 2.95, ease: easeExpo }}
        style={{
          position: 'absolute',
          right: 'clamp(1rem, 4vw, 3rem)',
          top: '20%',
          height: '60%',
          width: '1px',
          background:
            'linear-gradient(180deg, transparent, rgba(0, 240, 255, 0.25), transparent)',
          transformOrigin: 'top',
        }}
      />
    </section>
  );
}
