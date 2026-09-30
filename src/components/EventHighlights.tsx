import { useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { eventHighlights } from '../data/config';
import SectionReveal, { StaggerContainer, StaggerItem } from './SectionReveal';

function HighlightCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)';
  };

  return (
    <div
      ref={cardRef}
      className="interactive"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'rgba(10,10,30,0.5)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
        padding: 'clamp(1.2rem, 2.5vw, 1.8rem)',
        transition: 'transform 0.15s ease-out, border-color 0.4s, box-shadow 0.4s',
        cursor: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        const card = e.currentTarget;
        card.style.borderColor = 'rgba(0,212,255,0.2)';
        card.style.boxShadow = '0 0 30px rgba(0,212,255,0.1)';
      }}
      onMouseOut={(e) => {
        const card = e.currentTarget;
        card.style.borderColor = 'rgba(255,255,255,0.06)';
        card.style.boxShadow = 'none';
      }}
    >
      {/* Top glow line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '20%',
          right: '20%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)',
          opacity: 0,
          transition: 'opacity 0.4s',
        }}
        className="card-glow-line"
      />

      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{icon}</div>
      <h3
        style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '0.05em',
          marginBottom: '0.5rem',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 'clamp(0.75rem, 1.2vw, 0.8rem)',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
    </div>
  );
}

export default function EventHighlights() {
  return (
    <section
      style={{
        padding: 'clamp(4rem, 8vw, 8rem) 0',
        position: 'relative',
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
            // HIGHLIGHTS
          </div>
          <h2 className="section-title">WHAT AWAITS YOU</h2>
          <p className="section-subtitle">
            A day packed with competitions, workshops, lectures, and innovation
            — designed for the next generation of electrical engineers.
          </p>
        </SectionReveal>

        <StaggerContainer
          staggerDelay={0.08}
          className="highlights-grid"
        >
          {eventHighlights.map((item, i) => (
            <StaggerItem key={i}>
              <HighlightCard
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <style>{`
        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.2rem;
        }
        @media (max-width: 1024px) {
          .highlights-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .highlights-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
