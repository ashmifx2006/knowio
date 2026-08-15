import { NavLink, useNavigate } from 'react-router-dom'
import KnowioLogo from './KnowioLogo'
import { currentStudent } from '../services/mockData'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/subjects', label: 'Subjects' },
  { to: '/progress', label: 'Progress' },
  { to: '/profile', label: 'Profile' },
]

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <button onClick={() => navigate('/dashboard')} className="focus:outline-none">
          <KnowioLogo size={28} />
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive ? 'bg-white/10 text-white' : 'text-mist hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => navigate('/profile')}
          className="w-9 h-9 rounded-full bg-mirror-line flex items-center justify-center text-xs font-display font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-reflect-indigo"
          aria-label="Open profile"
        >
          {currentStudent.avatarInitials}
        </button>
      </div>
    </header>
  )
}
