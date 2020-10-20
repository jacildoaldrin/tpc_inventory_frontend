import React from "react";
import { useHistory } from "react-router-dom";
import { TextField, Grid } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

//components
import LeftChevron from "components/LeftChevron/LeftChevron";

import styles from "./AddSupplier.module.css";

const AddSupplier = (props) => {
  let history = useHistory();

  return (
    <div className={styles["container"]}>
      <LeftChevron />
      <form className={styles["form"]}>
        <div className={styles["form-header"]}>
          <PersonAddIcon style={{ fontSize: "40px" }} />
          <b>&nbsp; ADD SUPPLIER</b>
        </div>
        <div className={styles["form-body"]}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="supplierName"
                name="supplierName"
                label="Supplier Name"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="contactName"
                name="contactName"
                label="Contact Name"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email Address"
                fullWidth
                autoComplete="email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                fullWidth
                autoComplete="phone"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address"
                name="address"
                label="Address"
                fullWidth
                autoComplete="shipping address-line"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="note"
                name="note"
                label="Note"
                fullWidth
                multiline
                rows="5"
                rowsMax="5"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </div>
        <div className={styles["form-footer"]}>
          <button className={styles["form-button"]} type="submit">
            SUBMIT
          </button>
          <button
            className={styles["form-button"]}
            onClick={() => history.goBack()}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSupplier;
