'use client';

import { motion } from 'framer-motion';
import { motionTokens } from '@/lib/animation/tokens';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface StatementRevealProps {
  children: React.ReactNode;
  visible: boolean;
  className?: string;
  delay?: number;
}

export function StatementReveal({
  children,
  visible,
  className = '',
  delay = 0,
}: StatementRevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : reducedMotion ? 0 : 24,
      }}
      transition={{
        duration: reducedMotion ? 0 : motionTokens.duration.medium,
        delay: reducedMotion ? 0 : delay,
        ease: motionTokens.ease.enter,
      }}
      aria-hidden={!visible}
    >
      {children}
    </motion.p>
  );
}
