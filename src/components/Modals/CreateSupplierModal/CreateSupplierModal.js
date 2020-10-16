import React from "react";
import { TextField, Grid } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

//component
import Backdrop from "components/Backdrop/Backdrop";

import styles from "./CreateSupplierModal.module.css";

const CreateSupplierModal = (props) => {
  return (
    <>
      <Backdrop show={props.show} close={props.hideModal} />
      {props.show ? (
        <div className={styles["container"]}>
          <form className={styles["form"]}>
            <div className={styles["form-header"]}>
              <PersonAddIcon style={{fontSize:"40px"}}/>
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
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="contactName"
                    name="contactName"
                    label="Contact Name"
                    fullWidth
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
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="shipping address-level2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="province"
                    name="province"
                    label="Province"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="postalCode"
                    name="postalCode"
                    label="Postal code"
                    fullWidth
                    autoComplete="shipping postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="shipping country"
                  />
                </Grid>
              </Grid>
            </div>
            <div className={styles["form-footer"]}>
              <div className={styles["form-button"]}>SUBMIT</div>
              <div className={styles["form-button"]}>CANCEL</div>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default CreateSupplierModal;
