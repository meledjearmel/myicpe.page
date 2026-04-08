import { themeIsDark, toggleDocumentTheme } from '@/theme/documentTheme.js'

export function useTheme() {
  return {
    isDark: themeIsDark,
    toggle: toggleDocumentTheme,
  }
}
