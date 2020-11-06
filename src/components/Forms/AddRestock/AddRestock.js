import React, { useState } from "react";

import LeftChevron from "components/LeftChevron/LeftChevron";

//assets
import ImagePlaceHolder from "assets/tpc_logo.jpg";

// styles
import styles from "./AddRestock.module.css";
import { Grid, Paper } from "@material-ui/core";
import InputArea from "components/InputArea/InputArea";
import InputField from "components/InputField/InputField";

function AddRestock() {
  //image states
  const [imageFile] = useState("");

  // const handleImageFile = (event) => {
  //   setImageFile(event.target.files[0]);
  // };

  return (
    <div className={styles["add-restock"]}>
      <LeftChevron />
      <Paper elevation={3} style={{ backgroundColor: "#fbfbfb" }}>
        <h1 className={styles["header"]}>ADD RESTOCK</h1>

        <form
          className={styles["container"]}
          // onSubmit={(event) => handleSubmit(event)}
        >
          <div className={styles["left-inner-container"]}>
            <div className={"product-image"}>
              <img
                src={
                  imageFile !== ""
                    ? URL.createObjectURL(imageFile)
                    : ImagePlaceHolder
                }
                className={styles["image"]}
                alt="preview"
              />
              {/* <input
                className={styles["image-input"]}
                type="file"
                name="image"
                accept="image/*"
                onChange={(event) => handleImageFile(event)}
              /> */}
              {/* <input>dropdown search</input> */}
              <div className={styles["product-info"]}>
                <h1 className={styles["heading"]}>Product Info</h1>
                <Grid container spacing={1} className={styles["grid"]}>
                  <Grid item xs={12}>
                    <InputArea
                      required
                      label={"Product Description"}
                      // value={productDescription}
                      // setValue={setProductDescription}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      label={"Listing Name"}
                      // value={listingName}
                      // setValue={setListingName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputField
                      label={"Supplier Code"}
                      // value={supplierCode}
                      // setValue={setSupplierCode}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>

            <div className={styles["right-inner-container"]}>
              <div className={styles["product-price"]}>
                <h1 className={styles["heading"]}>Product Price</h1>
                <Grid container spacing={1} className={styles["grid"]}>
                  <Grid item xs={12} sm={7}>
                    <InputField
                      label={"Unit Selling Price"}
                      // value={unitSellingPrice}
                      // setValue={setUnitSellingPrice}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <InputField
                      label={"Original Cost"}
                      // value={originalCost}
                      // setValue={setOriginalCost}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <InputField
                      label={"Original Cost with Tax"}
                      // value={originalCostWithTax}
                      // setValue={setOriginalCostWithTax}
                      type="number"
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </form>
      </Paper>
    </div>
  );
}

export default AddRestock;
