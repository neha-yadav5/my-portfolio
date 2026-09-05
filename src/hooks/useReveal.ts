import { useEffect } from 'react'

/**
 * Adds `.is-visible` to every `.reveal` element as it scrolls into view.
 * One observer for the whole page rather than one per component.
 */
export function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal')

    if (!('IntersectionObserver' in window)) {
      nodes.forEach(n => n.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )

    nodes.forEach(n => observer.observe(n))
    return () => observer.disconnect()
  }, [])
}
