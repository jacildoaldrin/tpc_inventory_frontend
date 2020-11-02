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
import { useStorage } from 'contexts/StorageContext'

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
    },
    underline: {
        borderBottom: "1px solid lightgray",
        marginBottom: "1rem"
    }
}))

function Pull(props) {
    const { product_id, storage_id } = useParams()
    //product used if you need to reference image
    const [product, setProduct] = React.useState({});
    const [input, setInput] = React.useState(0);
    const [productStorageDetails, setProductStorageDetails] = React.useState(null);
    const [submitting, setSubmitting] = React.useState(false)
    const [openModal, setOpenModal] = React.useState(false)
    const { getProductDetails, getProducts } = useProducts();
    const { getStorage } = useStorage();
    const { goBack } = useNavigation();
    const { openSnackbar } = useSnackbar();
    const classes = useStyles()
    
    useEffect(() => {
        //get product details and product storage details
        Axios.get(`${target}/storages/getThisProductInAllStorages/${product_id}`)
        .then(res => {
            const sto_id = storage_id
            const result = res.data.find(({storage_id}) =>storage_id === parseInt(sto_id))
            setProductStorageDetails(result)
        })
        .catch(err=>console.log(err))

        const getProduct = async() => {
            let product = await getProductDetails(product_id);
            setProduct(product);
        }
        getProduct();
    }, [product_id, storage_id, getProductDetails])

    const submitAll = () => {
        Axios.patch(`${target}/storages/pull`, {product_id, storage_id, quantity: productStorageDetails?.quantity})
            .then(res=>{
                openSnackbar(res.data)
                setSubmitting(false)
                getStorage();
                getProducts();
                goBack();
            })
    }

    const submit = () => {
        if (input <= productStorageDetails.quantity && input > 0){
            setSubmitting(true)
            Axios.patch(`${target}/storages/pull`, {product_id, storage_id, quantity: input})
                .then(res=>{
                    openSnackbar(res.data)
                    setSubmitting(false)
                    getStorage();
                    goBack();
                })
        }
        else if (input > productStorageDetails.quantity) {
            openSnackbar('You are pulling way too many items!')
        }
        else {
            openSnackbar('Please enter valid qty!')
        }
    }

    const onFocus = (event) => event.target.select();

    const onChange = (e) => setInput(e.target.value)

    const onKeyDown = (e) => {
        if(e.keyCode === '13') submit();
    }
    
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
                <Grid container justify="space-between" className={classes.underline}>
                    <ButtonBase onClick={goBack}><ChevronLeft style={{fontSize:"10vh"}}  /></ButtonBase>
                    <Grid item xs={8}>
                        <Typography variant="h6" align="right">
                            {product.description}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container direction="column">
                <Grid container item justify="center">
                        <Typography variant="h4">
                            PULL
                        </Typography>
                    </Grid>
                    <img src={product.image ? `${target}/images/${product.image}` : img} className={classes.img} alt="product"/>
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
