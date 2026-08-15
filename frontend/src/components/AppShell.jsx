import Navbar from './Navbar'

/**
 * AppShell
 * Wraps every authenticated page with the shared aurora background and
 * top navigation, so individual pages only worry about their content.
 */
export default function AppShell({ children, showNav = true }) {
  return (
    <div className="min-h-screen bg-ink-900 bg-aurora text-white">
      {showNav && <Navbar />}
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
