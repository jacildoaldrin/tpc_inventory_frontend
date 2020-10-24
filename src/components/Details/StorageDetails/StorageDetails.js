import { Button, ButtonBase, Grid, InputAdornment, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import { ChevronLeft, Search } from '@material-ui/icons';
import target from 'api/api.target'
import Axios from 'axios'
import React from 'react'
import { useParams } from "react-router-dom";
import { useNavigation } from "contexts/NavigationContext";

const useStyles = makeStyles({
    head: {
        margin: '5px'
    },
    searchbar: {
        marginRight: '15px',
    },  
    chevron: {
      fontSize: "10vh",
    },
})

function StorageDetails() {
    const { storage_id } = useParams();
    const [productsHere, setProductsHere] = React.useState([])
    const [thisStorage, setThisStorage] = React.useState(null)
    const { viewDetails, goBack } = useNavigation();

    React.useEffect(()=>{
        Axios.get(`${target}/storages/productsInStorage/${storage_id}`)
            .then(res=>{
                setProductsHere(res.data)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
        Axios.get(`${target}/storages/${storage_id}`)
            .then(res=>setThisStorage(res.data))
            .catch(err=>console.log(err))
    }, [storage_id])

    const classes = useStyles();

    return (
        <>
            <TableContainer component={Paper}>
                <Grid container direction="row" justify="space-between" className={classes.head}>
                    <Grid item xs={12} md={3} container justify="flex-start" alignItems="center">
                        <ButtonBase onClick={goBack}>
                            <ChevronLeft className={classes.chevron} />
                            <Typography variant="h5" className={classes.title}>Storage</Typography>
                        </ButtonBase>
                    
                    </Grid>
                    <Grid item xs={6} md={3} container justify="center" alignItems="center">
                        <Typography variant="h6">Location:</Typography>
                        <Typography variant="h6">{thisStorage?.location}</Typography>
                    </Grid>
                    <Grid item xs={6} md={3} container justify="center" alignItems="center">
                        <Typography variant="h6">Bin:</Typography>
                        <Typography variant="h6">{thisStorage?.bin}</Typography>
                    </Grid>
                    <Grid item xs={12} md={3} container justify="flex-end" alignItems="center">
                        <TextField
                        // fullWidth={true}
                        className={classes.searchbar}
                        margin="dense"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                  <Search style={{ color: "rgba(0, 0, 0, 0.4)" }} />
                                </InputAdornment>
                            ),
                        }} />
                    </Grid>
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell> 
                            <TableCell>Product Code</TableCell> 
                            <TableCell>Description</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productsHere?.map(product => {
                            if(product.quantity > 0)
                                return <TableRow 
                                    key={product._id}
                                    >
                                        <TableCell onClick={()=>viewDetails(`/products/product-details/${product["_id"]}`)}></TableCell>
                                        <TableCell onClick={()=>viewDetails(`/products/product-details/${product["_id"]}`)}>{product._id}</TableCell>
                                        <TableCell onClick={()=>viewDetails(`/products/product-details/${product["_id"]}`)}>{product.description}</TableCell>
                                        <TableCell onClick={()=>viewDetails(`/products/product-details/${product["_id"]}`)}>{product.quantity}</TableCell>
                                        <TableCell onClick={()=>viewDetails(`/storages/storage/${storage_id}/pull/${product._id}`)}><Button variant="contained">PULL</Button></TableCell>
                                </TableRow>
                            else return null
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default StorageDetails
