/**
 * KnowioLogo
 * The signature mark: two mirrored triangles meeting at a seam, evoking
 * "reflection" — a student's real understanding facing their assumed one.
 * Rendered as inline SVG so it stays crisp at any size and needs no assets.
 */
export default function KnowioLogo({ size = 32, withWordmark = true, className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mirrorGradTop" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#4F6BFF" />
            <stop offset="100%" stopColor="#6C63FF" />
          </linearGradient>
          <linearGradient id="mirrorGradBottom" x1="0" y1="40" x2="40" y2="0">
            <stop offset="0%" stopColor="#9B5DE5" />
            <stop offset="100%" stopColor="#6C63FF" />
          </linearGradient>
        </defs>
        <path d="M20 3 L36 20 L20 20 Z" fill="url(#mirrorGradTop)" />
        <path d="M20 37 L4 20 L20 20 Z" fill="url(#mirrorGradBottom)" />
        <line x1="2" y1="20" x2="38" y2="20" stroke="white" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 3" />
      </svg>
      {withWordmark && (
        <span className="font-display font-semibold text-lg text-white tracking-tight">
          Know<span className="text-transparent bg-clip-text bg-mirror-line">io</span>
        </span>
      )}
    </div>
  )
}
