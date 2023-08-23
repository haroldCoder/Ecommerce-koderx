import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'

const publicKey = import.meta.env.VITE_CLERK_KEY
console.log(publicKey);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={publicKey}>
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)
