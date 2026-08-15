import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import AppShell from '../components/AppShell'
import GlassCard from '../components/GlassCard'
import Button from '../components/Button'
import { getLearningPath } from '../services/api'

export default function LearningPath() {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const [path, setPath] = useState([])

  useEffect(() => {
    getLearningPath(topicId).then(setPath)
  }, [topicId])

  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-semibold">Your Personalized Learning Path</h1>
        <p className="text-mist mt-1">Built from your gaps — not a generic chapter list.</p>
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Connecting line down the timeline */}
        <div className="absolute left-5 top-2 bottom-2 w-px bg-white/10" />

        <div className="space-y-5">
          {path.map((item, i) => (
            <motion.div
              key={item.day}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-14"
            >
              <div
                className={`absolute left-0 top-3 w-10 h-10 rounded-full flex items-center justify-center font-display font-semibold text-sm ${
                  item.done ? 'bg-glow-green/20 text-glow-green border border-glow-green/40' : 'bg-mirror-line text-white'
                }`}
              >
                {item.done ? '✓' : `D${item.day}`}
              </div>

              <GlassCard hover className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs uppercase tracking-wide text-mist">Day {item.day}</p>
                  <span className="text-xs text-mist">{item.minutes} min</span>
                </div>
                <h3 className="font-display font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-mist">{item.focus}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Button onClick={() => navigate('/progress')}>Track My Progress</Button>
      </div>
    </AppShell>
  )
}
