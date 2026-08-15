import { motion } from 'framer-motion'

/**
 * ProgressBar
 * A labeled, animated progress bar. Color shifts by score band so a
 * glance communicates strength vs. weakness (used heavily in the
 * Knowledge Mirror Dashboard).
 */
export default function ProgressBar({ label, value = 0, showValue = true, height = 'h-2.5' }) {
  const colorForValue = (v) => {
    if (v >= 70) return 'from-glow-green to-emerald-400'
    if (v >= 45) return 'from-reflect-indigo to-reflect-violet'
    return 'from-glow-rose to-orange-400'
  }

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm text-mist font-medium">{label}</span>
          {showValue && <span className="text-sm text-white font-semibold">{value}%</span>}
        </div>
      )}
      <div className={`w-full ${height} rounded-full bg-white/8 overflow-hidden`}>
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${colorForValue(value)}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
