import { motion } from 'framer-motion';
import SectionReveal from './SectionReveal';
import MagneticButton from './MagneticButton';

export default function RegistrationForm() {
  const googleFormLink = 'https://forms.gle/mdLKPiBsBYi769i87';

  return (
    <section
      id="register"
      style={{
        paddingTop: '2rem',
        paddingBottom: 'clamp(4rem, 8vw, 8rem)',
        position: 'relative',
      }}
    >
      <div className="container">
        <SectionReveal>
          <div className="eyebrow" style={{ display: 'table', margin: '0 auto 0.8rem' }}>
            // REGISTRATION
          </div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>REGISTER NOW</h2>
          <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 2rem' }}>
            Scan the QR code or click the button below to secure your spot at ELECTROVERSE '26.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div
            style={{
              maxWidth: '500px',
              margin: '0 auto',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card"
              style={{
                padding: 'clamp(2rem, 4vw, 3rem)',
                textAlign: 'center',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2rem',
              }}
            >
              <div
                style={{
                  background: '#ffffff',
                  padding: '1rem',
                  borderRadius: '16px',
                  boxShadow: '0 0 30px rgba(0, 240, 255, 0.2)',
                  display: 'inline-block',
                }}
              >
                <img
                  src="/qr.png"
                  alt="Registration QR Code"
                  style={{
                    width: '100%',
                    maxWidth: '250px',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '8px',
                  }}
                />
              </div>

              <div style={{ width: '100%' }}>
                <a href={googleFormLink} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
                  <MagneticButton variant="primary" size="lg" onClick={() => {}}>
                    ⚡ Open Registration Form
                  </MagneticButton>
                </a>
              </div>

              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  margin: '0',
                  letterSpacing: '0.02em',
                  fontFamily: "var(--font-mono)",
                }}
              >
                <span style={{ color: '#00f0ff', fontWeight: 600 }}>Note:</span> Offline registration is available on <strong>Oct 13</strong> between <strong style={{ color: '#fff' }}>8:30 AM – 10:00 AM</strong>.
              </p>
            </motion.div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
