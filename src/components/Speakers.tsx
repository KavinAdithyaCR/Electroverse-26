import { speakers } from '../data/config';
import SectionReveal, { StaggerContainer, StaggerItem } from './SectionReveal';
import { useRef, MouseEvent } from 'react';
import { Mic } from 'lucide-react';

function SpeakerCard({
  speaker,
}: {
  speaker: (typeof speakers)[0];
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = 'perspective(800px) rotateY(0) rotateX(0)';
  };

  return (
    <div
      ref={cardRef}
      className="interactive glass-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: 'clamp(1.5rem, 2.5vw, 2rem)',
        textAlign: 'center',
        transition: 'transform 0.2s ease-out, border-color 0.4s, box-shadow 0.4s',
        cursor: 'none',
        border: '1px solid rgba(0, 240, 255, 0.18)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#00f0ff';
        e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 240, 255, 0.3)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.18)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Avatar icon */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background:
            'linear-gradient(135deg, rgba(0, 240, 255, 0.18), rgba(168, 85, 247, 0.18))',
          border: '2px solid rgba(0, 240, 255, 0.35)',
          margin: '0 auto 1.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00f0ff',
          boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)',
        }}
      >
        <Mic size={28} />
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: '1rem',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.01em',
          marginBottom: '0.3rem',
        }}
      >
        {speaker.name}
      </h3>
      <div
        style={{
          fontSize: '0.78rem',
          color: '#00f0ff',
          marginBottom: '0.2rem',
          fontWeight: 600,
          fontFamily: "var(--font-body)",
        }}
      >
        {speaker.designation}
      </div>
      <div
        style={{
          fontSize: '0.72rem',
          color: 'var(--text-tertiary)',
          marginBottom: '1rem',
          fontFamily: "var(--font-mono)",
        }}
      >
        {speaker.organization}
      </div>
      <div
        style={{
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          fontStyle: 'italic',
          lineHeight: 1.5,
          padding: '0.66rem 0.8rem',
          background: 'rgba(10, 15, 30, 0.6)',
          borderRadius: '10px',
          border: '1px solid rgba(0, 240, 255, 0.12)',
        }}
      >
        "{speaker.topic}"
      </div>
    </div>
  );
}

export default function Speakers() {
  return (
    <section
      id="speakers"
      style={{
        padding: 'var(--section-padding) 0',
        position: 'relative',
      }}
    >
      <div className="container">
        <SectionReveal>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#00f0ff',
              textAlign: 'center',
              marginBottom: '0.6rem',
            }}
          >
            // SPEAKERS
          </div>
          <h2 className="section-title text-center" style={{ textAlign: 'center' }}>
            MEET OUR SPEAKERS
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto 3rem', textAlign: 'center' }}>
            Industry pioneers and academic leaders sharing insights on the future of electrical engineering.
          </p>
        </SectionReveal>

        <StaggerContainer className="speakers-grid" staggerDelay={0.1}>
          {speakers.map((speaker) => (
            <StaggerItem key={speaker.id}>
              <SpeakerCard speaker={speaker} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <style>{`
        .speakers-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .speakers-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .speakers-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
