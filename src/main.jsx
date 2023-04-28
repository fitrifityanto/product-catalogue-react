import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ContextProvider } from './context/GlobalContext'
import { ConfirmProvider } from 'material-ui-confirm'
import { SnackbarProvider } from './context/SnackbarContext'

ReactDOM.createRoot(document.getElementById('root')).render(

<ContextProvider>
  <SnackbarProvider>
  <ConfirmProvider>
    <App />
  </ConfirmProvider>
  </SnackbarProvider>
</ContextProvider>

)
