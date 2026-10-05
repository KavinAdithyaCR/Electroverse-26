import { useState, useRef, MouseEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EventItem } from '../data/config';
import MagneticButton from './MagneticButton';
import { X, Users, MapPin, Clock, Phone, Sparkles } from 'lucide-react';

// ---- GlowCard ----
export function GlowCard({
  event,
  onClick,
  accentColor = '#00f0ff',
}: {
  event: EventItem;
  onClick: () => void;
  accentColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    const glow = card.querySelector('.card-glow') as HTMLElement;
    if (glow) {
      glow.style.left = `${e.clientX - rect.left}px`;
      glow.style.top = `${e.clientY - rect.top}px`;
      glow.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0)';
      const glow = card.querySelector('.card-glow') as HTMLElement;
      if (glow) glow.style.opacity = '0';
    }
  };

  const isPaper = event.category === 'technical-1';
  const cardColor = isPaper ? '#f59e0b' : '#00f0ff';
  const categoryLabel = isPaper ? '📄 TECHNICAL EVENTS' : '⚡ TECH WITH FUN';
  const bgBadge = isPaper ? 'rgba(245, 158, 11, 0.12)' : 'rgba(0, 240, 255, 0.12)';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      ref={cardRef}
      className="interactive"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View details for ${event.name}`}
      style={{
        background: 'rgba(10, 15, 30, 0.75)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${cardColor}30`,
        borderRadius: '20px',
        padding: 'clamp(1.2rem, 2.5vw, 1.6rem)',
        cursor: 'none',
        transition: 'transform 0.2s ease-out, border-color 0.4s, box-shadow 0.4s',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = cardColor;
        e.currentTarget.style.boxShadow = `0 0 25px ${cardColor}40, 0 10px 30px rgba(0,0,0,0.8)`;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = `${cardColor}30`;
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
      }}
    >
      {/* Mouse-following glow */}
      <div
        className="card-glow"
        style={{
          position: 'absolute',
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${cardColor}25, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          transition: 'opacity 0.4s',
          pointerEvents: 'none',
        }}
      />

      {/* Icon */}
      <div style={{ fontSize: '1.75rem', marginBottom: '0.8rem' }}>
        {event.icon}
      </div>

      {/* Category badge */}
      <div
        style={{
          display: 'inline-block',
          padding: '0.25rem 0.7rem',
          fontSize: '0.62rem',
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          color: cardColor,
          background: bgBadge,
          border: `1px solid ${cardColor}50`,
          borderRadius: '20px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '0.7rem',
        }}
      >
        {categoryLabel}
      </div>

      {/* Name */}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.01em',
          marginBottom: '0.5rem',
        }}
      >
        {event.name}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '1.2rem',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {event.description}
      </p>


    </motion.div>
  );
}

// ---- EventModal ----
export function EventModal({
  event,
  onClose,
  accentColor = '#00f0ff',
}: {
  event: EventItem;
  onClose: () => void;
  accentColor?: string;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 'var(--z-modal)',
          background: 'rgba(3, 5, 18, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'rgba(10, 15, 30, 0.95)',
            backdropFilter: 'blur(30px)',
            border: `1px solid ${accentColor}55`,
            borderRadius: '24px',
            padding: 'clamp(1.2rem, 3vw, 2.2rem)',
            maxWidth: '640px',
            width: '100%',
            maxHeight: '85vh',
            overflow: 'auto',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
            position: 'relative',
            boxShadow: `0 0 50px ${accentColor}25, 0 20px 50px rgba(0,0,0,0.9)`,
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="interactive"
            aria-label="Close modal"
            style={{
              position: 'absolute',
              top: '1.2rem',
              right: '1.2rem',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              width: 36,
              height: 36,
              color: '#ffffff',
              cursor: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s ease',
            }}
          >
            <X size={18} />
          </button>


          <div
            style={{
              display: 'inline-block',
              padding: '0.3rem 0.85rem',
              fontSize: '0.65rem',
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              color: accentColor,
              background: `rgba(0, 240, 255, 0.12)`,
              border: `1px solid ${accentColor}40`,
              borderRadius: '20px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.6rem',
            }}
          >
            {event.category === 'technical-1' ? 'TECHNICAL' : 'TECH WITH FUN'}
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 800,
              background: `linear-gradient(135deg, #ffffff, ${accentColor})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.6rem',
              letterSpacing: '-0.02em',
            }}
          >
            {event.name}
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: 'clamp(0.78rem, 2vw, 0.9rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              marginBottom: '1rem',
            }}
          >
            {event.description}
          </p>

          {/* Info grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.6rem',
              marginBottom: '1rem',
            }}
          >
            {[
              { icon: <Users size={15} />, label: 'Team Size', value: event.teamSize },
              { icon: <Clock size={15} />, label: 'Time', value: event.time },
              { icon: <MapPin size={15} />, label: 'Venue', value: event.venue },
              { icon: <Phone size={15} />, label: 'Contact', value: event.contact.name, subValue: event.contact.phone },
            ].map((info, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.6rem',
                  background: 'rgba(10, 15, 30, 0.6)',
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 240, 255, 0.14)',
                }}
              >
                <div style={{ color: accentColor, display: 'flex' }}>
                  {info.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '0.6rem',
                      color: 'var(--text-tertiary)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-mono)',
                      marginBottom: '0.15rem',
                    }}
                  >
                    {info.label}
                  </div>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#ffffff',
                    }}
                  >
                    {info.value}
                  </div>
                  {info.subValue && (
                    <div
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-secondary)',
                        fontFamily: 'var(--font-mono)',
                        marginTop: '0.1rem',
                      }}
                    >
                      {info.subValue}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Rules */}
          <div style={{ marginBottom: '2rem' }}>
            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: accentColor,
                textTransform: 'uppercase',
                marginBottom: '0.4rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <Sparkles size={14} /> EVENT RULES
            </h3>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem',
                marginBottom: '1rem',
              }}
            >
              {event.rules.map((rule, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
                    color: 'var(--text-secondary)',
                    paddingLeft: '1.2rem',
                    position: 'relative',
                    lineHeight: 1.4,
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      color: accentColor,
                      fontSize: '0.8rem',
                    }}
                  >
                    ⚡
                  </span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* Register button */}
          <div style={{ textAlign: 'center' }}>
            <a href="https://forms.gle/mdLKPiBsBYi769i87" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <MagneticButton
                variant="primary"
                size="lg"
                onClick={() => {}}
              >
                Register Now
              </MagneticButton>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ---- EventGrid (reusable with filter tabs) ----
export default function EventGrid({
  events,
  sectionId,
  title,
  subtitle,
  accentColor = '#00f0ff',
  showTabs = false,
}: {
  events: EventItem[];
  sectionId: string;
  title: string;
  subtitle: string;
  accentColor?: string;
  showTabs?: boolean;
}) {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'technical-1' | 'tech-with-fun'>('all');

  useEffect(() => {
    if (selectedEvent) {
      window.history.pushState({ modalOpen: true }, '');
      const handlePopState = () => {
        setSelectedEvent(null);
      };
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [selectedEvent]);

  const handleCloseModal = () => {
    setSelectedEvent(null);
    if (window.history.state?.modalOpen) {
      window.history.back();
    }
  };

  const filteredEvents = showTabs
    ? activeTab === 'all'
      ? events
      : events.filter((e) => e.category === activeTab)
    : events;

  return (
    <section
      id={sectionId}
      style={{
        padding: 'var(--section-padding) 0',
        position: 'relative',
      }}
    >
      <div className="container">
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: accentColor,
            textAlign: 'center',
            marginBottom: '0.6rem',
          }}
        >
          // {title}
        </div>
        <h2 className="section-title text-center" style={{ textAlign: 'center' }}>
          {title}
        </h2>
        <p className="section-subtitle" style={{ margin: '0 auto 2.5rem', textAlign: 'center' }}>
          {subtitle}
        </p>

        {/* Tab Filters if enabled */}
        {showTabs && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.6rem',
              marginBottom: '3rem',
            }}
          >
            {[
              { id: 'all', label: 'ALL EVENTS (9)' },
              { id: 'technical-1', label: '📄 TECHNICAL EVENTS' },
              { id: 'tech-with-fun', label: '⚡ TECH WITH FUN' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="interactive"
                style={{
                  padding: '0.6rem 1.4rem',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  letterSpacing: '0.08em',
                  color: activeTab === tab.id ? '#050714' : 'var(--text-secondary)',
                  background: activeTab === tab.id
                    ? 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 40%, #00f0ff 100%)'
                    : 'rgba(10, 15, 30, 0.7)',
                  border: activeTab === tab.id
                    ? '1px solid #f59e0b'
                    : '1px solid rgba(245, 158, 11, 0.2)',
                  borderRadius: '9999px',
                  cursor: 'none',
                  transition: 'all 0.3s var(--ease-expo)',
                  boxShadow: activeTab === tab.id ? '0 0 20px rgba(245, 158, 11, 0.4)' : 'none',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        <motion.div layout className="events-grid">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <GlowCard
                key={event.id}
                event={event}
                onClick={() => setSelectedEvent(event)}
                accentColor={accentColor}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={handleCloseModal}
          accentColor={accentColor}
        />
      )}

      <style>{`
        .events-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.5rem;
        }
        .events-grid > * {
          width: calc(25% - 1.125rem);
        }
        @media (max-width: 1100px) {
          .events-grid > * { width: calc(50% - 0.75rem); }
        }
        @media (max-width: 640px) {
          .events-grid > * { width: 100%; }
        }
      `}</style>
    </section>
  );
}
