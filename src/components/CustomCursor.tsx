import { useEffect, useState } from 'react';
import { useMousePosition, useMediaQuery } from '../hooks/useHooks';

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (isMobile) return;

    const handleHoverIn = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      }
    };

    const handleHoverOut = () => setIsHovering(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mouseover', handleHoverIn);
    document.addEventListener('mouseout', handleHoverOut);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseover', handleHoverIn);
      document.removeEventListener('mouseout', handleHoverOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMobile]);

  if (isMobile) return null;

  const boltScale = isClicking ? 0.85 : isHovering ? 1.25 : 1.0;

  return (
    <div
      style={{
        position: 'fixed',
        left: x - 8,
        top: y - 1,
        pointerEvents: 'none',
        zIndex: 99999,
        transform: `scale(${boltScale})`,
        transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        filter: isHovering
          ? 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.95)) drop-shadow(0 0 12px rgba(0, 240, 255, 0.6))'
          : 'drop-shadow(0 0 5px rgba(245, 158, 11, 0.8))',
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sharpBoltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <path
          d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
          fill="url(#sharpBoltGrad)"
          stroke="#ffffff"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}


