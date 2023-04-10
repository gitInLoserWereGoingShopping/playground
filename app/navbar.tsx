'use client'
import { Sun, Moon } from 'react-feather'
import { useThemeMode } from './providers'

export default function NavBar() {
  const { mode, handleDarkMode } = useThemeMode();
  return (
    mode === 'dark'
      ? <Sun onClick={handleDarkMode} style={{cursor: 'pointer', color: 'white'}}/>
      : <Moon onClick={handleDarkMode} style={{cursor: 'pointer', color: '#000'}}/>
  )
}
