import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Load from './Load.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Load />
  </StrictMode>,
)
