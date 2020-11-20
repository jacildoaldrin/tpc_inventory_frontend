import { Button, ButtonBase, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import React from 'react'
import { useParams } from "react-router-dom";
import { useNavigation } from "contexts/NavigationContext";
import { useStorage } from "contexts/StorageContext";
import { useSpinner } from "contexts/SpinnerContext";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ModalProducts from 'components/Modal/ModalProducts';

const useStyles = makeStyles({
    head: {
        margin: '5px'
    },
    searchbar: {
        marginRight: '15px',
    },  
    chevron: {
      fontSize: "5vh",
    },
    label: {
        color: "#406E16",
    },
    header: {
        fontWeight: "bold"
    }
})

function StorageDetails() {
    const { getStorage, getProductsInStorage } = useStorage();
    const { storage_id } = useParams();
    const { setIsLoading } = useSpinner();
    const [productsHere, setProductsHere] = React.useState([])
    const [thisStorage, setThisStorage] = React.useState(null)
    const [openModal, setOpenModal] = React.useState(false)
    const { viewDetails, goBack } = useNavigation();

    React.useEffect(()=>{
        (async() => {
            setIsLoading(true)
            setProductsHere(await getProductsInStorage(storage_id));
            setThisStorage(await getStorage(storage_id));
            setIsLoading(false)
        })()
    }, [storage_id, getStorage, getProductsInStorage, setIsLoading])

    const classes = useStyles();

    return (
        <>
        <Grid container direction="column" justify="center" alignContent="center">
            <Grid item style={{marginBottom: "20px"}}>
            <Button variant="contained" onClick={()=>setOpenModal(true)}>
                <AddCircleOutlineIcon style={{paddingRight: "5px"}} />
                Push Product
            </Button>
            </Grid>
            <Paper>
                <Grid container direction="row" justify="space-between" className={classes.head}>
                    <Grid item xs={12} md={3} container justify="flex-start" alignItems="center">
                        <ButtonBase onClick={goBack}>
                            <ChevronLeft className={classes.chevron} />
                            <Typography variant="h5" className={classes.title}>Storage</Typography>
                        </ButtonBase>
                    
                    </Grid>
                    <Grid item xs={6} md={4} container justify="center" alignItems="center">
                        <Typography className={classes.label}>Location:&nbsp;</Typography>
                        <Typography>{thisStorage?.location}</Typography>
                    </Grid>
                    <Grid item xs={6} md={3} container justify="center" alignItems="center">
                        <Typography className={classes.label}>Bin:&nbsp;</Typography>
                        <Typography>{thisStorage?.bin}</Typography>
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
        </Grid>
        <ModalProducts openModal={openModal} setOpenModal={setOpenModal} storage={thisStorage} />
        </>
    )
}

export default StorageDetails
