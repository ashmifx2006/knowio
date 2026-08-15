import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import AppShell from '../components/AppShell'
import GlassCard from '../components/GlassCard'
import ProgressBar from '../components/ProgressBar'
import Button from '../components/Button'
import { getStudentOverview } from '../services/api'

export default function Dashboard() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)

  useEffect(() => {
    getStudentOverview().then(setData)
  }, [])

  if (!data) {
    return (
      <AppShell>
        <p className="text-mist">Loading your dashboard…</p>
      </AppShell>
    )
  }

  const { student, recentAssessments } = data

  return (
    <AppShell>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-semibold">Welcome back, {student.name.split(' ')[0]}</h1>
            <p className="text-mist mt-1">Here's where your understanding stands today.</p>
          </div>
          <Button onClick={() => navigate('/subjects')}>Start a Diagnostic</Button>
        </div>

        {/* Top stat cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <GlassCard hover className="p-6">
            <p className="text-xs uppercase tracking-wide text-mist mb-3">Today's Progress</p>
            <ProgressBar value={student.todayProgressPercent} showValue={false} />
            <p className="text-2xl font-display font-semibold mt-3">{student.todayProgressPercent}%</p>
          </GlassCard>

          <GlassCard hover className="p-6">
            <p className="text-xs uppercase tracking-wide text-mist mb-3">Topics Learned</p>
            <p className="text-4xl font-display font-semibold">{student.topicsLearned}</p>
            <p className="text-sm text-mist mt-2">across 6 subjects</p>
          </GlassCard>

          <GlassCard hover className="p-6">
            <p className="text-xs uppercase tracking-wide text-mist mb-3">Current Streak</p>
            <p className="text-4xl font-display font-semibold">{student.streakDays} <span className="text-lg text-mist">days</span></p>
            <p className="text-sm text-mist mt-2">Keep the mirror sharp 🔥</p>
          </GlassCard>

          <GlassCard hover className="p-6">
            <p className="text-xs uppercase tracking-wide text-mist mb-3">Weak Areas</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {student.weakAreas.map((w) => (
                <span key={w} className="text-xs px-2.5 py-1 rounded-full bg-glow-rose/15 text-glow-rose border border-glow-rose/30">
                  {w}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Recent assessments */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-lg">Recent Assessments</h2>
            <button onClick={() => navigate('/progress')} className="text-sm text-reflect-blue hover:underline">
              View all
            </button>
          </div>
          <div className="divide-y divide-white/5">
            {recentAssessments.map((a) => (
              <div key={a.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-sm">{a.topic}</p>
                  <p className="text-xs text-mist">{a.subject} · {a.date}</p>
                </div>
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    a.score >= 60 ? 'bg-glow-green/15 text-glow-green' : 'bg-glow-rose/15 text-glow-rose'
                  }`}
                >
                  {a.score}%
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </AppShell>
  )
}
