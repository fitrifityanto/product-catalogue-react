import { Alert, Snackbar } from '@mui/material'
import React, { useContext } from 'react'
import { SnackbarContext } from '../context/SnackbarContext'

const alert = (props) => {
    return <Alert elevation={6} variant='filled' {...props} /> 
}

const styles = {
    root: {
        background: 'red'
    }
}
function CustomSnackbar() {
    const { open, severity, message, handleClose } = useContext(SnackbarContext)
    const classes = styles()
  return (
    <div>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert 
            onClose={handleClose} severity={severity}>
              {message}
          </Alert>
        </Snackbar>
    </div>
  )
}

export default Snackbar