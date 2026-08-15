import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import KnowioLogo from '../components/KnowioLogo'
import GlassCard from '../components/GlassCard'
import Button from '../components/Button'
import { login } from '../services/api'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Enter both email and password to continue.')
      return
    }
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError('Could not log in. Please check your details and try again.')
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
          <h1 className="text-2xl font-display font-semibold mb-1">Welcome back</h1>
          <p className="text-sm text-mist mb-6">Log in to see your Knowledge Mirror.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="••••••••"
                className="w-full rounded-xl2 bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-mist/50 focus:outline-none focus:border-reflect-indigo transition-colors"
              />
            </div>

            {error && <p className="text-glow-rose text-sm">{error}</p>}

            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? 'Logging in…' : 'Log In'}
            </Button>
          </form>

          <p className="text-sm text-mist text-center mt-6">
            New here?{' '}
            <Link to="/register" className="text-white font-medium hover:underline">
              Create an account
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  )
}
