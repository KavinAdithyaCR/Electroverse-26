import { sponsors } from '../data/config';
import SectionReveal from './SectionReveal';

export default function SponsorWall() {
  // Double the sponsors for infinite scroll
  const allSponsors = [...sponsors, ...sponsors];

  return (
    <section
      style={{
        padding: 'clamp(4rem, 8vw, 6rem) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <SectionReveal>
          <div
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)',
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(0,212,255,0.6)',
              textAlign: 'center',
              marginBottom: '0.8rem',
            }}
          >
            // SPONSORS
          </div>
          <h2 className="section-title">POWERED BY OUR SPONSORS</h2>
          <p className="section-subtitle">
            Supported by industry leaders who believe in the future of engineering.
          </p>
        </SectionReveal>
      </div>

      {/* Infinite scroll track */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '2rem 0',
        }}
      >
        {/* Fade edges */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '100px',
            background: 'linear-gradient(90deg, #030014, transparent)',
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '100px',
            background: 'linear-gradient(270deg, #030014, transparent)',
            zIndex: 2,
          }}
        />

        <div
          className="sponsor-track"
          style={{
            display: 'flex',
            gap: '2rem',
            animation: 'wave 20s linear infinite',
            width: 'max-content',
          }}
        >
          {allSponsors.map((sponsor, i) => (
            <div
              key={i}
              className="interactive"
              style={{
                flexShrink: 0,
                width: 'clamp(150px, 20vw, 200px)',
                height: 80,
                background: 'rgba(10,10,30,0.5)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                cursor: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {sponsor.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .sponsor-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
