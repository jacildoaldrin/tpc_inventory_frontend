import React,  { useEffect } from 'react'
import img from 'assets/tpc_logo.jpg'
import { Button, ButtonBase, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import target from 'api/api.target'
import { useProducts } from "contexts/ProductsContext";
import { useNavigation } from 'contexts/NavigationContext'
import { useSnackbar } from 'contexts/SnackbarContext'
import { ChevronLeft } from '@material-ui/icons'

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
    greenBox: {
        backgroundColor: "#dbfad4",
        marginTop: "1rem",
    },
    txt: {
        fontSize: "1.1rem",
        margin: "5px",
        textAlign: "center"
    }
}))

function Pull(props) {
    const { product_id, storage_id } = useParams()
    //product used if you need to reference image
    const [product, setProduct] = React.useState({});
    const [input, setInput] = React.useState(0);
    const [productStorageDetails, setProductStorageDetails] = React.useState(null);
    const [submitting, setSubmitting] = React.useState(false)
    // const [open, setOpen] = React.useState(false)
    // const [response, setResponse] = React.useState('')
    const [openModal, setOpenModal] = React.useState(false)
    const { getProductDetails } = useProducts();
    const { goBack } = useNavigation();
    const { openSnackbar } = useSnackbar();
    
    useEffect(() => {
        //get product details
        async function getProduct() {
            let product = await getProductDetails(product_id);
            setProduct(product);
        }
        getProduct();
    }, [])

    const getProductStorageDetails = () => {
        // console.log(`${target}/getThisProductInAllStorages/${product_id}`)
        Axios.get(`${target}/storages/getThisProductInAllStorages/${product_id}`)
        .then(res => {
            const sto_id = storage_id
            const result = res.data.find(({storage_id}) =>storage_id === parseInt(sto_id))
            setProductStorageDetails(result)
            // console.log(result)
        })
        .catch(err=>console.log(err))
    }

    const submitAll = () => {
        Axios.patch(`${target}/storages/pull`, {product_id, storage_id, quantity: productStorageDetails?.quantity})
            .then(res=>{
                // setResponse(res.data)
                // setOpen(true)
                openSnackbar(res.data)
                setSubmitting(false)
                // // Expensive design choice right here
                // Not anymore
                // getProductStorageDetails();
                goBack();
            })
    }

    const submit = () => {
        if (input <= productStorageDetails.quantity && input > 0){
            setSubmitting(true)
            // console.log(input)
            // setTimeout(()=>{
                // setResponse('OK!')
                // setOpen(true)
                // setSubmitting(false)
            // }, 3000)
            Axios.patch(`${target}/storages/pull`, {product_id, storage_id, quantity: input})
                .then(res=>{
                    // setResponse(res.data)
                    // setOpen(true)
                    openSnackbar(res.data)
                    setSubmitting(false)
                    // // Expensive design choice right here
                    // Not anymore
                    // getProductStorageDetails();
                    goBack();
                })
        }
        else if (input > productStorageDetails.quantity) {
            openSnackbar('You are pulling way too many items!')
            // setResponse('You are pulling way too much!')
            // setOpen(true)
        }
        else {
            // setResponse(`Even god might not be able to do that!`)
            // setOpen(true)
            openSnackbar('Please enter valid qty!')
        }
    }

    const onFocus = (event) => event.target.select();

    const onChange = (e) => setInput(e.target.value)

    const onKeyDown = (e) => {
        if(e.keyCode === '13') submit();
    }

    React.useEffect(()=>{
        // needed if you want to load image
        // getProduct();
        getProductStorageDetails();
    }, [storage_id])


    const classes = useStyles()


    return (
        <>
            <Dialog open={openModal} onClose={()=>setOpenModal(false)}>
                <DialogTitle>
                    ARE YOU SURE?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You are about to pull {productStorageDetails?.quantity} items...
                    </DialogContentText>
                        <DialogActions>
                            <Button onClick={()=>setOpenModal(false)} size="large">Cancel</Button>
                            <Button onClick={submitAll} size="large" variant="contained" disabled={submitting}>
                                {submitting ? <CircularProgress /> : 'PULL ALL'}
                            </Button>
                        </DialogActions>
                </DialogContent>
            </Dialog>
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
                <Grid container justify="space-between">
                    <ButtonBase onClick={goBack}><ChevronLeft style={{fontSize:"10vh"}}  /></ButtonBase>
                    <Grid item xs={8}>
                        <Typography variant="h5" align="right">
                            {product.description}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container direction="column">
                <Grid container item justify="center">
                        <Typography variant="h5">
                            PULL
                        </Typography>
                    </Grid>
                    <img src={img} className={classes.img} alt="imageNAME"/>
                    <Grid container item className={classes.greenBox}>
                        <Grid container item justify="space-evenly">
                            <Typography className={classes.txt}>Location:</Typography>
                            <Typography className={classes.txt}>{productStorageDetails?.location}</Typography>
                        </Grid>
                        <Grid container item justify="space-evenly">
                            <Typography className={classes.txt}>Bin:</Typography>
                            <Typography className={classes.txt}>{productStorageDetails?.bin}</Typography>
                        </Grid>
                        <Grid container item justify="space-evenly">
                            <Typography className={classes.txt}>Qty:</Typography>
                            <Typography className={classes.txt}>{productStorageDetails?.quantity}</Typography>
                        </Grid>
                    </Grid>
                    <Typography className={classes.txt}>How many to pull?</Typography>
                    <TextField 
                        type="number"
                        variant="outlined" 
                        margin="dense" 
                        label={`max ${productStorageDetails?.quantity}`}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        onFocus={onFocus}
                        />
                    <Grid container item justify="space-between">
                        <Button onClick={goBack} size="large">Cancel</Button>
                        <Button onClick={submit} size="large" variant="contained" disabled={submitting}>
                            {submitting ? <CircularProgress /> : 'Pull'}
                        </Button>
                    </Grid>
                    <Grid container item justify="center" style={{marginTop: "1rem", marginBottom: "5rem"}}>
                        <Button onClick={() => setOpenModal(true)} size="large" variant="contained" disabled={submitting} fullWidth>
                            {submitting ? <CircularProgress /> : 'PULL ALL'}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Pull
