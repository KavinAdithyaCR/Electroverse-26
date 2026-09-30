import { contacts } from '../data/config';
import SectionReveal, { StaggerContainer, StaggerItem } from './SectionReveal';
import { Phone, User } from 'lucide-react';

export default function Contact() {
  return (
    <section
      id="contact"
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
            // CONTACT TEAM
          </div>
          <h2 className="section-title text-center" style={{ textAlign: 'center' }}>
            CONTACT THE ORGANIZERS
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto 3rem', textAlign: 'center' }}>
            Have questions about events or registration? Reach out directly to our student coordinators.
          </p>
        </SectionReveal>

        <StaggerContainer className="contact-grid" staggerDelay={0.1}>
          {contacts.map((contact, i) => (
            <StaggerItem key={i}>
              <div
                className="glass-card interactive"
                style={{
                  padding: 'clamp(1rem, 2vw, 1.5rem)',
                  textAlign: 'center',
                  cursor: 'none',
                  border: '1px solid rgba(0, 240, 255, 0.18)',
                  background: 'rgba(10, 15, 30, 0.75)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background:
                      'linear-gradient(135deg, rgba(0, 240, 255, 0.18), rgba(168, 85, 247, 0.18))',
                    border: '1px solid rgba(0, 240, 255, 0.3)',
                    margin: '0 auto 0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00f0ff',
                    boxShadow: '0 0 16px rgba(0, 240, 255, 0.2)',
                  }}
                >
                  <User size={22} />
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    marginBottom: '0.15rem',
                  }}
                >
                  {contact.name}
                </h3>
                <div
                  style={{
                    fontSize: '0.65rem',
                    color: '#00f0ff',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '0.8rem',
                    fontWeight: 600,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {contact.role}
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.55rem',
                  }}
                >
                  <a
                    href={`tel:${contact.phone}`}
                    className="interactive"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.45rem',
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)',
                      background: 'rgba(10, 15, 30, 0.6)',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 240, 255, 0.15)',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      cursor: 'none',
                      fontFamily: "var(--font-mono)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#00f0ff';
                      e.currentTarget.style.color = '#00f0ff';
                      e.currentTarget.style.boxShadow = '0 0 12px rgba(0, 240, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.15)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Phone size={13} />
                    {contact.phone}
                  </a>

                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
          max-width: 1080px;
          margin: 0 auto;
          justify-items: center;
        }
        .contact-grid > * {
          width: 100%;
          max-width: 320px;
        }
      `}</style>
    </section>
  );
}
