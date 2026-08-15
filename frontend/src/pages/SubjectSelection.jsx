import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import AppShell from '../components/AppShell'
import GlassCard from '../components/GlassCard'
import ProgressBar from '../components/ProgressBar'
import { getSubjects } from '../services/api'

export default function SubjectSelection() {
  const navigate = useNavigate()
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    getSubjects().then(setSubjects)
  }, [])

  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-semibold">Choose a subject</h1>
        <p className="text-mist mt-1">Pick where you want your understanding checked.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {subjects.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <GlassCard
              hover
              className="p-6 cursor-pointer"
              onClick={() => navigate(`/subjects/${s.id}/topics`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/subjects/${s.id}/topics`)}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{s.icon}</span>
                <span className="text-xs text-mist">{s.topicCount} topics</span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-3">{s.name}</h3>
              <ProgressBar label="Mastery" value={s.mastery} />
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </AppShell>
  )
}
