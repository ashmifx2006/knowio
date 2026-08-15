import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import AppShell from '../components/AppShell'
import GlassCard from '../components/GlassCard'
import ProgressBar from '../components/ProgressBar'
import Button from '../components/Button'
import { getKnowledgeMirror } from '../services/api'

export default function KnowledgeMirrorDashboard() {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const [report, setReport] = useState(null)

  useEffect(() => {
    getKnowledgeMirror(topicId).then(setReport)
  }, [topicId])

  if (!report) {
    return (
      <AppShell>
        <p className="text-mist">Loading your Knowledge Mirror…</p>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="mb-8 text-center">
        <p className="text-xs uppercase tracking-widest text-mist mb-2">Your Knowledge Mirror</p>
        <h1 className="text-3xl font-display font-semibold">{report.topic}</h1>
        <p className="text-mist mt-1">{report.subject}</p>
      </div>

      {/* Dimension radar-style bars — the signature reflection panel */}
      <GlassCard strong className="p-8 mb-8">
        <h2 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
          <span>🪞</span> Understanding, reflected
        </h2>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
          {report.dimensions.map((d, i) => (
            <motion.div
              key={d.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <ProgressBar label={d.label} value={d.score} />
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Strength / Weakness split — literal mirror seam */}
      <div className="grid md:grid-cols-2 gap-5 mb-8">
        <GlassCard className="p-6 border-l-4 !border-l-glow-green">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2 text-glow-green">
            ✓ Strengths
          </h3>
          <ul className="space-y-2">
            {report.strengths.map((s) => (
              <li key={s} className="text-sm text-white/90 flex items-center gap-2">
                <span className="text-glow-green">✓</span> {s}
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-6 border-l-4 !border-l-glow-rose">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2 text-glow-rose">
            ✗ Weaknesses
          </h3>
          <ul className="space-y-2">
            {report.weaknesses.map((w) => (
              <li key={w} className="text-sm text-white/90 flex items-center gap-2">
                <span className="text-glow-rose">✗</span> {w}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-8">
        <GlassCard className="p-6">
          <h3 className="font-display font-semibold mb-4 text-glow-amber">Misconceptions Found</h3>
          <ul className="space-y-2">
            {report.misconceptions.map((m) => (
              <li key={m} className="text-sm text-white/90 flex gap-2">
                <span className="text-glow-amber">⚠</span> {m}
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="font-display font-semibold mb-4 text-reflect-blue">Missing Prerequisites</h3>
          <ul className="space-y-2">
            {report.missingPrerequisites.map((p) => (
              <li key={p} className="text-sm text-white/90 flex gap-2">
                <span className="text-glow-rose">✗</span> {p}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <div className="flex justify-center">
        <Button onClick={() => navigate(`/learning-path/${topicId}`)}>See My Learning Path</Button>
      </div>
    </AppShell>
  )
}
