import { siteConfig } from '../data/config';
import { Camera, Play, MessageCircle } from 'lucide-react';

const socialLinks = [
  { icon: <Camera size={18} />, href: siteConfig.social.instagram, label: 'Instagram' },
];

const quickLinks = [
  { label: 'Events', id: 'events' },
  { label: 'Register', id: 'register' },
  { label: 'Contact', id: 'contact' },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0, 240, 255, 0.2)',
        background: 'rgba(5, 7, 20, 0.85)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Animated waveform */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60px',
          overflow: 'hidden',
          opacity: 0.25,
        }}
      >
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          style={{
            width: '200%',
            height: '100%',
            animation: 'wave 8s linear infinite',
          }}
        >
          <path
            d="M0,30 Q50,10 100,30 T200,30 T300,30 T400,30 T500,30 T600,30 T700,30 T800,30 T900,30 T1000,30 T1100,30 T1200,30"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="2"
          />
          <path
            d="M0,35 Q50,15 100,35 T200,35 T300,35 T400,35 T500,35 T600,35 T700,35 T800,35 T900,35 T1000,35 T1100,35 T1200,35"
            fill="none"
            stroke="#a855f7"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div
        className="container"
        style={{
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2rem)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gap: 'clamp(2rem, 4vw, 4rem)',
            marginBottom: '3rem',
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
              <img
                src="/logo.jpg"
                alt="ELECTROVERSE '26 Emblem"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid rgba(245, 158, 11, 0.6)',
                  boxShadow: '0 0 16px rgba(245, 158, 11, 0.4)',
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 'clamp(1rem, 5vw, 1.5rem)',
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 40%, #00f0ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 12px rgba(245, 158, 11, 0.4))',
                  wordBreak: 'break-word',
                  maxWidth: '100%',
                }}
              >
                {siteConfig.fullName}
              </div>
            </div>
            <p
              style={{
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '0.4rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
              }}
            >
              {siteConfig.tagline}
            </p>
            <p
              style={{
                fontSize: '0.78rem',
                color: '#00f0ff',
                lineHeight: 1.6,
                fontWeight: 500,
                marginBottom: '0.4rem',
              }}
            >
              {siteConfig.subtitle}
            </p>
            <p
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-tertiary)',
                lineHeight: 1.6,
              }}
            >
              {siteConfig.departmentName}
              <br />
              {siteConfig.collegeName}
            </p>

            {/* Social icons */}
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                marginTop: '1.5rem',
              }}
            >
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="interactive"
                  style={{
                    width: 38,
                    height: 38,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '10px',
                    background: 'rgba(245, 158, 11, 0.08)',
                    border: '1px solid rgba(245, 158, 11, 0.25)',
                    color: '#f59e0b',
                    transition: 'all 0.3s ease',
                    cursor: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#00f0ff';
                    e.currentTarget.style.color = '#00f0ff';
                    e.currentTarget.style.boxShadow = '0 0 16px rgba(0, 240, 255, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.25)';
                    e.currentTarget.style.color = '#f59e0b';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#f59e0b',
                marginBottom: '1.2rem',
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="interactive"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      fontSize: '0.82rem',
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
                      cursor: 'none',
                      transition: 'color 0.3s',
                      padding: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#00f0ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Quick */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#00f0ff',
                marginBottom: '1.2rem',
              }}
            >
              Get In Touch
            </h4>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                  transition: 'color 0.3s',
                  textDecoration: 'none',
                }}
              >
                {siteConfig.contactEmail}
              </a>
              <a
                href={`tel:${siteConfig.contactPhone.replace(/\s+/g, '')}`}
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                  transition: 'color 0.3s',
                  textDecoration: 'none',
                }}
              >
                {siteConfig.contactPhone}
              </a>
              <span
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--text-tertiary)',
                }}
              >
                {siteConfig.collegeLocation}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <span
            style={{
              fontSize: '0.72rem',
              color: 'var(--text-tertiary)',
            }}
          >
            © 2026 {siteConfig.collegeName}. All rights reserved.
          </span>
          <span
            style={{
              fontSize: '0.7rem',
              color: 'var(--accent-primary)',
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
            }}
          >
            Built with ⚡ by the EEE Department
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
