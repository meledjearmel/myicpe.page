/**
 * Rendu markdown minimal pour les notes de version publiées sur AppStation (source contrôlée en interne,
 * jamais de contenu utilisateur tiers). Supporte titres (#, ##, ###), gras (**texte**), listes à puces
 * (- item), règles horizontales (---) et une ligne isolée en italique (*texte*). Tout le texte est
 * échappé avant transformation, donc ** ne peut pas injecter de balises.
 */

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function inline(str) {
  return escapeHtml(str).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}

export function renderReleaseNotes(markdown) {
  const lines = (markdown ?? '').replace(/\r\n/g, '\n').split('\n')
  const html = []
  let listBuffer = null
  let skippedTitle = false

  function flushList() {
    if (listBuffer) {
      html.push(`<ul class="list-disc space-y-1 pl-5">${listBuffer.join('')}</ul>`)
      listBuffer = null
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (line === '') {
      flushList()
      continue
    }

    if (line === '---') {
      flushList()
      html.push('<hr class="border-base-300 my-4" />')
      continue
    }

    if (line.startsWith('# ')) {
      flushList()
      // Le premier titre reprend le nom/version déjà affichés dans l'en-tête de section.
      if (!skippedTitle) {
        skippedTitle = true
        continue
      }
      html.push(`<h2 class="mt-6 mb-2 text-lg font-bold">${inline(line.slice(2))}</h2>`)
      continue
    }

    if (line.startsWith('## ')) {
      flushList()
      html.push(`<h3 class="mt-6 mb-1 text-base font-bold">${inline(line.slice(3))}</h3>`)
      continue
    }

    if (line.startsWith('### ')) {
      flushList()
      html.push(`<h4 class="mt-4 mb-1 font-semibold">${inline(line.slice(4))}</h4>`)
      continue
    }

    if (line.startsWith('- ')) {
      listBuffer ??= []
      listBuffer.push(`<li>${inline(line.slice(2))}</li>`)
      continue
    }

    if (/^\*[^*].*[^*]\*$/.test(line)) {
      flushList()
      html.push(`<p class="text-base-content/60 mt-4 text-sm italic">${inline(line.slice(1, -1))}</p>`)
      continue
    }

    flushList()
    html.push(`<p class="text-base-content/80 mb-2 text-sm leading-relaxed">${inline(line)}</p>`)
  }

  flushList()
  return html.join('\n')
}
