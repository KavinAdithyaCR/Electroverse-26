import { motion } from 'framer-motion';
import SectionReveal from './SectionReveal';
import MagneticButton from './MagneticButton';
import { siteConfig } from '../data/config';
import { Camera } from 'lucide-react';

export default function InstagramSection() {
  const instagramLink = siteConfig.social.instagram;

  return (
    <section
      id="instagram"
      style={{
        paddingTop: '2rem',
        paddingBottom: 'clamp(4rem, 8vw, 8rem)',
        position: 'relative',
      }}
    >
      <div className="container">
        <SectionReveal>
          <div className="eyebrow" style={{ display: 'table', margin: '0 auto 0.8rem' }}>
            // FOLLOW US
          </div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>INSTAGRAM</h2>
          <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 2rem' }}>
            Scan the QR code or click the button below to follow our official page for the latest updates.
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
                padding: 'clamp(1rem, 3vw, 1.5rem)',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'nowrap',
                gap: 'clamp(1rem, 4vw, 2rem)',
              }}
            >
              {/* Left side: Button */}
              <div style={{ flex: '1 1 auto', textAlign: 'center' }}>
                <a href={instagramLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', textDecoration: 'none' }}>
                  <MagneticButton variant="secondary" size="md" onClick={() => {}}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                      <Camera size={16} />
                      @ELECTROVERSE_26
                    </span>
                  </MagneticButton>
                </a>
              </div>

              {/* Right side: QR Code */}
              <div
                style={{
                  background: '#ffffff',
                  padding: '0.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 0 20px rgba(245, 158, 11, 0.15)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: '0 0 auto',
                  margin: '0 auto',
                  width: '120px',
                  height: '120px',
                }}
              >
                <img
                  src="/new-insta-qr.jpg"
                  alt="Instagram QR Code"
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    borderRadius: '6px',
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerText = 'Save image as insta-qr.png in public folder';
                    (e.target as HTMLImageElement).parentElement!.style.fontSize = '0.7rem';
                    (e.target as HTMLImageElement).parentElement!.style.color = '#333';
                    (e.target as HTMLImageElement).parentElement!.style.textAlign = 'center';
                  }}
                />
              </div>
            </motion.div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
