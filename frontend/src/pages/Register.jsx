import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import KnowioLogo from '../components/KnowioLogo'
import GlassCard from '../components/GlassCard'
import Button from '../components/Button'
import { register } from '../services/api'

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name || !email || !password) {
      setError('Fill in every field to create your account.')
      return
    }
    setLoading(true)
    try {
      await register(name, email, password)
      navigate('/dashboard')
    } catch (err) {
      setError('Something went wrong creating your account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ink-900 bg-aurora flex items-center justify-center px-6 py-12 text-white">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <KnowioLogo size={30} />
        </div>

        <GlassCard strong className="p-8">
          <h1 className="text-2xl font-display font-semibold mb-1">Create your account</h1>
          <p className="text-sm text-mist mb-6">Your first Knowledge Mirror is a few minutes away.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs uppercase tracking-wide text-mist mb-1.5">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ashmi Rao"
                className="w-full rounded-xl2 bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-mist/50 focus:outline-none focus:border-reflect-indigo transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-wide text-mist mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@college.edu"
                className="w-full rounded-xl2 bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-mist/50 focus:outline-none focus:border-reflect-indigo transition-colors"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs uppercase tracking-wide text-mist mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full rounded-xl2 bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-mist/50 focus:outline-none focus:border-reflect-indigo transition-colors"
              />
            </div>

            {error && <p className="text-glow-rose text-sm">{error}</p>}

            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? 'Creating account…' : 'Get Started'}
            </Button>
          </form>

          <p className="text-sm text-mist text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-white font-medium hover:underline">
              Log in
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  )
}
