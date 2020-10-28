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

// context
import { useNavigation } from "contexts/NavigationContext";
import { useSuppliers } from "contexts/SuppliersContext";
import { useSnackbar } from "contexts/SnackbarContext";

const AddSupplier = (props) => {
  const { goBack } = useNavigation();
  const { addSupplier } = useSuppliers();
  const { openSnackbar } = useSnackbar();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const { getSuppliers } = useSuppliers();

  const handleSubmit = async (event) => {
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
      await addSupplier(supplier, snackbar);
    } else {
      console.log("Please fill out required field");
    }
  };

  const snackbar = () => {
    openSnackbar("Successfully added a new supplier!");
    goBack();
  };

  return (
    <div className={styles["container"]}>
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
          <button className={styles["form-button"]} onClick={() => goBack()}>
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSupplier;
