import { Alert, Snackbar, SnackbarContent } from '@mui/material'
import React, { useContext } from 'react'
import { SnackbarContext } from '../context/SnackbarContext'

// const alert = (props) => {
//     return <Alert elevation={6} variant='outlined' {...props} /> 
// }

// const styles = {
//     root: {
//         backgroundColor: 'teal'
//     }
// }

function CustomSnackbar() {
const { open, severity, message, handleClose } = useContext(SnackbarContext)

// const classes  = styles

  return (
    <div>
        <Snackbar
          open={open}
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          {/* <SnackbarContent message={message} /> */}
          <Alert
            onClose={handleClose} severity={severity}>
              {message}
          </Alert>
        </Snackbar>
    </div>
  )
}

export default CustomSnackbar