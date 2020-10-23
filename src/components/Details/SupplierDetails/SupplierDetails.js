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
  paper: {
    margin: "50px",
  },
  leftColumn: {
    margin: "40px",
  },
  rightColumn: {
    marginTop: "10%",
    marginBottom: "5%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "20%",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "12vw",
      marginTop: "0",
    },
  },
  container: {
    maxWidth: "1100px",
  },
  label: {
    color: "#25a732",
    marginBottom: "20px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "10px",
    },
  },
  details: {
    maxWidth: "70%",
    display: "inline-block",
    overflowWrap: "break-word",
  },
  button: {
    margin: "5px 0",
  },
  title: {
    marginTop: "5%",
    textAlign: "center",
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
  }

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplier_id]);

  return (
    <>
      <Container className={classes.container}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          // className={classes.underline}
        >
          <Grid item xs={2} sm={1}>
            <ButtonBase onClick={goBack}>
              <ChevronLeftIcon className={classes.chevron} />
            </ButtonBase>
          </Grid>
          <Grid item container xs={10} justify="flex-end">
            {/* <Typography
              variant="h5"
              className={classes.mainProdName}
              align="right"
              style={{ marginRight: "5vw" }}
            >
              {supplier.supplier_name}
            </Typography> */}
          </Grid>
        </Grid>

        {/* -------Paper */}
        <Paper elevation={3}>
          <Grid container>
            <Grid item container xs={12} className={classes.title}>
              <Grid item xs={12}>
                <Typography variant="h5" className={classes.details}>
                  {supplier.supplier_name === null
                    ? "-"
                    : supplier.supplier_name}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Grid container className={classes.leftColumn}>
                <Grid item container xs={12} spacing={10}>
                  <Grid item xs={4} className={classes.label}>
                    <Typography>Supplier Id:</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography className={classes.details}>
                      {supplier.id === null ? "-" : supplier.id}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item container xs={12} sm={6}>
                  <Grid item xs={4} className={classes.label}>
                    <Typography>Name:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography className={classes.details}>
                      {supplier.supplier_name === null
                        ? "-"
                        : supplier.supplier_name}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item container xs={12} sm={6}>
                  <Grid item xs={4} className={classes.label}>
                    <Typography>Email:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography className={classes.details}>
                      {supplier.supplier_email === null
                        ? "-"
                        : supplier.supplier_email}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item container xs={12} sm={6}>
                  <Grid item xs={4} className={classes.label}>
                    <Typography>Contact:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography className={classes.details}>
                      {supplier.supplier_contact === null
                        ? "-"
                        : supplier.supplier_contact}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item container xs={12} sm={6}>
                  <Grid item xs={4} className={classes.label}>
                    <Typography>Phone:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography className={classes.details}>
                      {supplier.supplier_phone === null
                        ? "-"
                        : supplier.supplier_phone}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item container xs={12}>
                  <Grid item xs={4} sm={2} className={classes.label}>
                    <Typography>Address:</Typography>
                  </Grid>
                  <Grid item xs={8} sm={10}>
                    <Typography className={classes.details}>
                      {supplier.supplier_address === null
                        ? "-"
                        : supplier.supplier_address}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item container xs={12}>
                  <Grid item xs={4} sm={2} className={classes.label}>
                    <Typography>Notes:</Typography>
                  </Grid>
                  <Grid item xs={8} sm={10}>
                    <Typography className={classes.details}>
                      {supplier.supplier_notes === null
                        ? "-"
                        : supplier.supplier_notes}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* ------- right column */}
            <Grid
              item
              xs={12}
              sm={3}
              // container
              className={classes.rightColumn}
              // spacing={1}
              // justify="center"
            >
              <Grid item xs={10}>
                <Button
                  fullWidth
                  variant="contained"
                  className={classes.button}
                >
                  Update
                </Button>
              </Grid>

              <Grid item xs={10}>
                <Button
                  fullWidth
                  variant="contained"
                  className={classes.button}
                >
                  Remove
                </Button>
              </Grid>

              <Grid item xs={10}>
                <Button
                  fullWidth
                  variant="contained"
                  className={classes.button}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

export default SupplierDetails;
