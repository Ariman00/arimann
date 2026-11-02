import type { ReactNode } from 'react'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
}

const SpotlightCard = ({ children, className = '' }: SpotlightCardProps) => (
  <article
    className={`portfolio-spotlight ${className}`}
    onPointerMove={(event) => {
      const bounds = event.currentTarget.getBoundingClientRect()
      event.currentTarget.style.setProperty(
        '--spot-x',
        `${event.clientX - bounds.left}px`
      )
      event.currentTarget.style.setProperty(
        '--spot-y',
        `${event.clientY - bounds.top}px`
      )
    }}
  >
    {children}
  </article>
)

export default SpotlightCard