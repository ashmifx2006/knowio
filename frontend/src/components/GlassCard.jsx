import { motion } from 'framer-motion'

/**
 * GlassCard
 * Reusable frosted-glass surface used across the app for consistent
 * "mirror" styling — rounded, translucent, subtle border and shadow.
 *
 * Props:
 *  - strong: uses a slightly more opaque glass variant
 *  - hover: enables a lift-on-hover micro-interaction
 *  - as: element/animation wrapper (defaults to motion.div)
 */
export default function GlassCard({
  children,
  className = '',
  strong = false,
  hover = false,
  ...rest
}) {
  return (
    <motion.div
      className={`${strong ? 'glass-strong' : 'glass'} rounded-xl2 shadow-glass ${className}`}
      whileHover={hover ? { y: -4, boxShadow: '0 12px 40px rgba(108,99,255,0.25)' } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
