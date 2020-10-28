import { Snackbar } from '@material-ui/core';
import React from 'react'

const SnackbarContext = React.createContext();

export const useSnackbar = () => {
    return React.useContext(SnackbarContext)
}

export const SnackbarProvider = (props) => {
    const [open, setOpen] = React.useState(false)
    const [message, setMessage] = React.useState(false)

    const openSnackbar = (msg) => {
        setMessage(msg);
        setOpen(true);
    }
    
    return (
        <SnackbarContext.Provider value={{openSnackbar}}>
            {props.children}
            <Snackbar 
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                open={open}
                autoHideDuration={5000}
                onClose={()=>setOpen(false)}
                message={message} />
        </SnackbarContext.Provider>
    )
}


