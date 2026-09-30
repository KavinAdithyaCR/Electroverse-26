import { useRef, ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  download?: string | boolean;
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  variant = 'primary',
  size = 'md',
  href,
  download,
}: Props) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    const btn = btnRef.current;
    if (btn) btn.style.transform = 'translate(0, 0)';
  };

  const sizeClasses = {
    sm: { padding: '0.55rem 1.4rem', fontSize: '0.78rem' },
    md: { padding: '0.8rem 2rem', fontSize: '0.83rem' },
    lg: { padding: '0.95rem 2.6rem', fontSize: '0.87rem' },
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, var(--accent-primary), #5aaeff)',
      border: '1px solid rgba(61, 159, 255, 0.35)',
      color: '#050510',
    },
    secondary: {
      background: 'rgba(61, 159, 255, 0.08)',
      border: '1px solid var(--border-glow)',
      color: 'var(--accent-primary)',
    },
    outline: {
      background: 'transparent',
      border: '1px solid var(--border-subtle)',
      color: 'var(--text-secondary)',
    },
  };

  const style = variantStyles[variant];
  const sizeStyle = sizeClasses[size];

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: sizeStyle.padding,
    fontSize: sizeStyle.fontSize,
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    letterSpacing: '0.02em',
    border: style.border,
    borderRadius: 'var(--radius-pill)',
    background: style.background,
    color: style.color,
    cursor: 'none',
    position: 'relative' as const,
    overflow: 'hidden',
    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
    textDecoration: 'none',
  };

  const content = (
    <>
      {/* Shine sweep effect */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)',
          transform: 'translateX(-100%)',
          transition: 'transform 0.6s ease',
          pointerEvents: 'none',
        }}
        className="shine-sweep"
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </>
  );

  const Tag = href ? 'a' : 'button';

  return (
    <motion.div
      style={{ display: 'inline-block' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Tag
        ref={btnRef as any}
        className={`magnetic-btn interactive ${className}`}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        href={href}
        download={download}
        style={baseStyles}
      >
        {content}
      </Tag>
      <style>{`
        .magnetic-btn {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.12s ease-out !important;
        }
        .magnetic-btn:hover {
          box-shadow: var(--shadow-glow);
        }
        .magnetic-btn:hover .shine-sweep {
          transform: translateX(100%) !important;
        }
        .magnetic-btn:focus-visible {
          outline: 2px solid var(--accent-primary);
          outline-offset: 3px;
        }
      `}</style>
    </motion.div>
  );
}
