interface CountUpProps {
  value: string
  label: string
}

const CountUp = ({ value, label }: CountUpProps) => (
  <div className="portfolio-stat">
    <strong>{value}</strong>
    <span>{label}</span>
  </div>
)

export default CountUp