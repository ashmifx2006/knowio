import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import KnowioLogo from '../components/KnowioLogo'
import GlassCard from '../components/GlassCard'
import Button from '../components/Button'

const features = [
  {
    icon: '🪞',
    title: 'Knowledge Mirror',
    desc: 'See your real understanding reflected back — not just a score, but where it breaks down.',
  },
  {
    icon: '🧩',
    title: 'Adaptive Diagnosis',
    desc: 'Questions get harder as you answer well, surfacing the exact depth where a gap begins.',
  },
  {
    icon: '🔍',
    title: 'Misconception Detection',
    desc: 'Finds wrong mental models, not just wrong answers — the difference that actually matters.',
  },
  {
    icon: '🗺️',
    title: 'Personalized Path',
    desc: 'A day-by-day plan built from your gaps, never a generic "re-read chapter 3."',
  },
]

const steps = [
  'Choose a topic',
  'Answer adaptive questions',
  'Get your Knowledge Mirror',
  'Follow your learning path',
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-ink-900 bg-aurora text-white overflow-x-hidden">
      {/* Top bar */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <KnowioLogo size={30} />
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/login')} className="text-sm text-mist hover:text-white transition-colors">
            Log in
          </button>
          <Button variant="ghost" className="!px-5 !py-2 text-sm" onClick={() => navigate('/register')}>
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-14 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-mist mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-glow-green" />
          Diagnostic AI, not a chatbot
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-semibold leading-[1.05] tracking-tight"
        >
          See your understanding.
          <br />
          <span className="text-transparent bg-clip-text bg-mirror-line">Not just your answers.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-mist max-w-2xl mx-auto"
        >
          "Don't study more. Study what you don't know."
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Button onClick={() => navigate('/register')}>Get Started — it's free</Button>
          <Button variant="ghost" onClick={() => navigate('/login')}>I already have an account</Button>
        </motion.div>

        {/* Signature visual: reflection panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 relative"
        >
          <GlassCard strong className="p-8 md:p-10 mx-auto max-w-3xl">
            <div className="grid grid-cols-2 gap-8 text-left">
              <div>
                <p className="text-xs uppercase tracking-widest text-mist mb-3">What you think you know</p>
                <div className="space-y-3">
                  {['Definitions', 'Syntax', 'Concepts'].map((t) => (
                    <div key={t} className="h-2.5 rounded-full bg-gradient-to-r from-reflect-indigo to-reflect-violet" style={{ width: `${85 - t.length}%` }} />
                  ))}
                </div>
              </div>
              <div className="border-l border-white/10 pl-8">
                <p className="text-xs uppercase tracking-widest text-mist mb-3">What the mirror finds</p>
                <div className="space-y-3">
                  {[42, 30, 55].map((v, i) => (
                    <div key={i} className="h-2.5 rounded-full bg-gradient-to-r from-glow-rose to-orange-400" style={{ width: `${v}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </section>

      {/* Problem statement */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">
          Videos feel like understanding. Exams prove otherwise.
        </h2>
        <p className="text-mist text-base md:text-lg leading-relaxed">
          Students often believe they've understood a topic after watching a video or reading notes —
          until a viva, exam, or presentation exposes the gaps that were hiding the whole time.
          Tools like ChatGPT will answer any question you ask. Knowio asks <em>you</em>
          questions instead, to find the gaps you didn't know to ask about.
        </p>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <GlassCard hover className="p-6 h-full">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-mist leading-relaxed">{f.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-center mb-10">How it works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div key={s} className="relative">
              <GlassCard className="p-5">
                <p className="text-xs text-reflect-blue font-display font-semibold mb-2">Step {i + 1}</p>
                <p className="text-sm font-medium">{s}</p>
              </GlassCard>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-white/20" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <GlassCard strong className="p-10">
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-3">
            Find out what you actually know.
          </h2>
          <p className="text-mist mb-6">Free diagnostic. No chatbot. Just a mirror.</p>
          <Button onClick={() => navigate('/register')}>Get Started</Button>
        </GlassCard>
      </section>

      <footer className="text-center text-xs text-mist/60 pb-10">
        Knowio — a diagnostic learning prototype
      </footer>
    </div>
  )
}
