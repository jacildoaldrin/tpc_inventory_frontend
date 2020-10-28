import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// material
import { Grid } from "@material-ui/core";
import ApartmentIcon from "@material-ui/icons/Apartment";

// components
import LeftChevron from "components/LeftChevron/LeftChevron";
import styles from "./EditSupplier.module.css";
import InputField from "components/InputField/InputField";
import InputArea from "components/InputArea/InputArea";

// context
import { useNavigation } from "contexts/NavigationContext";
import { useSuppliers } from "contexts/SuppliersContext";
import { useSnackbar } from "contexts/SnackbarContext";

const EditSupplier = (props) => {
  const { goBack } = useNavigation();
  const { supplier_id } = useParams();

  const { openSnackbar } = useSnackbar();
  const [supplier, setSupplier] = useState({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const { editSupplier, getSupplierDetails } = useSuppliers();

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
    if (name != " ") {
      await editSupplier(supplier_id, supplier, snackbar);
    } else {
      console.log("Please fill out required field");
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
    }
  };

  async function getSupplier() {
    let supplier = await getSupplierDetails(supplier_id);
    setSupplier(supplier);
    setSupplierFields(supplier);
  }

  useEffect(() => {
    getSupplier();
  }, [supplier_id]);

  return (
    <div className={styles["container"]}>
      <LeftChevron />
      <form
        className={styles["form"]}
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className={styles["form-header"]}>
          <ApartmentIcon style={{ fontSize: "40px" }} />
          <b>&nbsp; EDIT SUPPLIER</b>
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

export default EditSupplier;
