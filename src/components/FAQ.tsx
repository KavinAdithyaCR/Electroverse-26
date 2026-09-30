import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqItems } from '../data/config';
import SectionReveal from './SectionReveal';
import { ChevronDown, HelpCircle } from 'lucide-react';

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        background: isOpen
          ? 'rgba(10, 15, 35, 0.85)'
          : 'rgba(10, 15, 30, 0.5)',
        border: `1px solid ${isOpen ? '#00f0ff' : 'rgba(0, 240, 255, 0.14)'}`,
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.35s var(--ease-expo)',
        boxShadow: isOpen ? '0 0 20px rgba(0, 240, 255, 0.2)' : 'none',
      }}
    >
      <button
        onClick={onToggle}
        className="interactive"
        aria-expanded={isOpen}
        style={{
          width: '100%',
          padding: '1.25rem 1.6rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          background: 'transparent',
          border: 'none',
          cursor: 'none',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 'clamp(0.88rem, 1.5vw, 1rem)',
            fontWeight: isOpen ? 700 : 600,
            color: isOpen ? '#00f0ff' : 'var(--text-primary)',
            transition: 'color 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <HelpCircle size={16} color={isOpen ? '#00f0ff' : 'var(--text-tertiary)'} />
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ flexShrink: 0, color: isOpen ? '#00f0ff' : 'var(--text-tertiary)' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                padding: '0 1.6rem 1.4rem 2.8rem',
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.85,
              }}
            >
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      style={{
        padding: 'var(--section-padding) 0',
        position: 'relative',
      }}
    >
      <div className="container">
        <SectionReveal>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#00f0ff',
              textAlign: 'center',
              marginBottom: '0.6rem',
            }}
          >
            // FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="section-title text-center" style={{ textAlign: 'center' }}>
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto 3rem', textAlign: 'center' }}>
            Got questions about registration, scheduling, or event rules? Find instant answers below.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div
            style={{
              maxWidth: '800px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            {faqItems.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
              />
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
