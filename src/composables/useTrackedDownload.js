import { ref, shallowRef, computed } from 'vue'
import { formatBytesPerSecond, guessFilename } from '@/utils/downloadFormat.js'

/**
 * Télécharge une ressource en flux avec suivi de progression (nécessite CORS côté serveur si domaine différent).
 */
export function useTrackedDownload() {
  const status = ref('idle') // idle | loading | done | error | cors
  const loaded = ref(0)
  const total = ref(null)
  const hasKnownSize = ref(false)
  const percent = ref(0)
  const speedBps = ref(0)
  const etaSeconds = ref(null)
  const errorMessage = ref('')
  const blobRef = shallowRef(null)
  const filenameRef = ref('fichier')
  const speedLabel = computed(() => formatBytesPerSecond(speedBps.value))

  let abort = null
  let rafSmooth = null
  let displayPercent = 0

  function smoothPercent(target) {
    if (rafSmooth != null) cancelAnimationFrame(rafSmooth)
    const step = () => {
      const diff = target - displayPercent
      if (Math.abs(diff) < 0.05) {
        displayPercent = target
        percent.value = Math.round(displayPercent * 10) / 10
        rafSmooth = null
        return
      }
      displayPercent += diff * 0.12
      percent.value = Math.round(displayPercent * 10) / 10
      rafSmooth = requestAnimationFrame(step)
    }
    rafSmooth = requestAnimationFrame(step)
  }

  function reset() {
    if (abort) {
      abort.abort()
      abort = null
    }
    if (rafSmooth != null) {
      cancelAnimationFrame(rafSmooth)
      rafSmooth = null
    }
    displayPercent = 0
    status.value = 'idle'
    loaded.value = 0
    total.value = null
    hasKnownSize.value = false
    percent.value = 0
    speedBps.value = 0
    etaSeconds.value = null
    errorMessage.value = ''
    blobRef.value = null
    filenameRef.value = 'fichier'
  }

  /**
   * @param {string} url
   * @param {object} [opts]
   * @param {AbortSignal} [opts.signal]
   */
  async function start(url, opts = {}) {
    reset()
    abort = new AbortController()
    const signal = opts.signal ?? abort.signal
    status.value = 'loading'
    loaded.value = 0
    total.value = null
    hasKnownSize.value = false
    percent.value = 0
    displayPercent = 0

    let lastT = performance.now()
    let lastLoaded = 0
    let emaSpeed = 0

    try {
      const response = await fetch(url, {
        signal,
        mode: 'cors',
        credentials: 'omit',
      })

      if (!response.ok) {
        throw new Error(`Erreur réseau (${response.status})`)
      }

      const len = response.headers.get('content-length')
      const totalBytes = len ? parseInt(len, 10) : null
      const okTotal = Number.isFinite(totalBytes) && totalBytes > 0
      total.value = okTotal ? totalBytes : null
      hasKnownSize.value = okTotal
      filenameRef.value = guessFilename(response, url)

      const body = response.body
      if (!body) {
        const b = await response.blob()
        blobRef.value = b
        smoothPercent(100)
        status.value = 'done'
        return { blob: b, filename: filenameRef.value }
      }

      const reader = body.getReader()
      const chunks = []

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        chunks.push(value)
        const now = performance.now()
        const chunkLen = value.byteLength
        loaded.value += chunkLen

        const dt = (now - lastT) / 1000
        if (dt >= 0.15) {
          const inst = (loaded.value - lastLoaded) / dt
          emaSpeed = emaSpeed === 0 ? inst : emaSpeed * 0.65 + inst * 0.35
          speedBps.value = emaSpeed
          lastT = now
          lastLoaded = loaded.value
        }

        if (okTotal && total.value) {
          const p = (loaded.value / total.value) * 100
          smoothPercent(Math.min(100, p))
          const remain = total.value - loaded.value
          etaSeconds.value = emaSpeed > 0 ? remain / emaSpeed : null
        } else {
          etaSeconds.value = null
        }
      }

      const blob = new Blob(chunks, { type: response.headers.get('content-type') || undefined })
      blobRef.value = blob
      if (okTotal) {
        smoothPercent(100)
        etaSeconds.value = 0
      }
      status.value = 'done'
      return { blob, filename: filenameRef.value }
    } catch (e) {
      if (e?.name === 'AbortError') {
        status.value = 'idle'
        return null
      }
      const msg = String(e?.message || e)
      if (
        msg.includes('Failed to fetch') ||
        msg.includes('NetworkError') ||
        msg.includes('Load failed') ||
        e?.name === 'TypeError'
      ) {
        status.value = 'cors'
        errorMessage.value =
          'Le navigateur ne peut pas suivre la progression vers ce serveur (CORS). Vous pouvez ouvrir le lien classiquement.'
      } else {
        status.value = 'error'
        errorMessage.value = msg || 'Échec du téléchargement.'
      }
      return null
    }
  }

  function cancel() {
    if (abort) abort.abort()
  }

  return {
    status,
    loaded,
    total,
    hasKnownSize,
    percent,
    speedBps,
    speedLabel,
    etaSeconds,
    errorMessage,
    blobRef,
    filenameRef,
    start,
    cancel,
    reset,
  }
}
