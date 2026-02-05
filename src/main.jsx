import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppCode from './AppCode.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <AppCode /> */}
    <App />
  </StrictMode>,
)
