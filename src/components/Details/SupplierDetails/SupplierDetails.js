import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// images
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import img from "assets/tpc_logo.jpg";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

//context
import { useSuppliers } from "contexts/SuppliersContext";
import { useNavigation } from "contexts/NavigationContext";

// material
import {
  Button,
  ButtonBase,
  Chip,
  Container,
  Fab,
  Grid,
  Hidden,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  chevron: {
    fontSize: "10vh",
  },
  mainProdName: {
    fontSize: "3vh",
  },
  underline: {
    borderBottom: "1px solid lightgray",
    marginBottom: "1rem",
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
    marginBottom: "6.4rem",
  },
  tblcontainer: {
    width: "100%",
  },
}));

function SupplierDetails() {
  const classes = useStyles();
  const { supplier_id } = useParams();
  const [supplier, setSupplier] = useState({});
  const { goBack } = useNavigation();
  const { getSupplierDetails } = useSuppliers();

  async function getProduct() {
    let supplier = await getSupplierDetails(supplier_id);
    setSupplier(supplier);
    console.log(supplier);
  }

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplier_id]);

  return (
    <>
      <Container className={classes.mb15vh}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.underline}
        >
          <Grid item xs={2} sm={1}>
            <ButtonBase onClick={goBack}>
              <ChevronLeftIcon className={classes.chevron} />
            </ButtonBase>
          </Grid>
          <Grid item container xs={10} justify="flex-end">
            <Typography
              variant="h5"
              className={classes.mainProdName}
              align="right"
            >
              {supplier.supplier_name}
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="space-evenly">
          {/* -------Paper */}
          <Grid item>
            <Typography>{JSON.stringify(supplier)}</Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default SupplierDetails;
