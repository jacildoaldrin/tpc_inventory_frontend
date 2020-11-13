import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react'

const SpinnerContext = React.createContext();

export const useSpinner = () => {
    return React.useContext(SpinnerContext)
}

export default function SpinnerProvider(props) {
    const [isLoading, setIsLoading] = React.useState(false)
    return (
        <SpinnerContext.Provider value={{setIsLoading}}>
            <Grid 
                container 
                direction="column" 
                style={{
                    height: "100%",
                    display: isLoading ? "initial" : "none"
                }} 
                justify="center">
                <Grid container item justify="center">
                    <CircularProgress />
                </Grid>
                <Grid container item justify="center">Loading...</Grid>
                {/* <Grid container item justify="center"></Grid> */}
            </Grid>
            <div 
                style={{
                    display: !isLoading ? "initial" : "none"
                }} >
                {props.children}
            </div>
        </SpinnerContext.Provider>
    )
}

