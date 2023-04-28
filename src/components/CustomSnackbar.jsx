import { Alert, Snackbar } from '@mui/material'
import React, { useContext } from 'react'
import { SnackbarContext } from '../context/SnackbarContext'


function CustomSnackbar() {
const { open, severity, message, handleClose } = useContext(SnackbarContext)

  return (
    <div>
        <Snackbar
          open={open}
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
          autoHideDuration={2000}
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

export default CustomSnackbar