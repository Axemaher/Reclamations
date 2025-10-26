import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthContextProvider from './app/AuthProvider.jsx';

import './index.scss'
import App from './app/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
  </StrictMode>,
)
