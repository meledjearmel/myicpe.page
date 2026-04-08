import { ref } from 'vue'
import { appEnv } from '@/config/env.js'

const STORAGE_KEY = 'myicpe-theme-mode'

/** État partagé : synchronisé avec `data-theme` sur `<html>`. */
export const themeIsDark = ref(false)

function apply() {
  const name = themeIsDark.value ? appEnv.themeDark : appEnv.themeLight
  const root = document.documentElement
  root.setAttribute('data-theme', name)
  root.classList.toggle('dark', themeIsDark.value)
  localStorage.setItem(STORAGE_KEY, themeIsDark.value ? 'dark' : 'light')
}

/** À appeler une fois au démarrage de l’app (avant le premier rendu si possible). */
export function initDocumentTheme() {
  if (typeof window === 'undefined') return
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark') themeIsDark.value = true
  else if (stored === 'light') themeIsDark.value = false
  else themeIsDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  apply()
}

function toggleAndApply() {
  themeIsDark.value = !themeIsDark.value
  apply()
}

/**
 * Bascule le thème. Avec support navigateur, anime un cercle depuis l’élément
 * d’origine (pattern View Transitions + clip-path, voir Grafikart).
 *
 * @param {MouseEvent | HTMLElement | undefined} origin - Clic ou bouton pour le centre du cercle
 */
export function toggleDocumentTheme(origin) {
  const el =
    origin instanceof HTMLElement
      ? origin
      : origin?.currentTarget instanceof HTMLElement
        ? origin.currentTarget
        : undefined

  if (
    !el ||
    typeof document.startViewTransition !== 'function' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    toggleAndApply()
    return
  }

  const { top, left, width, height } = el.getBoundingClientRect()
  const x = left + width / 2
  const y = top + height / 2
  const right = window.innerWidth - x
  const bottom = window.innerHeight - y
  const radius = Math.hypot(Math.max(x, right), Math.max(y, bottom))

  const transition = document.startViewTransition(() => {
    toggleAndApply()
  })

  void transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${radius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 1500,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  })
}
