import React from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'

import AppProvider from './hooks'
import Routes from './routes/routes'
import GlobalStyles from './styles/globalStyles'

const root = createRoot(document.getElementById('root'))

root.render(
  <>
    <AppProvider>
      <Routes/>
    </AppProvider>
    <GlobalStyles />
    <ToastContainer/>
  </>
)
