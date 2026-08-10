import * as Lucide from 'lucide-react'

export default function ServiceIcon({ name, size = 24, className = '', ...props }) {
  const IconComponent = Lucide[name] || Lucide.HelpCircle
  return <IconComponent size={size} className={className} {...props} />
}
