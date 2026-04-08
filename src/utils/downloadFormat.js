/**
 * Formatage pour l’affichage du téléchargement (vitesse, durée, taille).
 */

export function formatBytesPerSecond(bytesPerSecond) {
  if (!Number.isFinite(bytesPerSecond) || bytesPerSecond < 0) return '—'
  const units = ['o/s', 'Ko/s', 'Mo/s', 'Go/s']
  let v = bytesPerSecond
  let i = 0
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024
    i++
  }
  const digits = v >= 100 || i === 0 ? 0 : v >= 10 ? 1 : 2
  return `${v.toFixed(digits)} ${units[i]}`
}

export function formatEtaSeconds(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0 || seconds === Number.POSITIVE_INFINITY) return '—'
  if (seconds < 60) return `${Math.ceil(seconds)} s`
  const m = Math.floor(seconds / 60)
  const s = Math.ceil(seconds % 60)
  if (m < 60) return `${m} min ${s} s`
  const h = Math.floor(m / 60)
  const rm = m % 60
  return `${h} h ${rm} min`
}

export function formatBytes(n) {
  if (!Number.isFinite(n) || n < 0) return '—'
  const units = ['o', 'Ko', 'Mo', 'Go']
  let v = n
  let i = 0
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024
    i++
  }
  const digits = v >= 100 || i === 0 ? 0 : v >= 10 ? 1 : 2
  return `${v.toFixed(digits)} ${units[i]}`
}

/**
 * Extrait un nom de fichier depuis Content-Disposition ou l’URL.
 */
export function guessFilename(response, urlString) {
  const cd = response.headers.get('content-disposition')
  if (cd) {
    const utf8 = /filename\*=(?:UTF-8'')?([^;\n]+)/i.exec(cd)
    if (utf8?.[1]) {
      try {
        return decodeURIComponent(utf8[1].trim().replace(/^["']|["']$/g, ''))
      } catch {
        /* ignore */
      }
    }
    const simple = /filename=(["']?)([^"'\n;]+)\1/i.exec(cd)
    if (simple?.[2]) return simple[2].trim()
  }
  try {
    const path = new URL(urlString).pathname
    const last = path.split('/').filter(Boolean).pop()
    if (last) return decodeURIComponent(last)
  } catch {
    /* ignore */
  }
  return 'téléchargement'
}
