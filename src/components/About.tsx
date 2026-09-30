import { aboutContent } from '../data/config';
import SectionReveal from './SectionReveal';

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: 'var(--section-padding) 0',
        position: 'relative',
      }}
    >
      <div className="grid-bg" aria-hidden="true" />

      <div className="container">
        {/* Section eyebrow — left aligned, breaking symmetry */}
        <SectionReveal direction="left">
          <span className="eyebrow">// {aboutContent.heading}</span>
        </SectionReveal>

        {/* Asymmetric 2-col layout: 55 / 45 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '55fr 45fr',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            alignItems: 'start',
            marginTop: '2.5rem',
          }}
          className="about-grid"
        >
          {/* Left — Large editorial headline */}
          <SectionReveal direction="left">
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 8vw, 4.2rem)',
                  fontWeight: 800,
                  lineHeight: 1.0,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-primary)',
                  marginBottom: '2rem',
                  textWrap: 'balance',
                  wordBreak: 'break-word',
                }}
              >
                WHERE
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--tone-violet))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  INNOVATION
                </span>
                <br />
                MEETS ENERGY
              </h2>

              {/* Accent rule */}
              <div
                aria-hidden="true"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '2rem',
                }}
              >
                <div
                  style={{
                    flex: 1,
                    maxWidth: 200,
                    height: 1,
                    background: 'linear-gradient(90deg, var(--accent-primary), transparent)',
                  }}
                />
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--tone-violet)',
                    boxShadow: '0 0 8px var(--tone-violet)',
                  }}
                />
              </div>


            </div>
          </SectionReveal>

          {/* Right — Elevated glass description card */}
          <SectionReveal direction="right" delay={0.15}>
            <div
              className="glass-card spotlight-card"
              style={{
                padding: 'clamp(1.75rem, 3vw, 2.75rem)',
                position: 'relative',
              }}
            >
              {/* Corner accent top-left */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: -1,
                  left: -1,
                  width: 28,
                  height: 28,
                  borderTop: '2px solid rgba(61, 159, 255, 0.35)',
                  borderLeft: '2px solid rgba(61, 159, 255, 0.35)',
                  borderTopLeftRadius: 'var(--radius-lg)',
                }}
              />
              {/* Corner accent bottom-right */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: -1,
                  right: -1,
                  width: 28,
                  height: 28,
                  borderBottom: '2px solid rgba(139, 92, 246, 0.3)',
                  borderRight: '2px solid rgba(139, 92, 246, 0.3)',
                  borderBottomRightRadius: 'var(--radius-lg)',
                }}
              />

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.875rem, 1.5vw, 0.975rem)',
                  lineHeight: 1.9,
                  color: 'var(--text-secondary)',
                  whiteSpace: 'pre-line',
                  maxWidth: '58ch',
                }}
              >
                {aboutContent.description}
              </p>


            </div>
          </SectionReveal>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
