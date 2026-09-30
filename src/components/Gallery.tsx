import { useState } from 'react';
import SectionReveal from './SectionReveal';

const galleryCategories = ['ALL', 'EVENTS', 'WORKSHOPS', 'CAMPUS', 'MOMENTS'];

// Placeholder gallery items
const galleryItems = [
  { id: 1, category: 'EVENTS', color: 'rgba(0,212,255,0.15)', label: 'Circuit Sprint Finals' },
  { id: 2, category: 'WORKSHOPS', color: 'rgba(123,47,247,0.15)', label: 'IoT Workshop' },
  { id: 3, category: 'CAMPUS', color: 'rgba(0,245,212,0.15)', label: 'Campus View' },
  { id: 4, category: 'MOMENTS', color: 'rgba(168,85,247,0.15)', label: 'Award Ceremony' },
  { id: 5, category: 'EVENTS', color: 'rgba(59,130,246,0.15)', label: 'Robotics Arena' },
  { id: 6, category: 'WORKSHOPS', color: 'rgba(236,72,153,0.15)', label: 'EV Tech Session' },
  { id: 7, category: 'CAMPUS', color: 'rgba(251,191,36,0.12)', label: 'Main Auditorium' },
  { id: 8, category: 'MOMENTS', color: 'rgba(0,212,255,0.12)', label: 'Team Celebration' },
  { id: 9, category: 'EVENTS', color: 'rgba(123,47,247,0.12)', label: 'Project Expo' },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [lightboxItem, setLightboxItem] = useState<typeof galleryItems[0] | null>(null);

  const filtered =
    activeFilter === 'ALL'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section
      id="gallery"
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
            // GALLERY
          </div>
          <h2 className="section-title">EVENT GALLERY</h2>
          <p className="section-subtitle">
            Capturing the energy, innovation, and spirit of ELECTROVERSE '26.
          </p>
        </SectionReveal>

        {/* Filters */}
        <SectionReveal delay={0.2}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '2rem',
              flexWrap: 'wrap',
            }}
          >
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="interactive"
                style={{
                  padding: '0.45rem 1rem',
                  fontSize: '0.65rem',
                  fontFamily: "'Orbitron', monospace",
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color:
                    activeFilter === cat
                      ? '#f59e0b'
                      : 'rgba(255,255,255,0.5)',
                  background:
                    activeFilter === cat
                      ? 'rgba(245,158,11,0.12)'
                      : 'transparent',
                  border: `1px solid ${activeFilter === cat ? 'rgba(245,158,11,0.5)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '20px',
                  cursor: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: activeFilter === cat ? '0 0 15px rgba(245,158,11,0.2)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Gallery grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
          }}
          className="gallery-grid"
        >
          {filtered.map((item) => (
            <div
              key={item.id}
              className="interactive"
              onClick={() => setLightboxItem(item)}
              style={{
                aspectRatio: item.id % 3 === 0 ? '1/1' : '16/10',
                background: item.color,
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'none',
                transition: 'all 0.4s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0,212,255,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div
                  style={{
                    fontSize: '2rem',
                    marginBottom: '0.5rem',
                    opacity: 0.4,
                  }}
                >
                  📸
                </div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.7rem',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  {item.label}
                </span>
              </div>

              {/* Hover overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.5)',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '12px',
                }}
                className="gallery-hover-overlay"
              >
                <span
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: '0.7rem',
                    color: '#00d4ff',
                    letterSpacing: '0.1em',
                  }}
                >
                  VIEW
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <div
          onClick={() => setLightboxItem(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(3,0,20,0.9)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '80%',
              maxWidth: 600,
              aspectRatio: '16/10',
              background: lightboxItem.color,
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <span style={{ fontSize: '3rem', opacity: 0.4 }}>📸</span>
            <span
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              {lightboxItem.label}
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              Click anywhere to close
            </span>
          </div>
        </div>
      )}

      <style>{`
        .gallery-grid > div:hover .gallery-hover-overlay {
          opacity: 1 !important;
        }
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
