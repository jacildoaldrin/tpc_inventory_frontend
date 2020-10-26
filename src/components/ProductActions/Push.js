import React from 'react';
import { Button, CircularProgress, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { useNavigation } from 'contexts/NavigationContext'
import { useParams } from "react-router-dom";
import img from 'assets/tpc_logo.jpg'
import Axios from 'axios';
import target from 'api/api.target';
import { useSnackbar } from 'contexts/SnackbarContext';

const useStyles = makeStyles(theme=>({
    img: {
        display: "block",
        maxWidth: "70%",
        border: "1px solid lightgray",
        borderRadius: "5%",
        margin: "0 auto",
    },
    container: {
        margin: "0 auto",
        maxWidth: "80%",
        [theme.breakpoints.up("md")]:{
            maxWidth: "60%"
        },
        [theme.breakpoints.up("lg")]:{
            maxWidth: "40%"
        }
    },
    txt: {
        fontSize: "1.1rem",
        margin: "5px",
        textAlign: "center"
    }
}))

function Push() {

    const classes = useStyles();
    const { product_id } = useParams();
    const { goBack } = useNavigation();
    const { openSnackbar } = useSnackbar();

    const [submitting, setSubmitting] = React.useState(false)
    // const [open, setOpen] = React.useState(false)
    // const [response, setResponse] = React.useState('')

    const submit = (e) => {
        e.preventDefault()
        setSubmitting(true)
        const location = document.getElementById('location').value
        const bin = document.getElementById('bin').value
        const quantity = document.getElementById('quantity').value
        // console.log("loc:", loc)
        // console.log("bin:", bin)
        // console.log("qty:", qty)
        if (location.length !== 0 && bin.length !== 0 && quantity > -1){
            setTimeout(()=> {
                Axios.post(`${target}/storages/push`, {location, bin, product_id, quantity})
                    .then(res=>{
                        // setResponse(res.data)
                        // setOpen(true)
                        openSnackbar(res.data)
                        setSubmitting(false)
                        goBack();
                        //Expensive design choice right here
                        // getProductStorageDetails();
                    })
            }, 1000)
        }
        else {
            setSubmitting(false)
            openSnackbar("Make sure the data entered is valid!")
            // setResponse("Make sure the data entered is valid!")
        }
    }
        

    const onFocus = (event) => event.target.select();

    return (
        <>
        {/* <Snackbar 
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            open={open}
            autoHideDuration={5000}
            onClose={()=>setOpen(false)}
            message={response}
            /> */}
            <Grid container direction="column" alignItems="center" className={classes.container}>
                <Typography variant="h4">
                    PUSH
                </Typography>
                <form onSubmit={submit}>
                    <Grid container direction="column">
                        <Grid container item justify="center">
                            <Typography>
                                Product Code: {product_id}
                            </Typography>
                        </Grid>
                        <img src={img} className={classes.img} alt="imageNAME"/>
                        <TextField 
                            variant="outlined" 
                            margin="dense" 
                            label="Location"
                            id="location"
                            onFocus={onFocus}
                            autoComplete='off'
                            />
                        <TextField
                            variant="outlined" 
                            margin="dense" 
                            label="Bin"
                            id="bin"
                            onFocus={onFocus}
                            autoComplete='off'
                            />
                        <TextField 
                            type="number"
                            variant="outlined" 
                            margin="dense" 
                            label="Quantity"
                            id="quantity"
                            onFocus={onFocus}
                            />
                        <Grid container item justify="space-between">
                            <Button onClick={goBack} size="large">Cancel</Button>
                            <Button type="submit" size="large" variant="contained" disabled={submitting}>
                                {submitting ? <CircularProgress /> : 'Push'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </>
    )
}

export default Push
