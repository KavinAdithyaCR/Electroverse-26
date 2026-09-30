import { useState, useCallback, lazy, Suspense, useEffect } from 'react';
import './index.css';
import { technicalEvents } from './data/config';

// Eagerly loaded (critical path)
import LoadingScreen from './components/LoadingScreen';
import LightningFireFX from './components/LightningFireFX';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';

// Lazy loaded (below the fold)
const About = lazy(() => import('./components/About'));
const EventGrid = lazy(() => import('./components/EventGrid'));
const Timeline = lazy(() => import('./components/Timeline'));
const RegistrationForm = lazy(() => import('./components/RegistrationForm'));
const InstagramSection = lazy(() => import('./components/InstagramSection'));
const Contact = lazy(() => import('./components/Contact'));
const FinalCTA = lazy(() => import('./components/FinalCTA'));
const Footer = lazy(() => import('./components/Footer'));

function LazySection({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div style={{ minHeight: '200px' }} />}>{children}</Suspense>;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent browser from remembering previous scroll position on reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Force scroll to top on initial load
    window.scrollTo(0, 0);
  }, []);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Use the 9 technical events
  const allEvents = [...technicalEvents];

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Background layers */}
      <LightningFireFX />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main id="main-content">
        {/* Hero */}
        <Hero />

        {/* Countdown */}
        <Countdown />

        {/* Electric separator */}
        <div className="electric-separator" />

        {/* About */}
        <LazySection>
          <About />
        </LazySection>

        <div className="electric-separator" />

        {/* Combined Symposium Events (Technical & Non-Technical Parallel Grid) */}
        <LazySection>
          <EventGrid
            events={allEvents}
            sectionId="events"
            title="SYMPOSIUM EVENTS"
            subtitle="Explore our 9 flagship technical events split across TECHNICAL EVENTS and TECH WITH FUN sections."
            accentColor="#f59e0b"
            showTabs={true}
          />
        </LazySection>

        <div className="electric-separator" />

        {/* Timeline */}
        <LazySection>
          <Timeline />
        </LazySection>

        <LazySection>
          <RegistrationForm />
        </LazySection>

        <div className="electric-separator" />

        <LazySection>
          <InstagramSection />
        </LazySection>

        <div className="electric-separator" />

        {/* Contact */}
        <LazySection>
          <Contact />
        </LazySection>

        <div className="electric-separator" />

        {/* Final CTA */}
        <LazySection>
          <FinalCTA />
        </LazySection>
      </main>

      {/* Footer */}
      <LazySection>
        <Footer />
      </LazySection>
    </>
  );
}
