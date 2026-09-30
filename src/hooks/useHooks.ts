import { useState, useEffect, useCallback, useRef } from 'react';

// ---- useCountdown ----
export function useCountdown(targetDate: string) {
  const calculateTimeLeft = useCallback(() => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isLive: false,
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return timeLeft;
}

// ---- useMousePosition ----
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return position;
}

// ---- useInView ----
export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(element);
      }
    }, { threshold: 0.1, ...options });

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
}

// ---- useMediaQuery ----
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

// ---- useScrollProgress ----
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return progress;
}

// ---- useActiveSection ----
export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );

    const observedIds = new Set<string>();

    const checkElements = () => {
      let allFound = true;
      sectionIds.forEach((id) => {
        if (!observedIds.has(id)) {
          const el = document.getElementById(id);
          if (el) {
            observer.observe(el);
            observedIds.add(id);
          } else {
            allFound = false;
          }
        }
      });
      return allFound;
    };

    // Initial check
    if (!checkElements()) {
      // If some elements aren't in DOM yet (e.g. lazy loading), poll until found
      const interval = setInterval(() => {
        if (checkElements()) {
          clearInterval(interval);
        }
      }, 500);
      return () => {
        clearInterval(interval);
        observer.disconnect();
      };
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}

// ---- useEasterEgg ----
export function useEasterEgg() {
  const [clickCount, setClickCount] = useState(0);
  const [engineeringMode, setEngineeringMode] = useState(false);
  const konamiRef = useRef<string[]>([]);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  const handleLogoClick = useCallback(() => {
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        setTimeout(() => setClickCount(0), 2000);
        return next;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      konamiRef.current.push(e.key);
      if (konamiRef.current.length > konamiCode.length) {
        konamiRef.current.shift();
      }
      if (konamiRef.current.join(',') === konamiCode.join(',')) {
        setEngineeringMode(true);
        konamiRef.current = [];
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return {
    logoClicked: clickCount >= 3,
    handleLogoClick,
    engineeringMode,
    resetLogoClick: () => setClickCount(0),
  };
}
