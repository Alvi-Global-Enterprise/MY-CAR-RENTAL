import { useEffect } from 'react'

export function usePageTitle(title, description) {
  useEffect(() => {
    document.title = title
      ? `${title} | MY CAR RENTAL`
      : 'MY CAR RENTAL | Car Rental in Cap-Haitian'

    if (description) {
      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = description
    }
  }, [title, description])
}
