/**
 * Variables exposées côté client (préfixe VITE_ dans .env).
 * Les noms de thèmes doivent correspondre à ceux déclarés dans src/assets/base.css (@plugin daisyui).
 */
export const appEnv = {
  directDownloadUrl: (import.meta.env.VITE_APPLICATION_DIRECT_DOWNLOAD_LINK ?? '').trim(),
  appStoreUrl: (import.meta.env.VITE_APPLICATION_APPSTORE_DOWNLOAD_LINK ?? '').trim(),
  playStoreUrl: (import.meta.env.VITE_APPLICATION_PLAYSTORE_DOWNLOAD_LINK ?? '').trim(),
  themeLight: (import.meta.env.VITE_THEME_LIGHT ?? 'garden').trim(),
  themeDark: (import.meta.env.VITE_THEME_DARK ?? 'night').trim(),
}
