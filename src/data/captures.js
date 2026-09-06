const modules = import.meta.glob('../assets/images/captures/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

const SCREEN_LABELS = {
  1: 'Tableau de bord',
  2: 'Entreprises',
  3: 'Inspections',
  4: 'Pollutions',
  5: 'Redevances',
}

/**
 * Convention de nommage attendue : `{light|dark}_{n}.ext` ou `{light|dark}_{n}_action.ext`,
 * `n` correspondant à l'ordre dans SCREEN_LABELS. Les fichiers qui ne suivent pas ce format
 * sont quand même affichés (repli sur le nom de fichier comme légende), triés en dernier.
 */
function parseName(filename) {
  const match = /^(light|dark)_(\d+)(_action)?\./.exec(filename)
  if (!match) return null
  return { theme: match[1], index: Number(match[2]), isAction: Boolean(match[3]) }
}

/** @type {{ src: string; name: string; alt: string }[]} */
export const captureScreenshots = Object.entries(modules)
  .map(([path, url]) => {
    const filename = path.split('/').pop() ?? 'capture'
    const parsed = parseName(filename)

    if (!parsed) {
      return { src: url, name: filename, alt: `Capture MyICPE — ${filename}`, sortKey: [9, 0, 0] }
    }

    const screen = SCREEN_LABELS[parsed.index] ?? 'MyICPE'
    const theme = parsed.theme === 'dark' ? 'sombre' : 'clair'
    const alt = parsed.isAction
      ? `${screen} — actions rapides (thème ${theme})`
      : `${screen} (thème ${theme})`

    return {
      src: url,
      name: filename,
      alt,
      sortKey: [parsed.theme === 'light' ? 0 : 1, parsed.index, parsed.isAction ? 1 : 0],
    }
  })
  .sort((a, b) => {
    for (let i = 0; i < a.sortKey.length; i++) {
      if (a.sortKey[i] !== b.sortKey[i]) return a.sortKey[i] - b.sortKey[i]
    }
    return a.name.localeCompare(b.name)
  })
  .map(({ src, name, alt }) => ({ src, name, alt }))
