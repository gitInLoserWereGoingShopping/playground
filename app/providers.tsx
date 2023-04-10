'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { amber, grey, purple } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PaletteMode } from '@mui/material';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: purple,
          divider: purple[700],
          background: {
            default: purple[900],
            paper: purple[900],
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },
})

const ThemeContext = createContext({ mode: 'dark', handleDarkMode: () => {} });

export function useThemeMode() {
  // return the current context value for ThemeContext
  // i.e. darkMode and handleDarkMode
  return useContext(ThemeContext);
}

export function Providers({
  children
}: {
  children: React.ReactNode
}) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light')

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      // if user has opted for dark theme
      // then set the value of darkMode as true
      setMode('dark')
      document.querySelector('body')?.setAttribute('data-theme', 'dark')
    } else if (localStorage.getItem('theme') === 'light') {
      // if user has opted for light theme
      // then set the value of darkMode as false
      setMode('light')
      document.querySelector('body')?.setAttribute('data-theme', 'light')
    } else {
      // if there is nothing in the local storage
      // then, use the system theme by default
      setMode(prefersDarkMode ? 'dark' : 'light')
      document.querySelector('body')?.setAttribute('data-theme', prefersDarkMode ? 'dark' : 'light')
    }
  }, [prefersDarkMode])

  // toggle light/dark mode
  const handleDarkMode = () => {
    if (mode === 'dark') {
      // if dark theme is enabled,
      // then disable it and select the light theme
      localStorage.setItem('theme', 'light')
      setMode('light')
      document.querySelector('body')?.setAttribute('data-theme', 'light')
    } else {
      // if dark theme is disabled,
      // then enable it and select the dark theme
      localStorage.setItem('theme', 'dark')
      setMode('dark')
      document.querySelector('body')?.setAttribute('data-theme', 'dark')
    }
  };

  return (
    <ThemeContext.Provider value={{ mode, handleDarkMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
