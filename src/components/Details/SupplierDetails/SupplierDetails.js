import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// images
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

//context
import { useSuppliers } from "contexts/SuppliersContext";
import { useNavigation } from "contexts/NavigationContext";
import { useSnackbar } from "contexts/SnackbarContext";

// material
import {
  Button,
  ButtonBase,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Hidden,
} from "@material-ui/core";

// components
import Modal from "../../Modal/Modal";

// styles
import { detailsMakeStyles } from "../detailsMakeStyles";

function SupplierDetails(props) {
  const classes = detailsMakeStyles();
  const { openSnackbar } = useSnackbar();

  const { supplier_id } = useParams();
  const [supplier, setSupplier] = useState({});
  const { goBack, viewDetails } = useNavigation();
  const { getSupplierDetails, removeSupplier } = useSuppliers();

  const [openModal, setOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const remSupplier = async () => {
    console.log(`Remove supplier ${supplier_id}`);
    setSubmitting(true);

    if (supplier_id) {
      await removeSupplier(supplier_id, snackbar);
    } else {
      console.log("Please choose a supplier to delete");
    }
  };

  const snackbar = () => {
    setSubmitting(false);
    openSnackbar(
      `Successfully removed Supplier ID: ${supplier_id} with name: ${supplier.supplier_name}`
    );
    goBack();
  };

  useEffect(() => {
    async function getSupplier() {
      setSupplier(await getSupplierDetails(supplier_id));
    }
    getSupplier();
  }, [supplier_id, getSupplierDetails]);

  return (
    <>
      <Container className={classes.mb15vh}>
        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          dialogTitle="ARE YOU SURE?"
          dialogContentText={`You are about to delete ${supplier?.supplier_name}`}
          onClose={() => setOpenModal(false)}
        >
          <Button onClick={() => setOpenModal(false)} size="large">
            Cancel
          </Button>
          <Button
            onClick={remSupplier}
            size="large"
            variant="contained"
            disabled={submitting}
          >
            {submitting ? <CircularProgress /> : "REMOVE"}
          </Button>
        </Modal>
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
          <Grid item xs={12} sm={5} container id="leftCol">
            <Grid item xs={12} container>
              <Grid item xs={12}></Grid>
              <Grid
                xs={12}
                item
                className={`${classes.underline} ${classes.mt2rem}`}
              >
                <Typography variant="h6">Supplier Info</Typography>
              </Grid>
              {/* <Grid item container justify="space-between">
                <Typography className={classes.txtGreen}>
                  Supplier Code:{" "}
                </Typography>
                <Typography>{supplier.id}</Typography>
              </Grid> */}
              <Grid item container justify="space-between">
                <Typography className={classes.txtGreen}>Name: </Typography>
                <Typography>
                  {supplier.supplier_name !== null
                    ? supplier.supplier_name
                    : "N/A"}
                </Typography>
              </Grid>
              <Grid item container justify="space-between">
                <Typography className={classes.txtGreen}>Website: </Typography>
                <Typography>
                  {supplier.supplier_website? <a href={supplier.supplier_website}>Go to website</a> : "N/A"}
                </Typography>
              </Grid>
              <Grid item container justify="space-between">
                <Typography className={classes.txtGreen}>
                  Website Username:
                </Typography>
                <Typography>
                  {supplier.tpc_username !== null
                    ? supplier.tpc_username
                    : "N/A"}
                </Typography>
              </Grid>
              <Grid item container justify="space-between">
                <Typography className={classes.txtGreen}>Contact: </Typography>
                <Typography>
                  {supplier.supplier_contact !== null
                    ? supplier.supplier_contact
                    : "N/A"}
                </Typography>
              </Grid>
              <Grid item container justify="space-between">
                <Typography className={classes.txtGreen}>Email: </Typography>
                <Typography>
                  {supplier.supplier_email !== null
                    ? supplier.supplier_email
                    : "N/A"}
                </Typography>
              </Grid>
              <Grid item container justify="space-between">
                <Typography className={classes.txtGreen}>Phone: </Typography>
                <Typography>
                  {supplier.supplier_phone !== null
                    ? supplier.supplier_phone
                    : "N/A"}
                </Typography>
              </Grid>
              <Grid item container justify="space-between">
                <Typography className={classes.txtGreen}>Address: </Typography>
                <Typography>
                  {supplier.supplier_address !== null
                    ? supplier.supplier_address
                    : "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={12} container>
                <Hidden>
                  <div
                    style={{ width: "100%", marginTop: "10px" }}
                    className={classes.underline}
                  ></div>
                </Hidden>
              </Grid>
              <Grid item container justify="space-between">
                <Typography className={classes.txtGreen}>Notes: </Typography>
                <Typography>
                  {supplier.supplier_notes !== null
                    ? supplier.supplier_notes
                    : "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* End left Col */}

          <Grid
            container
            item
            xs={12}
            sm={5}
            id="rightCol"
            alignItems="center"
            className={classes.supplierRightColumn}
          >
            <Grid item xs={12} container>
              <Hidden smUp>
                <div
                  style={{ width: "100%" }}
                  className={classes.underline}
                ></div>
              </Hidden>
            </Grid>

            {/* ----------- Right Column */}
            <Grid
              item
              container
              xs={12}
              className={classes.supplierRightColumn}
            >
              {/* <Grid
                xs={12}
                item
                className={`${classes.underline} ${classes.mt2rem}`}
              >
                <Typography variant="h6">Actions</Typography>
              </Grid> */}
              <Grid item xs={12}>
                <Grid item xs={10} container justify="flex-end">
                  <Grid item xs={10} sm={8} md={7}>
                    <Button
                      fullWidth
                      variant="contained"
                      className={classes.supplierButton}
                      onClick={() =>
                        viewDetails(`/suppliers/edit-supplier/${supplier_id}`)
                      }
                    >
                      Update
                    </Button>
                  </Grid>
                  <Grid item xs={10} sm={8} md={7}>
                    <Button
                      disabled={submitting}
                      fullWidth
                      variant="contained"
                      className={classes.supplierButton}
                      onClick={() => setOpenModal(true)}
                    >
                      {submitting ? <CircularProgress /> : "Remove"}
                    </Button>
                  </Grid>
                  <Grid item xs={10} sm={8} md={7}>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      className={classes.supplierButton}
                      onClick={goBack}
                    >
                      Back
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default SupplierDetails;
