import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

/* Design system first, so component styles can build on it. */
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/base.css'

import App from './App'

const container = document.getElementById('root')
if (!container) throw new Error('Root element not found')

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
