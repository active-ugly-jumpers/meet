import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import * as atatus from 'atatus-spa';
atatus.config('4caaab2ccca9407388dc1ba9bc5a9bf4').install();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
