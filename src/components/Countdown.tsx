import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '../hooks/useHooks';
import { siteConfig } from '../data/config';
import SectionReveal from './SectionReveal';

function FlipDigit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, '0');

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          position: 'relative',
          width: 'clamp(60px, 15vw, 100px)',
          height: 'clamp(70px, 18vw, 110px)',
          background: 'rgba(10,10,30,0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Shine line at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: '1px',
            background:
              'linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)',
          }}
        />

        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -40, opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: 40, opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              fontWeight: 700,
              background: 'linear-gradient(180deg, #ffffff, #00d4ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {display}
          </motion.span>
        </AnimatePresence>

        {/* Center divider */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            height: '1px',
            background: 'rgba(255,255,255,0.05)',
          }}
        />
      </div>

      <div
        style={{
          marginTop: '0.75rem',
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(0.55rem, 1.5vw, 0.7rem)',
          fontWeight: 500,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        {label}
      </div>
    </div>
  );
}

function Separator() {
  return (
    <motion.div
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
      style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
        color: 'rgba(0,212,255,0.5)',
        alignSelf: 'flex-start',
        marginTop: 'clamp(15px, 4vw, 25px)',
      }}
    >
      :
    </motion.div>
  );
}

export default function Countdown() {
  const { days, hours, minutes, seconds, isLive } = useCountdown(siteConfig.eventDate);

  return (
    <section
      style={{
        padding: '1rem 0 3rem 0',
        position: 'relative',
      }}
    >
      <div className="container" style={{ textAlign: 'center' }}>
        <SectionReveal>
          <div
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)',
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '2.5rem',
            }}
          >
            {isLive ? 'THE EVENT IS LIVE ⚡' : 'Online registration Closes in 12/10/2026 Monday Evening 6 PM'}
          </div>
        </SectionReveal>

        {!isLive ? (
          <SectionReveal delay={0.2}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: 'clamp(0.5rem, 2vw, 1.5rem)',
              }}
            >
              <FlipDigit value={days} label="Days" />
              <Separator />
              <FlipDigit value={hours} label="Hours" />
              <Separator />
              <FlipDigit value={minutes} label="Minutes" />
              <Separator />
              <FlipDigit value={seconds} label="Seconds" />
            </div>
          </SectionReveal>
        ) : (
          <SectionReveal>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #00d4ff, #00f5d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ⚡ LIVE NOW ⚡
            </motion.div>
          </SectionReveal>
        )}
      </div>
    </section>
  );
}
