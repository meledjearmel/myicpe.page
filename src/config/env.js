/**
 * Variables exposées côté client (préfixe VITE_ dans .env).
 * Les noms de thèmes doivent correspondre à ceux déclarés dans src/assets/base.css (@plugin daisyui).
 */
export const appEnv = {
  directDownloadUrl: (import.meta.env.VITE_APPLICATION_DIRECT_DOWNLOAD_LINK ?? '').trim(),
  appStoreUrl: (import.meta.env.VITE_APPLICATION_APPSTORE_DOWNLOAD_LINK ?? '').trim(),
  playStoreUrl: (import.meta.env.VITE_APPLICATION_PLAYSTORE_DOWNLOAD_LINK ?? '').trim(),
  appStationBaseUrl: (import.meta.env.VITE_APPSTATION_BASE_URL ?? '').trim().replace(/\/+$/, ''),
  appStationSoftwareSlug: (import.meta.env.VITE_APPSTATION_SOFTWARE_SLUG ?? '').trim(),
  appStationPlatform: (import.meta.env.VITE_APPSTATION_PLATFORM ?? '').trim(),
  themeLight: (import.meta.env.VITE_THEME_LIGHT ?? 'garden').trim(),
  themeDark: (import.meta.env.VITE_THEME_DARK ?? 'night').trim(),
}
