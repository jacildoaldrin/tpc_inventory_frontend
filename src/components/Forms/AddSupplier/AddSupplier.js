import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// material
import { TextField, Grid } from "@material-ui/core";
import ApartmentIcon from "@material-ui/icons/Apartment";

// components
import LeftChevron from "components/LeftChevron/LeftChevron";
import styles from "./AddSupplier.module.css";

// axios
import axios from "axios";
import target from "api/api.target";

const AddSupplier = (props) => {
  let history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  // const [open, setOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    let supplier = {
      supplier_name: name,
      supplier_email: email,
      supplier_phone: phone,
      supplier_address: address,
      supplier_contact: contact,
      supplier_notes: notes,
    };

    if (name != null) {
      axios.post(`${target}/suppliers/`, supplier).then(
        (response) => {
          console.log(response);
          console.log("Successfully created Supplier");
          history.goBack();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Please fill out required field");
    }
  };

  return (
    <div className={styles["container"]}>
      {/* <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        message="successful"
      /> */}
      <LeftChevron />
      <form
        className={styles["form"]}
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className={styles["form-header"]}>
          <ApartmentIcon style={{ fontSize: "40px" }} />
          <b>&nbsp; ADD SUPPLIER</b>
        </div>
        <div className={styles["form-body"]}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Supplier Name"
                fullWidth
                variant="outlined"
                label="Supplier Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="contactName"
                name="contactName"
                label="Contact Name"
                fullWidth
                variant="outlined"
                value={contact}
                onChange={(event) => setContact(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="email"
                name="email"
                label="Email Address"
                fullWidth
                autoComplete="email"
                variant="outlined"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                fullWidth
                autoComplete="phone"
                variant="outlined"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address"
                name="address"
                label="Address"
                fullWidth
                autoComplete="shipping address-line"
                variant="outlined"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="note"
                name="note"
                label="Note"
                fullWidth
                multiline
                rows="5"
                rowsMax="5"
                variant="outlined"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
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
