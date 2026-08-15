import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AppShell from '../components/AppShell'
import GlassCard from '../components/GlassCard'
import ProgressBar from '../components/ProgressBar'
import Button from '../components/Button'
import { getTopics, getSubjects } from '../services/api'

export default function TopicSelection() {
  const { subjectId } = useParams()
  const navigate = useNavigate()
  const [topics, setTopics] = useState([])
  const [subjectName, setSubjectName] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    getTopics(subjectId).then(setTopics)
    getSubjects().then((subs) => {
      const match = subs.find((s) => s.id === subjectId)
      setSubjectName(match ? match.name : subjectId)
    })
  }, [subjectId])

  return (
    <AppShell>
      <div className="mb-6">
        <Link to="/subjects" className="text-sm text-mist hover:text-white transition-colors">
          ← Back to subjects
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-display font-semibold">{subjectName}</h1>
        <p className="text-mist mt-1">Select a topic to start your diagnostic.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {topics.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
          >
            <GlassCard
              hover
              className={`p-5 cursor-pointer ${selected === t.id ? 'ring-2 ring-reflect-indigo' : ''}`}
              onClick={() => setSelected(t.id)}
              role="button"
              tabIndex={0}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">{t.name}</h3>
                {t.mastery < 45 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-glow-rose/15 text-glow-rose">gap likely</span>
                )}
              </div>
              <ProgressBar value={t.mastery} showValue />
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          disabled={!selected}
          onClick={() => navigate(`/assessment/${selected}`)}
        >
          Start Diagnostic
        </Button>
      </div>
    </AppShell>
  )
}
