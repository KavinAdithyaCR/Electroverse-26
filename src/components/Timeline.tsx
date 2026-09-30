import { useState } from 'react';
import { timeline } from '../data/config';
import SectionReveal from './SectionReveal';
import { useInView } from '../hooks/useHooks';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Sparkles, Filter } from 'lucide-react';

export default function Timeline() {
  const { ref, isInView } = useInView();


  const categoryBadges: Record<string, { label: string; color: string; bg: string; border: string }> = {
    technical: { label: 'TECHNICAL', color: '#00f0ff', bg: 'rgba(0, 240, 255, 0.1)', border: 'rgba(0, 240, 255, 0.3)' },
    'non-technical': { label: 'NON-TECH', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.3)' },
    ceremony: { label: 'KEYNOTE', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.35)' },
    break: { label: 'NETWORKING', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)' },
  };

  return (
    <section
      id="schedule"
      style={{
        paddingTop: 'clamp(4rem, 8vw, 8rem)',
        paddingBottom: '2rem',
        position: 'relative',
      }}
    >
      <div className="container">
        <SectionReveal>
          <div className="eyebrow" style={{ display: 'table', margin: '0 auto 0.8rem' }}>
            <Sparkles size={14} /> SCHEDULE & TRACKS
          </div>
          <h2 className="section-title text-center" style={{ marginBottom: '3rem' }}>EVENT FLOW</h2>
        </SectionReveal>

        <div
          ref={ref}
          style={{
            position: 'relative',
            maxWidth: '100%',
            margin: '0 auto',
            overflowX: 'auto',
            padding: '2rem 0',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="timeline-container"
        >
          <style>{`
            .timeline-container::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <AnimatePresence mode="wait">
            <motion.div
              key="timeline"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              style={{
                display: 'flex',
                minWidth: 'max-content',
                position: 'relative',
                justifyContent: 'flex-start',
                padding: '0 2rem',
                margin: '0 auto',
              }}
            >
              {/* Horizontal dashed line */}
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  top: '115px',
                  left: '2rem',
                  right: '2rem',
                  height: '1px',
                  borderTop: '1px dashed rgba(255, 255, 255, 0.2)',
                  zIndex: 0,
                  transformOrigin: 'left'
                }} 
              />

              {timeline.map((item, i) => {
                const badge = categoryBadges[item.category] || categoryBadges['technical'];

                return (
                  <motion.div
                    key={`${item.time}-${item.event}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative',
                      width: '280px',
                      flexShrink: 0,
                      padding: '0 1rem'
                    }}
                  >
                    {/* Faint vertical line */}
                    <div style={{
                      position: 'absolute',
                      top: '35px',
                      left: '50%',
                      width: '1px',
                      height: '125px',
                      background: badge.color,
                      opacity: 0.3,
                      zIndex: 0,
                    }} />

                    {/* Icon container */}
                    <div style={{
                      width: '70px', height: '70px', borderRadius: '50%',
                      background: badge.bg,
                      border: `1px solid ${badge.border}`,
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      marginBottom: '90px',
                      position: 'relative',
                      zIndex: 1,
                    }}>
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        background: badge.color,
                        color: '#050714',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        boxShadow: `0 0 15px ${badge.color}`,
                      }}>
                        <div style={{ display: 'flex', transform: 'scale(0.85)' }}>
                          {item.icon}
                        </div>
                      </div>
                    </div>

                    {/* The dot */}
                    <div style={{
                      width: '12px', height: '12px', borderRadius: '50%',
                      background: badge.color,
                      position: 'absolute',
                      top: '115px',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 2,
                      boxShadow: `0 0 10px ${badge.color}`
                    }} />

                    {/* Time pill */}
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.6)',
                      border: `1px solid ${badge.border}`,
                      borderRadius: '20px',
                      padding: '0.4rem 1.4rem',
                      color: badge.color,
                      fontWeight: '700',
                      fontSize: '0.95rem',
                      fontFamily: 'var(--font-mono)',
                      marginBottom: '1.2rem',
                      position: 'relative',
                      zIndex: 1,
                      backdropFilter: 'blur(8px)',
                    }}>
                      {item.time}
                    </div>

                    {/* Title */}
                    <h3 style={{
                      color: 'white',
                      marginBottom: '0.8rem',
                      textAlign: 'center',
                      fontSize: '1.15rem',
                      fontWeight: '700',
                      fontFamily: 'var(--font-display)',
                      lineHeight: '1.3'
                    }}>
                      {item.event}
                    </h3>

                    {/* Description */}
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      textAlign: 'center',
                      fontSize: '0.85rem',
                      lineHeight: '1.6',
                      maxWidth: '240px',
                      marginBottom: '1rem'
                    }}>
                      {item.description}
                    </p>

                    {/* Venue */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-tertiary)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <MapPin size={12} style={{ color: badge.color }} />
                      <span>{item.venue}</span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

