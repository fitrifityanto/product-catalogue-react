import { createContext, useState } from "react";

export const SnackbarContext = createContext()

export const SnackbarProvider = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [severity, setSeverity] = useState('info')
    const [message, setMessage] = useState('')

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen (false)
    }

    return (
        <SnackbarContext.Provider
            value ={{
                open: open,
                setOpen: setOpen,
                severity: severity,
                setSeverity: setSeverity,
                message: message,
                setMessage: setMessage,
                handleClose: handleClose
            }}
        >
            {children}
        </SnackbarContext.Provider>
    )
}