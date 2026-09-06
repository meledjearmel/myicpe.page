import { ref, onMounted } from 'vue'
import { appEnv } from '@/config/env.js'

/**
 * Reflète la dernière release publiée sur AppStation (nom, version, taille) pour la vitrine.
 * Le téléchargement effectif (licence/essai/achat) se termine toujours sur AppStation :
 * ce composable ne fait qu'indiquer si une release est disponible et vers quelle fiche renvoyer.
 */
export function useAppStationRelease() {
  const status = ref('idle') // idle | loading | ready | empty | error
  const release = ref(null)

  const isConfigured = Boolean(appEnv.appStationBaseUrl && appEnv.appStationSoftwareSlug)
  const softwareUrl = isConfigured
    ? `${appEnv.appStationBaseUrl}/softwares/${appEnv.appStationSoftwareSlug}`
    : ''

  async function load() {
    if (!isConfigured) {
      status.value = 'empty'
      return
    }

    status.value = 'loading'
    try {
      const res = await fetch(
        `${appEnv.appStationBaseUrl}/api/v1/softwares/${appEnv.appStationSoftwareSlug}/releases`,
        { headers: { Accept: 'application/json' } },
      )

      if (!res.ok) {
        status.value = 'empty'
        return
      }

      const body = await res.json()
      const releases = Array.isArray(body?.data) ? body.data : []
      const match =
        releases.find(
          (r) => !r.is_yanked && (!appEnv.appStationPlatform || r.platform === appEnv.appStationPlatform),
        ) ?? null

      if (!match) {
        status.value = 'empty'
        return
      }

      release.value = match
      status.value = 'ready'
    } catch {
      status.value = 'error'
    }
  }

  onMounted(load)

  return { status, release, softwareUrl, isConfigured, reload: load }
}
