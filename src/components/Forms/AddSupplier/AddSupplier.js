import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// material
import { TextField, Grid } from "@material-ui/core";
import ApartmentIcon from "@material-ui/icons/Apartment";

// components
import LeftChevron from "components/LeftChevron/LeftChevron";
import styles from "./AddSupplier.module.css";
import InputField from "components/InputField/InputField";
import InputArea from "components/InputArea/InputArea";

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
              <InputField
                required
                label={"Supplier Name"}
                value={name}
                setValue={setName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                label={"Contact Name"}
                value={contact}
                setValue={setContact}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                label={"Email Address"}
                value={email}
                setValue={setEmail}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                label={"Phone Number"}
                value={phone}
                setValue={setPhone}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                label={"Address"}
                value={address}
                setValue={setAddress}
              />
            </Grid>
            <Grid item xs={12}>
              <InputArea
                required
                rows="5"
                label={"Note"}
                value={notes}
                setValue={setNotes}
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
