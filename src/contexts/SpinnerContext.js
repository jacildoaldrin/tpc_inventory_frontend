import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react'

const SpinnerContext = React.createContext();

export const useSpinner = () => {
    return React.useContext(SpinnerContext)
}

function StorageProvider(props) {
    const [isLoading, setIsLoading] = React.useState(false)
    return (
        <SpinnerContext.Provider value={{setIsLoading}}>
            {isLoading ? 
            
            <Grid container direction="column" style={{height: "100%"}} justify="center">
                <Grid container item justify="center">
                    <CircularProgress />
                </Grid>
                <Grid container item justify="center">Loading...</Grid>
                {/* <Grid container item justify="center"></Grid> */}
            </Grid>
             
            : props.children}
        </SpinnerContext.Provider>
    )
}

export default StorageProvider
