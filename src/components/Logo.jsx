import { Link } from 'react-router-dom'

export default function Logo({ className = '', variant = 'header' }) {
  const isFooter = variant === 'footer' || variant === 'dark'
  const src = isFooter ? '/footerlogo.png' : '/mainlogo.png'

  return (
    <Link
      to="/"
      className={`inline-flex items-center overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red ${className}`}
      aria-label="MY CAR RENTAL — Home"
    >
      <img
        src={src}
        alt="MY CAR RENTAL — Drive in complete safety"
        className={
          isFooter
            ? 'h-16 w-auto max-w-[260px] object-contain object-left sm:h-[72px]'
            : 'h-14 w-auto max-w-[240px] object-contain object-left sm:h-16'
        }
        width={280}
        height={72}
      />
    </Link>
  )
}
