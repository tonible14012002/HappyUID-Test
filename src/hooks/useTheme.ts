import { useTheme as useInternalTheme } from 'next-themes'

export type ActiveThemeValue = 'light' | 'dark' | undefined
export type ThemeValue = 'light' | 'dark' | 'system' | undefined

export const useTheme = () => {
  const { theme, systemTheme, ...rest } = useInternalTheme()
  return {
    theme: theme as ThemeValue,
    systemTheme,
    ...rest,
  }
}
