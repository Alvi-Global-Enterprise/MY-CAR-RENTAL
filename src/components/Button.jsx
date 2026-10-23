import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const variants = {
  primary:
    'bg-red text-white hover:bg-red-dark shadow-md shadow-red/25 border border-transparent hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red/30',
  secondary:
    'bg-white text-navy border-2 border-navy hover:bg-navy hover:text-white hover:-translate-y-0.5',
  outline:
    'bg-transparent text-red border border-red hover:bg-red hover:text-white hover:-translate-y-0.5',
  ghost: 'bg-transparent text-navy hover:text-red',
  white: 'bg-white text-navy hover:bg-light border border-transparent hover:-translate-y-0.5',
}

export default function Button({
  children,
  variant = 'primary',
  to,
  href,
  type = 'button',
  className = '',
  showArrow = false,
  onClick,
  disabled,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 ${variants[variant]} ${className}`

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" aria-hidden="true" />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={`group/btn ${classes}`} onClick={onClick} {...props}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={`group/btn ${classes}`} onClick={onClick} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={`group/btn ${classes}`} onClick={onClick} disabled={disabled} {...props}>
      {content}
    </button>
  )
}
