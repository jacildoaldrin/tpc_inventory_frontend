import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react'

const SnackbarContext = React.createContext();

export const useSnackbar = () => {
    return React.useContext(SnackbarContext)
}

export const SnackbarProvider = (props) => {
    const [open, setOpen] = React.useState(false)
    const [message, setMessage] = React.useState(false)
    const [anchor, setAnchor] = React.useState()
    const [severity, setSeverity] = React.useState()


    const openSnackbar = (msg, newSeverity = "info", newAnchor = {vertical: 'bottom', horizontal: 'center'}) => {
        setMessage(msg);
        setAnchor(newAnchor);
        setSeverity(newSeverity);
        
        //make sure this is called last
        setOpen(true);
    }
    
    return (
        <SnackbarContext.Provider value={{openSnackbar}}>
            {props.children}
            <Snackbar 
                anchorOrigin={anchor}
                open={open}
                autoHideDuration={5000}
                onClose={()=>setOpen(false)}>
                    <Alert severity={severity}>
                        {message}
                    </Alert>
                </Snackbar>
        </SnackbarContext.Provider>
    )
}


