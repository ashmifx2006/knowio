import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import KnowioLogo from '../components/KnowioLogo'

const steps = [
  'Reading your answers…',
  'Comparing against expected reasoning patterns…',
  'Detecting misconceptions…',
  'Mapping missing prerequisites…',
  'Building your Knowledge Mirror…',
]

export default function AIAnalysisLoading() {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, steps.length - 1))
    }, 900)

    const redirect = setTimeout(() => {
      navigate(`/knowledge-mirror/${topicId}`)
    }, steps.length * 900 + 500)

    return () => {
      clearInterval(interval)
      clearTimeout(redirect)
    }
  }, [navigate, topicId])

  return (
    <div className="min-h-screen bg-ink-900 bg-aurora flex flex-col items-center justify-center text-white px-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className="mb-8"
      >
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-reflect-blue border-r-reflect-violet animate-spin" style={{ animationDuration: '1.4s' }} />
          <KnowioLogo size={36} withWordmark={false} />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-display font-semibold mb-2 text-center"
      >
        Analyzing your understanding…
      </motion.h1>
      <p className="text-mist mb-10 text-center max-w-md">
        The mirror doesn't grade you — it maps where your reasoning holds and where it slips.
      </p>

      <div className="space-y-3 w-full max-w-sm">
        {steps.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: i <= stepIndex ? 1 : 0.25 }}
            className="flex items-center gap-3 text-sm"
          >
            <span
              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                i < stepIndex ? 'bg-glow-green' : i === stepIndex ? 'bg-reflect-blue animate-pulse' : 'bg-white/20'
              }`}
            />
            <span className={i <= stepIndex ? 'text-white' : 'text-mist'}>{s}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
