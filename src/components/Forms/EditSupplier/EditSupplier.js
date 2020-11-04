import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// material
import { Button, Grid, Hidden, CircularProgress } from "@material-ui/core";

// components
import LeftChevron from "components/LeftChevron/LeftChevron";
import styles from "./EditSupplier.module.css";
import InputField from "components/InputField/InputField";
import InputArea from "components/InputArea/InputArea";

// context
import { useNavigation } from "contexts/NavigationContext";
import { useSuppliers } from "contexts/SuppliersContext";
import { useSnackbar } from "contexts/SnackbarContext";

// modal
import Modal from "../../Modal/Modal";
import { detailsMakeStyles } from "../../Details/detailsMakeStyles";

const EditSupplier = (props) => {
  const classes = detailsMakeStyles();

  const { goBack } = useNavigation();
  const { supplier_id } = useParams();

  const { openSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const { editSupplier, getSupplierDetails } = useSuppliers();

  const [openModal, setOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    let supplier = {
      supplier_name: name,
      supplier_email: email,
      supplier_phone: phone,
      supplier_address: address,
      supplier_contact: contact,
      supplier_notes: notes,
      // supplier_website: website,
      // tpc_username: username,
    };
    if (name !== "") {
      await editSupplier(supplier_id, supplier, snackbar);
    } else {
      // console.log("Please don't leave required field empty");
      setSubmitting(false);
      openSnackbar("Please don't leave required field empty");
    }
  };

  const snackbar = () => {
    openSnackbar("Successfully edited supplier!");
    goBack();
  };

  const setSupplierFields = (supplier) => {
    if (supplier) {
      setName(supplier["supplier_name"] || "");
      setEmail(supplier["supplier_email"] || "");
      setPhone(supplier["supplier_phone"] || "");
      setAddress(supplier["supplier_address"] || "");
      setContact(supplier["supplier_contact"] || "");
      setNotes(supplier["supplier_notes"] || "");
      setWebsite(supplier["supplier_website"] || "");
      setUsername(supplier["tpc_username"] || "");
    }
  };

  useEffect(() => {
    async function getSupplier() {
      let supplier = await getSupplierDetails(supplier_id);
      setSupplierFields(supplier);
    }
    getSupplier();
  }, [supplier_id, getSupplierDetails]);

  return (
    <>
      <div className={styles["add-suppplier"]}>
        {/* edit supplier modal */}
        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          dialogTitle="ARE YOU SURE?"
          dialogContentText={`You are about to save changes to supplier: ${name}`}
          onClose={() => setOpenModal(false)}
        >
          <Button onClick={() => setOpenModal(false)} size="large">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            size="large"
            variant="contained"
            // disabled={submitting}
          >
            {/* {submitting ? <CircularProgress /> : "REMOVE"} */}
            SAVE
          </Button>
        </Modal>
        <LeftChevron />
        <h1 className={styles["header"]}>EDIT SUPPLIER</h1>

        <form>
          <Grid container justify="space-evenly">
            <Grid item xs={12} sm={5} container id="leftCol">
              <div className={styles["supplier-container"]}>
                <Grid item xs={12} spacing={1} container>
                  <Grid item container justify="space-between">
                    <InputField
                      label={"Username"}
                      value={username}
                      setValue={setUsername}
                    />
                  </Grid>
                  <Grid item container justify="space-between">
                    <InputField
                      required
                      label={"Supplier Name"}
                      value={name}
                      setValue={setName}
                    />
                  </Grid>
                  <Grid item container justify="space-between">
                    <InputField
                      label={"Website"}
                      value={website}
                      setValue={setWebsite}
                    />
                  </Grid>
                  <Grid item container justify="space-between">
                    <InputField
                      label={"Contact Name"}
                      value={contact}
                      setValue={setContact}
                    />
                  </Grid>
                  <Grid item container justify="space-between">
                    <InputField
                      label={"Email Address"}
                      value={email}
                      setValue={setEmail}
                    />
                  </Grid>
                  <Grid item container justify="space-between">
                    <InputField
                      label={"Phone Number"}
                      value={phone}
                      setValue={setPhone}
                    />
                  </Grid>
                </Grid>
              </div>
            </Grid>

            {/* End left Col */}
            <Grid
              container
              item
              xs={12}
              sm={5}
              id="rightCol"
              alignItems="center"
              className={styles["grid"]}
              spacing={1}
            >
              <Grid
                item
                container
                justify="space-between"
                className={styles["grid-item-one"]}
              >
                <InputField
                  label={"Address"}
                  value={address}
                  setValue={setAddress}
                />
              </Grid>
              <Grid
                item
                container
                justify="space-between"
                className={styles["grid-item-two"]}
              >
                <InputArea
                  rows="5"
                  label={"Note"}
                  value={notes}
                  setValue={setNotes}
                />
              </Grid>
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
                spacing={1}
              >
                <Grid item xs={12}>
                  <Grid item xs={10} container justify="flex-end">
                    <Grid item xs={10} sm={8} md={7}>
                      <Button
                        disabled={name ? false : true}
                        fullWidth
                        variant="contained"
                        className={classes.supplierButton}
                        onClick={() => setOpenModal(true)}
                      >
                        {submitting ? <CircularProgress size={16} /> : "UPDATE"}
                      </Button>
                    </Grid>
                    <Grid item xs={10} sm={8} md={7}>
                      <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        className={classes.supplierButton}
                        onClick={() => goBack()}
                      >
                        CANCEL
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default EditSupplier;
