import type { ThemeColors } from '@nextui-org/react'
import { nextui, colors } from '@nextui-org/react'
import tailwindTypo from '@tailwindcss/typography'

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    tailwindTypo,
    nextui({
      themes: {
        light: {
          colors: {
            text: {
              primary: colors.zinc[800],
              secondary: colors.zinc[600],
              tertiary: colors.zinc[500],
            },
          } as Partial<ThemeColors>,
        },
        dark: {
          colors: {
            text: {
              primary: colors.zinc['100'],
              secondary: colors.zinc['200'],
              tertiary: colors.zinc['400'],
            },
          } as Partial<ThemeColors>,
        },
      },
    }),
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        xxs: '11px',
        '3.5xl': '32px',
        '4.5xl': '40px',
      },
      container: {
        center: true,
        screens: {
          sm: '100%',
          md: '100%',
          lg: '1024px',
          xl: '1280px',
        },
      },
    },
  },
}
