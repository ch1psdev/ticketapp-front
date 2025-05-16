import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TicketApp } from './TicketApp'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TicketApp />
    </BrowserRouter>
  </StrictMode>,
)
