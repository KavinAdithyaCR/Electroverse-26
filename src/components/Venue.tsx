import { siteConfig } from '../data/config';
import SectionReveal from './SectionReveal';
import { MapPin, Clock, Car, Navigation } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Venue() {
  return (
    <section
      id="venue"
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
            // VENUE LOCATION
          </div>
          <h2 className="section-title text-center" style={{ textAlign: 'center' }}>
            LOCATION & VENUE
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto 3rem', textAlign: 'center' }}>
            Find us at the heart of innovation. Reach the campus easily with full accessibility and parking facilities.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div
            style={{
              maxWidth: '880px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.8rem',
            }}
            className="venue-grid"
          >
            {/* Map preview card */}
            <div
              className="glass-card"
              style={{
                padding: '1.5rem',
                overflow: 'hidden',
                minHeight: '340px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '1.2rem',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                background: 'rgba(10, 15, 30, 0.75)',
                position: 'relative',
              }}
            >
              {/* Stylized high-tech map grid */}
              <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage:
                      'linear-gradient(rgba(0, 240, 255, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.12) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                    borderRadius: '12px',
                    border: '1px solid rgba(0, 240, 255, 0.15)',
                  }}
                />
                {/* Circuit lines */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    height: 2,
                    background:
                      'linear-gradient(90deg, transparent, #00f0ff, transparent)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    bottom: 0,
                    width: 2,
                    background:
                      'linear-gradient(180deg, transparent, #f59e0b, transparent)',
                  }}
                />
                {/* Pulsing beacon */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: '#00f0ff',
                    boxShadow: '0 0 24px #00f0ff, 0 0 50px rgba(0, 240, 255, 0.5)',
                    animation: 'pulse-glow 2s ease-in-out infinite',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#050714',
                  }}
                >
                  <MapPin size={14} />
                </div>
              </div>

              <MagneticButton
                variant="primary"
                size="sm"
                href={siteConfig.venue.mapUrl}
              >
                <Navigation size={14} /> Open Live GPS Directions
              </MagneticButton>
            </div>

            {/* Venue info cards */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {[
                {
                  icon: <MapPin size={18} color="#00f0ff" />,
                  label: 'Campus Address',
                  value: `${siteConfig.venue.name}\n${siteConfig.venue.address}`,
                },
                {
                  icon: <Clock size={18} color="#f59e0b" />,
                  label: 'Date & Time',
                  value: `${siteConfig.eventDisplayDate}\n${siteConfig.eventTime}`,
                },
                {
                  icon: <Car size={18} color="#fbbf24" />,
                  label: 'Parking & Access',
                  value: siteConfig.venue.parking,
                },
                {
                  icon: <Navigation size={18} color="#f59e0b" />,
                  label: 'Route Guide',
                  value: siteConfig.venue.directions,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="glass-card"
                  style={{
                    padding: '1.1rem 1.4rem',
                    display: 'flex',
                    gap: '1.1rem',
                    alignItems: 'flex-start',
                    border: '1px solid rgba(0, 240, 255, 0.14)',
                  }}
                >
                  <div style={{ marginTop: '0.15rem', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '0.62rem',
                        color: 'var(--text-tertiary)',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        marginBottom: '0.35rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        whiteSpace: 'pre-line',
                        fontWeight: 500,
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .venue-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
