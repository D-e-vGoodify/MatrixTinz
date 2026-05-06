import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from './App.jsx'
import { DarkModeProvider } from './contexts/darkMode.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <DarkModeProvider>
    <Main />
  </DarkModeProvider>
)
