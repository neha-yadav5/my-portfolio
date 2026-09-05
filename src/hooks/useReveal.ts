import { useEffect } from 'react'

/**
 * Adds `.is-visible` to every `.reveal` element as it scrolls into view.
 * Re-runs whenever `key` changes, since switching editions replaces the DOM.
 */
export function useReveal(key?: string) {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal:not(.is-visible)')

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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    )

    nodes.forEach(n => observer.observe(n))
    return () => observer.disconnect()
  }, [key])
}
