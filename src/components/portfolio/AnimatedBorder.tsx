import type { ReactNode } from 'react'

interface AnimatedBorderProps {
  children: ReactNode
}

const AnimatedBorder = ({ children }: AnimatedBorderProps) => (
  <div className="portfolio-border">
    <div>{children}</div>
  </div>
)

export default AnimatedBorder