import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import AppShell from '../components/AppShell'
import GlassCard from '../components/GlassCard'
import ProgressBar from '../components/ProgressBar'
import { getProfile } from '../services/api'

export default function Profile() {
  const [data, setData] = useState(null)

  useEffect(() => {
    getProfile().then(setData)
  }, [])

  if (!data) {
    return (
      <AppShell>
        <p className="text-mist">Loading profile…</p>
      </AppShell>
    )
  }

  const { student, achievements, completedTopics } = data

  return (
    <AppShell>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-mirror-line flex items-center justify-center font-display font-semibold text-xl">
          {student.avatarInitials}
        </div>
        <div>
          <h1 className="text-2xl font-display font-semibold">{student.name}</h1>
          <p className="text-mist text-sm">🔥 {student.streakDays}-day streak · {student.topicsLearned} topics learned</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <GlassCard className="p-6">
          <h2 className="font-display font-semibold text-lg mb-5">Achievements</h2>
          <div className="space-y-4">
            {achievements.map((a) => (
              <div key={a.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    a.earned ? 'bg-glow-green/20 text-glow-green' : 'bg-white/8 text-mist'
                  }`}>
                    {a.earned ? '★' : '○'}
                  </span>
                  <span className={`text-sm ${a.earned ? 'text-white' : 'text-mist'}`}>{a.label}</span>
                </div>
                {!a.earned && a.target && (
                  <span className="text-xs text-mist">{a.progress}/{a.target}</span>
                )}
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="font-display font-semibold text-lg mb-5">Completed Topics</h2>
          <div className="flex flex-wrap gap-2">
            {completedTopics.map((t) => (
              <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-white/8 text-white/90">
                {t}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h2 className="font-display font-semibold text-lg mb-5">Learning History</h2>
        <ProgressBar label="Overall mastery across subjects" value={64} />
      </GlassCard>
    </AppShell>
  )
}
