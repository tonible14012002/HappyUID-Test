'use client'

import { Button } from '@nextui-org/react'
import { LuMoon, LuSun } from 'react-icons/lu'

import { useTheme } from '@/hooks/useTheme'

export const ThemeButton = () => {
  const { theme, systemTheme, setTheme } = useTheme()
  const activeTheme = {
    light: 'light',
    dark: 'dark',
    system: systemTheme,
  }[theme ?? 'light']

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="flat"
        isIconOnly
        onClick={() => {
          setTheme(activeTheme === 'dark' ? 'light' : 'dark')
        }}
      >
        {activeTheme === 'dark' ? <LuSun /> : <LuMoon />}
      </Button>
    </div>
  )
}
