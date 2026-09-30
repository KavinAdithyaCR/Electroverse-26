import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/config';
import { useScrollProgress, useActiveSection } from '../hooks/useHooks';
import { useEasterEgg } from '../hooks/useHooks';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'events', label: 'Events' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'contact', label: 'Contact' },
  { id: 'register', label: 'Registration' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const progress = useScrollProgress();
  const sectionIds = useMemo(() => navItems.map((n) => n.id), []);
  const activeSection = useActiveSection(sectionIds);
  const { handleLogoClick, logoClicked, resetLogoClick } = useEasterEgg();

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (logoClicked) {
      const timer = setTimeout(resetLogoClick, 2000);
      return () => clearTimeout(timer);
    }
  }, [logoClicked, resetLogoClick]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    if (id === 'register') {
      window.open('https://forms.gle/mdLKPiBsBYi769i87', '_blank');
      setMobileMenuOpen(false);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Scroll progress bar — ultra-thin, at top */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '1px',
          width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, var(--accent-primary), var(--tone-violet))',
          zIndex: 'calc(var(--z-nav) + 1)',
          transition: 'width 0.1s linear',
          boxShadow: '0 0 6px var(--accent-primary)',
        }}
      />

      {/* Floating pill navbar */}
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 2.4 }}
        style={{
          position: 'fixed',
          top: isScrolled ? '0.75rem' : '1.25rem',
          right: isScrolled ? '1rem' : '2rem',
          zIndex: 'var(--z-nav)',
          width: 'fit-content',
          maxWidth: 'calc(100vw - 2rem)',
          background: isScrolled
            ? 'rgba(10, 15, 30, 0.85)'
            : 'rgba(5, 7, 20, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: isScrolled
            ? '1px solid rgba(0, 240, 255, 0.35)'
            : '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '9999px',
          boxShadow: isScrolled
            ? '0 10px 30px rgba(0, 240, 255, 0.15), 0 0 20px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(0, 240, 255, 0.2)'
            : '0 4px 20px rgba(0, 0, 0, 0.5)',
          transition: 'all 0.5s cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            padding: '0.5rem 1rem 0.5rem 1.25rem',
            position: 'relative',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => {
              handleLogoClick();
              scrollTo('home');
            }}
            className="interactive"
            aria-label="ELECTROVERSE '26 — Go to top"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'transparent',
              border: 'none',
              cursor: 'none',
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <img
              src="/logo.jpg"
              alt="Logo"
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid #f59e0b',
                boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)',
              }}
            />
            {/* Easter egg ring */}
            <AnimatePresence>
              {logoClicked && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{ scale: 3.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: -8,
                    borderRadius: '50%',
                    border: '2px solid var(--accent-primary)',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </AnimatePresence>
          </button>
          </div>

          {/* Right aligned group */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Nav links */}
            <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="interactive"
                aria-current={activeSection === item.id ? 'page' : undefined}
                style={{
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: activeSection === item.id ? 700 : 500,
                  letterSpacing: '0.02em',
                  color: activeSection === item.id
                    ? '#00f0ff'
                    : 'rgba(255, 255, 255, 0.75)',
                  background: activeSection === item.id
                    ? 'rgba(0, 240, 255, 0.12)'
                    : 'transparent',
                  border: activeSection === item.id
                    ? '1px solid rgba(0, 240, 255, 0.3)'
                    : '1px solid transparent',
                  borderRadius: '9999px',
                  cursor: 'none',
                  transition: 'all 0.25s var(--ease-expo)',
                  position: 'relative',
                  textShadow: activeSection === item.id ? '0 0 8px rgba(0, 240, 255, 0.6)' : 'none',
                }}
              >
                {item.id === 'register' ? (
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #fbbf24 50%, #00f0ff 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontWeight: 800,
                    }}
                  >
                    {item.label}
                  </span>
                ) : (
                  item.label
                )}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      bottom: 2,
                      left: '20%',
                      right: '20%',
                      height: '2px',
                      background: 'linear-gradient(90deg, #f59e0b, #00f0ff)',
                      borderRadius: '1px',
                      boxShadow: '0 0 8px #f59e0b',
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            ))}

          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-toggle interactive"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              style={{
                display: 'none',
                width: 36,
                height: 36,
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 240, 255, 0.1)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                borderRadius: '50%',
                color: '#00f0ff',
                cursor: 'pointer',
                flexShrink: 0,
                padding: 0,
              }}
            >
            {/* Hamburger → X morph */}
            <div style={{ position: 'relative', width: 16, height: 12 }}>
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  width: 16,
                  height: 1.5,
                  background: 'currentColor',
                  borderRadius: 1,
                  top: mobileMenuOpen ? 5.25 : 0,
                  transform: mobileMenuOpen ? 'rotate(45deg)' : 'none',
                  transition: 'all 0.35s var(--ease-expo)',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  width: 16,
                  height: 1.5,
                  background: 'currentColor',
                  borderRadius: 1,
                  top: 5.25,
                  opacity: mobileMenuOpen ? 0 : 1,
                  transition: 'opacity 0.2s ease',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  width: 16,
                  height: 1.5,
                  background: 'currentColor',
                  borderRadius: 1,
                  top: mobileMenuOpen ? 5.25 : 10.5,
                  transform: mobileMenuOpen ? 'rotate(-45deg)' : 'none',
                  transition: 'all 0.35s var(--ease-expo)',
                }}
              />
            </div>
          </button>
        </div>
        </div>
      </div>
    </motion.nav>

    {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 'calc(var(--z-nav) - 1)',
              background: 'rgba(5, 7, 20, 0.95)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0,
            }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{
                  delay: i * 0.055,
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => scrollTo(item.id)}
                style={{
                  padding: '0.9rem 2.5rem',
                  fontSize: '1.15rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  color: activeSection === item.id
                    ? '#00f0ff'
                    : 'rgba(255, 255, 255, 0.8)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  textShadow: activeSection === item.id ? '0 0 12px rgba(0, 240, 255, 0.6)' : 'none',
                }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.055 + 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => scrollTo('register')}
              style={{
                marginTop: '1.5rem',
                padding: '0.75rem 2.5rem',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                letterSpacing: '0.04em',
                color: '#050714',
                background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 40%, #00f0ff 100%)',
                border: 'none',
                borderRadius: '9999px',
                cursor: 'pointer',
                boxShadow: '0 0 24px rgba(245, 158, 11, 0.5)',
              }}
            >
              Register Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}
