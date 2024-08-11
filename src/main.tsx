import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RoutesApp from './Router/RoutesApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RoutesApp />
  </StrictMode>
)
