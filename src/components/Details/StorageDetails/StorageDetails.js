import { Button, ButtonBase, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import target from 'api/api.target'
import Axios from 'axios'
import React from 'react'
import { useParams } from "react-router-dom";
import { useNavigation } from "contexts/NavigationContext";
import { useStorage } from "contexts/StorageContext";

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
    label: {
        color: "#406E16",
    },
    header: {
        fontWeight: "bold"
    }
})

function StorageDetails() {
    const {getProductsInStorage} = useStorage();
    const { storage_id } = useParams();
    const [productsHere, setProductsHere] = React.useState([])
    const [thisStorage, setThisStorage] = React.useState(null)
    const { viewDetails, goBack } = useNavigation();

    React.useEffect(()=>{
        (async() => {
            setProductsHere(await getProductsInStorage(storage_id))
        })()
        Axios.get(`${target}/storages/${storage_id}`)
            .then(res=>setThisStorage(res.data))
            .catch(err=>console.log(err))
    }, [storage_id, getProductsInStorage])

    const classes = useStyles();

    return (
        <Paper>
            <Grid container direction="row" justify="space-between" className={classes.head}>
                <Grid item xs={12} md={3} container justify="flex-start" alignItems="center">
                    <ButtonBase onClick={goBack}>
                        <ChevronLeft className={classes.chevron} />
                        <Typography variant="h5" className={classes.title}>Storage</Typography>
                    </ButtonBase>
                
                </Grid>
                <Grid item xs={6} md={3} container justify="center" alignItems="center">
                    <Typography variant="h6" className={classes.label}>Location:&nbsp;</Typography>
                    <Typography variant="h6">{thisStorage?.location}</Typography>
                </Grid>
                <Grid item xs={6} md={3} container justify="center" alignItems="center">
                    <Typography variant="h6" className={classes.label}>Bin:&nbsp;</Typography>
                    <Typography variant="h6">{thisStorage?.bin}</Typography>
                </Grid>
            </Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell> 
                            <TableCell className={classes.header}>Code</TableCell> 
                            <TableCell className={classes.header}>Description</TableCell>
                            <TableCell className={classes.header}>Qty</TableCell>
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
                                        <TableCell onClick={()=>viewDetails(`/products/product-details/${product["_id"]}`)} >{product.quantity}</TableCell>
                                        <TableCell onClick={()=>viewDetails(`/storages/storage/${storage_id}/pull/${product._id}`)}><Button variant="contained">PULL</Button></TableCell>
                                </TableRow>
                            else return null
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default StorageDetails
