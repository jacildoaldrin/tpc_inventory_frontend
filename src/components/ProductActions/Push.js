import React, {useEffect, useState } from 'react';
import { Button, ButtonBase, CircularProgress, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { useNavigation } from 'contexts/NavigationContext'
import { useParams } from "react-router-dom";
import img from 'assets/tpc_logo.jpg'
import Axios from 'axios';
import target from 'api/api.target';
import { useSnackbar } from 'contexts/SnackbarContext';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useProducts } from "contexts/ProductsContext";
import { ChevronLeft } from '@material-ui/icons';
import { useStorage } from 'contexts/StorageContext';

const useStyles = makeStyles(theme=>({
    img: {
        display: "block",
        maxWidth: "55%",
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
    },
    underline: {
        borderBottom: "1px solid lightgray",
        marginBottom: "1rem"
    }
}))

function Push() {

    const classes = useStyles();
    const { product_id } = useParams();
    const { goBack } = useNavigation();
    const { openSnackbar } = useSnackbar();
    const [ storageLocations, setStorageLocations ] = useState([]);
    const { getProductDetails, getProducts } = useProducts();
    const { getStorages } = useStorage();
    const [ product, setProduct ] = useState({});

    const [submitting, setSubmitting] = React.useState(false)
    // const [open, setOpen] = React.useState(false)
    // const [response, setResponse] = React.useState('')

    useEffect(() => {
        //get locations
        Axios.get(`${target}/storages/locations`)
        .then(res=> {
            setStorageLocations(res.data)
        })
        .catch(err=>console.log(err))
        
        //get product details
        async function getProduct() {
            let product = await getProductDetails(product_id);
            setProduct(product);
        }
        getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product_id])

    const submit = (e) => {
        e.preventDefault()
        setSubmitting(true)
        const location = document.getElementById('location').value
        const bin = document.getElementById('bin').value
        const quantity = document.getElementById('quantity').value
        // console.log("loc:", loc)
        // console.log("bin:", bin)
        console.log("qty:")
        console.log(quantity)
        if (location.length !== 0 && bin.length !== 0 && quantity > -1 && quantity !== ""){
            setTimeout(()=> {
                Axios.post(`${target}/storages/push`, { location, bin, product_id, quantity })
                    .then(res=>{
                        // setResponse(res.data)
                        // setOpen(true)
                        openSnackbar(res.data)
                        setSubmitting(false)
                        getStorages();
                        getProducts();
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
                <Grid container alignItems="center" justify="space-between" className={classes.underline}>
                    <ButtonBase onClick={goBack}><ChevronLeft style={{fontSize:"10vh"}}  /></ButtonBase>
                    <Grid item container xs={8} justify="flex-end"> 
                        <Typography variant="h6" align="right">
                            {product.description}
                        </Typography>
                    </Grid>
                </Grid>
                <form onSubmit={submit}>
                    <Grid container direction="column">
                        <Grid container item justify="center">
                            <Typography variant="h4">
                                PUSH
                            </Typography>
                        </Grid>
                        <img src={product.image ? `${target}/images/${product.image}` : img} className={classes.img} alt="product"/>
                        <Autocomplete
                            freeSolo
                            id="location"
                            options={storageLocations}
                            getOptionLabel={(option) => option.location}
                            renderInput={(params) => <TextField {...params}
                                label="Location" 
                                variant="outlined"
                                margin="dense" 
                                onFocus={onFocus}
                                />}
                            />
                        {/* <TextField 
                            variant="outlined" 
                            margin="dense" 
                            label="Location"
                            id="location"
                            onFocus={onFocus}
                            autoComplete='off'
                            /> */}
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
