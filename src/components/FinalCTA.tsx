import { motion } from 'framer-motion';
import { siteConfig } from '../data/config';
import SectionReveal from './SectionReveal';
import MagneticButton from './MagneticButton';

export default function FinalCTA() {
  return (
    <section
      style={{
        padding: 'clamp(6rem, 12vw, 10rem) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background energy field */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(0,212,255,0.06) 0%, rgba(123,47,247,0.03) 40%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid */}
      <div className="grid-bg" />

      {/* Animated border lines */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), rgba(123,47,247,0.3), transparent)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '10%',
          right: '10%',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(123,47,247,0.3), rgba(0,212,255,0.3), transparent)',
        }}
      />

      <div
        className="container"
        style={{
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <SectionReveal>
          <div
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)',
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(0,212,255,0.5)',
              marginBottom: '1.5rem',
            }}
          >
            // ARE YOU READY?
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h2
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              background:
                'linear-gradient(135deg, #ffffff, #00d4ff, #00f5d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1rem',
            }}
          >
            READY TO POWER
            <br />
            THE FUTURE?
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <p
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 'clamp(0.9rem, 2vw, 1.3rem)',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.15em',
              marginBottom: '2.5rem',
            }}
          >
            JOIN {siteConfig.fullName}
          </p>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a href="https://forms.gle/mdLKPiBsBYi769i87" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <MagneticButton
                variant="primary"
                size="lg"
                onClick={() => {}}
              >
                ⚡ Register Now
              </MagneticButton>
            </a>
            <MagneticButton
              variant="secondary"
              size="lg"
              onClick={() =>
                document
                  .getElementById('events')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Explore Events
            </MagneticButton>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
