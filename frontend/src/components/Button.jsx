import { motion } from 'framer-motion'

/**
 * Button
 * variant: 'primary' (gradient fill) | 'ghost' (glass outline) | 'subtle'
 */
export default function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...rest
}) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full font-display font-medium px-6 py-3 text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-reflect-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900'

  const variants = {
    primary: 'bg-mirror-line text-white shadow-glow hover:brightness-110',
    ghost: 'glass text-white hover:bg-white/10',
    subtle: 'bg-white/5 text-mist hover:text-white hover:bg-white/10',
  }

  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.96 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
