interface BlurTextProps {
  children: string
}

const BlurText = ({ children }: BlurTextProps) => (
  <span className="portfolio-blur-text">{children}</span>
)

export default BlurText