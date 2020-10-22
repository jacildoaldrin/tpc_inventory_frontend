import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import styles from "./ProductDetails.module.css";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import img from 'assets/tpc_logo.jpg'

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
//context
import { useProducts } from "contexts/ProductsContext";
import { Button, ButtonBase, Chip, Container, Fab, Grid, Hidden, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useNavigation } from "contexts/NavigationContext";
import target from 'api/api.target'
import Axios from "axios";

const useStyles = makeStyles(theme => ({
  chevron: {
    fontSize: "10vh",
  },
  mainProdName: {
    fontSize: "3vh",
  },
  underline: {
    borderBottom: "1px solid lightgray",
    marginBottom: "1rem"
  },
  img: {
    display: "block",
    maxWidth: "80%",
    border: "1px solid lightgray",
    borderRadius: "5%",
    margin: "0 auto",
  },
  mt1rem: {
    marginTop: "1rem",
  },
  mt2rem: {
    marginTop: "2rem",
  },
  mb15vh: {
    marginBottom: "6.4rem"
  },
  tblcontainer: {
    width: "100%"
  },
  fab : {
    position: "fixed",
    zIndex: 1000,
    bottom: "6rem",
    // [theme.breakpoints.down(768)]: {
      right: "2vw",
    // },
    // [theme.breakpoints.up(768)]: {
    //   right: "5vw"
    // },
  },
  btnfloathide: {
    position: "fixed",
    bottom: "6rem",
    opacity: 0,
    // [theme.breakpoints.down(768)]: {
      right: "2vw",
    // },
    // [theme.breakpoints.up(768)]: {
    //   right: "5vw"
    // },
    transition: 'all .1s ease-in'
  },
  btnfloatshow1: {
    opacity: 1,
    position: "fixed",
    bottom: "9.5rem",
    zIndex:999,
    // [theme.breakpoints.down(768)]: {
      right: "2vw",
    // },
    // [theme.breakpoints.up(768)]: {
    //   right: "5vw"
    // },
    transition: 'all .1s ease-in',
    boxShadow: '0px 3px 3px -3px rgba(0,0,0,0.75)'
  },
  btnfloatshow2: {
    position: "fixed",
    bottom: "13rem",
    zIndex:555,
    // [theme.breakpoints.down(768)]: {
      right: "2vw",
    // },
    // [theme.breakpoints.up(768)]: {
    //   right: "5vw"
    // },
    transition: 'all .15s ease-in',
    boxShadow: '0px 3px 3px -3px rgba(0,0,0,0.75)'
  },
  txtGreen: {
    color: '#25a732'
  }
}))

const ProductDetails = (props) => {
  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  const [productStorageDetails, setProductStorageDetails] = useState(null);
  const { getProductDetails } = useProducts();

  const { goBack } = useNavigation();

  const [showbtn, setshowbtn] = useState(false)

  async function getProduct() {
    let product = await getProductDetails(product_id);
    setProduct(product);
    console.log(product);
  }

  const getProductStorageDetails = () => {
    console.log(`${target}/storages/product/${product_id}`)
    Axios.get(`${target}/storages/product/${product_id}`)
    .then(res => {
      setProductStorageDetails(res.data)
      console.log("getProductStorageDetails")
      console.log(res.data)
    })
    .catch(err=>console.log(err))
  }

  useEffect(() => {
    
    getProduct();
    getProductStorageDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product_id]);

  const classes = useStyles();

  const onFloatBtnClick = () => {
    setshowbtn(!showbtn)
  }
  console.log()
  return (<>
    <Fab className={classes.fab} aria-haspopup="true" variant="extended" onClick={onFloatBtnClick}>
      <ArrowDropUpIcon /> Actions
    </Fab>
    <Fab className={showbtn ? classes.btnfloatshow1 : classes.btnfloathide} aria-haspopup="true" variant="extended">
      <ArrowDropUpIcon /> Restock
    </Fab>
    <Fab className={showbtn ? classes.btnfloatshow2 : classes.btnfloathide} aria-haspopup="true" variant="extended">
      <ArrowDropUpIcon /> Edit
    </Fab>
    
    <Container className={classes.mb15vh}>
      <Grid container justify="space-between" alignItems="center" className={classes.underline}>
        <Grid item xs={2} sm={1}><ButtonBase onClick={goBack}><ChevronLeftIcon className={classes.chevron} /></ButtonBase></Grid>
        <Grid item container xs={10} justify="flex-end"><Typography variant="h5" className={classes.mainProdName} align="right">{product.description} pot but a little ok</Typography></Grid>
      </Grid>
      <Grid container justify="space-evenly">
        <Grid item xs={12} sm={5} container id="leftCol">
          <Grid item xs={12} container>
            <Grid item xs={12}>
              <img src={img} className={classes.img} alt="plant"/>
            </Grid>
            <Grid xs={12} item className={`${classes.underline} ${classes.mt2rem}`}>
              <Typography variant="h6">Product Info</Typography>
            </Grid>
            <Grid item container justify="space-between">
              <Typography className={classes.txtGreen}>Product Code: </Typography>
              <Typography>{product._id}</Typography>
            </Grid>
            <Grid item container justify="space-between">
              <Typography className={classes.txtGreen}>UPC: </Typography>
              <Typography>{product.upc !== null ? product.upc : "N/A"}</Typography>
            </Grid>
            <Grid item container justify="space-between">
              <Typography className={classes.txtGreen}>Supplier Code: </Typography>
              <Typography>{product.supplier_code !== null ? product.supplier_code : "N/A" }</Typography>
            </Grid>
            <Grid item container justify="space-between">
              <Typography className={classes.txtGreen}>Listing Name: </Typography>
              <Typography>{product.list_name !== null ? product.list_name : "N/A" }</Typography>
            </Grid>
            <Grid item container justify="space-between">
              <Typography className={classes.txtGreen}>Unit Selling Price: </Typography>
              <Typography>{product.unit_sell_price !== null ? `$${product.unit_sell_price}` : "N/A" }</Typography>
            </Grid>
            <Grid item xs={12} container>
              <Hidden smDown>
                <div style={{width: "100%"}} className={classes.underline}></div>
              </Hidden>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={12} container justify="space-between">
                <Grid item xs={12} sm={5} container justify="space-between">
                  <Typography className={classes.txtGreen}>Fits Size: </Typography>
                  <Typography>{product.fits_size !== null ? `${product.fits_size}` : "N/A" }</Typography>
                </Grid>
                <Grid item xs={12} sm={5} container justify="space-between">
                  <Typography className={classes.txtGreen}>Dimension: </Typography>
                  <Typography>{product.dimensions !== null ? `${product.dimensions}` : "N/A" }</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} container justify="space-between">
                <Typography className={classes.txtGreen}>Collection(s): </Typography>
                <Typography>{product.containers?.map((container, ctr) => (<Chip label={container.name} key={ctr} />))}</Typography>
              </Grid>
              <Grid item xs={12} container justify="space-between">
                <Typography className={classes.txtGreen}>Tag(s): </Typography>
                <Typography>{product.tags?.map((tag, ctr) => (<Chip label={tag.name} key={ctr} />))}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* End left Col */}


        <Grid item xs={12} sm={5} id="rightCol">
          <Grid item xs={12} container>
            <Hidden smUp>
              <div style={{width: "100%"}} className={classes.underline}></div>
            </Hidden>
          </Grid>


          <Grid item xs={12}>
            {/************************************************************************************/}
            {/**/}
            {/*PLACE OTHER STUFF HERE those $$$ and QTY ones*/}
            {/**/}
            {/************************************************************************************/}
            <Hidden smDown>
              <Grid container>
                <Grid item xs={12} className={classes.underline}>
                  <Typography variant="h6">Product numbers</Typography>
                </Grid>
                <Grid item xs={12} container justify="space-between">
                  <Grid item xs={12} sm={5} container justify="space-between">
                    <Typography className={classes.txtGreen}>Stock qty: </Typography>
                    <Typography>{product.quantity !== null ? `${product.quantity}` : "N/A" }</Typography>
                  </Grid>
                  <Grid item xs={12} sm={5} container justify="space-between">
                    <Typography className={classes.txtGreen}>Qty Added: </Typography>
                    <Typography>{product.qty_added !== null ? `${product.qty_added}` : "N/A" }</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} container justify="space-between">
                  <Grid item xs={12} sm={5} container justify="space-between">
                    <Typography className={classes.txtGreen}>Qty Sold: </Typography>
                    <Typography>{product.qty_sold !== null ? `${product.qty_sold}` : "N/A" }</Typography>
                  </Grid>
                  <Grid item xs={12} sm={5} container justify="space-between">
                    <Typography className={classes.txtGreen}>Low Stock: </Typography>
                    <Typography>{product.low_stock !== null ? `${product.low_stock}` : "N/A" }</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Hidden smDown>
                    <div style={{width: "100%"}} className={classes.underline}></div>
                  </Hidden>
                </Grid>
                <Grid item xs={12} container justify="space-between">
                  <Typography className={classes.txtGreen}>Per unit selling price: </Typography>
                  <Typography>{product.unit_sell_price !== null ? `$${product.unit_sell_price}` : "N/A" }</Typography>
                </Grid>
                <Grid item xs={12} container justify="space-between">
                  <Typography className={classes.txtGreen}>Original cost: </Typography>
                  <Typography>{product.orig_cost !== null ? `$${product.orig_cost}` : "N/A" }</Typography>
                </Grid>
                <Grid item xs={12} container justify="space-between">
                  <Typography className={classes.txtGreen}>Original cost with tax: </Typography>
                  <Typography>{product.orig_cost_with_tax !== null ? `$${product.orig_cost_with_tax}` : "N/A" }</Typography>
                </Grid>
                <Grid item xs={12} container justify="space-between">
                  <Typography className={classes.txtGreen}>Average cost: </Typography>
                  <Typography>{product.avg_cost !== null ? `$${product.avg_cost}` : "N/A" }</Typography>
                </Grid>
                <Grid item xs={12} container justify="space-between">
                  <Typography className={classes.txtGreen}>Average cost with tax: </Typography>
                  <Typography>{product.avg_cost_with_tax !== null ? `$${product.avg_cost_with_tax}` : "N/A" }</Typography>
                </Grid>
                <Grid item xs={12} container justify="space-between">
                  <Typography className={classes.txtGreen}>Total current product value: </Typography>
                  <Typography>{product.total_current_product_value !== null ? `$${product.total_current_product_value}` : "N/A" }</Typography>
                </Grid>
                <Grid item xs={12} container justify="space-between">
                  <Typography className={classes.txtGreen}>Margin: </Typography>
                  <Typography>{product.margin ? `${product.margin}%` : "%" }</Typography>
                </Grid>
                <Grid item xs={12}>
                  <div style={{width: "100%"}} className={classes.underline}></div>
                </Grid>
                <Grid item container xs={12}>
                  <Typography className={classes.txtGreen}>Packaging:</Typography>
                  <Typography>{product.packaging}</Typography>
                </Grid>
                <Grid item container xs={12}>
                  <Typography className={classes.txtGreen}>Product Notes:</Typography>
                  <Typography>{product.product_notes}</Typography>
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
          <Grid item container xs={12}>
            <Grid xs={12} item className={`${classes.underline} ${classes.mt2rem}`}>
              <Typography variant="h6">Storage</Typography>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" className={classes.txtGreen}>LOC</TableCell>
                      <TableCell align="center" className={classes.txtGreen}>BIN</TableCell>
                      <TableCell align="center" className={classes.txtGreen}>QTY</TableCell>
                      <TableCell align="center" className={classes.txtGreen}>&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productStorageDetails?.map(row => (
                      <TableRow key={row.id}>
                        <TableCell align="center">{row.location}</TableCell>
                        <TableCell align="center">{row.bin}</TableCell>
                        <TableCell align="center">{row.quantity}</TableCell>
                        <TableCell align="right"><Button variant="contained" size="small">Pull</Button></TableCell>
                      </TableRow>
                    ))}
                    
                  </TableBody>
                </Table>
              </TableContainer>
              <Grid item xs={12} container justify="flex-start">
                <Grid item xs={7} sm={11} md={12}>
                  <Button fullWidth variant="contained" className={classes.mt1rem}>Push</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
    </>
  );
};

export default ProductDetails;
