import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PrimeReactProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </PrimeReactProvider>
)
