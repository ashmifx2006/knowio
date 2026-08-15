import { useEffect, useState } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import AppShell from '../components/AppShell'
import GlassCard from '../components/GlassCard'
import { getProgressCharts } from '../services/api'

const tooltipStyle = {
  background: 'rgba(17, 24, 50, 0.95)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12,
  color: '#E7EAF6',
  fontSize: 13,
}

export default function ProgressDashboard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    getProgressCharts().then(setData)
  }, [])

  if (!data) {
    return (
      <AppShell>
        <p className="text-mist">Loading your progress…</p>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-semibold">Progress Dashboard</h1>
        <p className="text-mist mt-1">How your understanding is actually trending over time.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <GlassCard className="p-6">
          <h2 className="font-display font-semibold mb-4">Learning Growth</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data.growthSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="week" stroke="#8A93B8" fontSize={12} />
              <YAxis stroke="#8A93B8" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#8A93B8' }} />
              <Line type="monotone" dataKey="understanding" stroke="#6C63FF" strokeWidth={2.5} dot={false} name="Understanding" />
              <Line type="monotone" dataKey="application" stroke="#9B5DE5" strokeWidth={2.5} dot={false} name="Application" />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="font-display font-semibold mb-4">Weekly Improvement</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.weeklyImprovement}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="week" stroke="#8A93B8" fontSize={12} />
              <YAxis stroke="#8A93B8" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="gapClosed" fill="#4F6BFF" radius={[6, 6, 0, 0]} name="Gaps Closed (%)" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h2 className="font-display font-semibold mb-4">Knowledge Gap Reduction by Subject</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data.gapReduction}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="subject" stroke="#8A93B8" fontSize={12} />
            <YAxis stroke="#8A93B8" fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12, color: '#8A93B8' }} />
            <Bar dataKey="before" fill="#FB7185" radius={[6, 6, 0, 0]} name="Gap Before" />
            <Bar dataKey="after" fill="#34D399" radius={[6, 6, 0, 0]} name="Gap After" />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
    </AppShell>
  )
}
