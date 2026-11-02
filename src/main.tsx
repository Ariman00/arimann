/* oxlint-disable import/no-unassigned-import */

import { initClickToSource } from '@bakdotdev/dev-tools'
import CssBaseline from '@mui/material/CssBaseline'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'

import { isDev } from './config.ts'
import { AppThemeProvider } from './context/theme/AppThemeProvider.tsx'

import './index.css'

import './i18n'
import Landing from './pages/common/landing/Landing.tsx'

const root = document.querySelector('#root')

if (!root) {
  throw new Error('Root element not found')
}
if (isDev) {
  initClickToSource({})
}

createRoot(root).render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <AppThemeProvider>
      <CssBaseline />
      <Suspense>
        <Landing />
      </Suspense>
    </AppThemeProvider>
  </LocalizationProvider>
)