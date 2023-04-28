import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ContextProvider } from './context/GlobalContext'
import { ConfirmProvider } from 'material-ui-confirm'

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <ConfirmProvider>
  <ContextProvider>
    <App />
  </ContextProvider>
  </ConfirmProvider>

)
