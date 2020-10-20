import React from "react";
import { TextField, Grid } from "@material-ui/core";
import LeftChevron from "components/LeftChevron/LeftChevron";

//context
import { useNavigation } from "contexts/NavigationContext";

//assets
import Hugo from "assets/hugo.jpg";

import styles from "./AddProduct.module.css";

const AddProduct = (props) => {
  const { goBack } = useNavigation();
  return (
    <div className={styles["add-product"]}>
      <LeftChevron />
      <h1 className={styles["header"]}>ADD PRODUCT</h1>
      <form className={styles["container"]}>
        <div className={styles["left-inner-container"]}>
          <img src={Hugo} alt="sample-item" className={styles["image"]} />
          <div className={styles["product-price"]}>
            <h1 className={styles["heading"]}>Product Price</h1>
            <Grid container spacing={1} className={styles['grid']}>
              <Grid item xs={12} sm={7}>
                <TextField
                  required
                  variant="outlined"
                  label="Unit Selling Price"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  required
                  variant="outlined"
                  label="Original Cost"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  required
                  variant="outlined"
                  label="Original Cost with Tax"
                  fullWidth
                />
              </Grid>
            </Grid>
          </div>
        </div>
        <div className={styles["right-inner-container"]}>
          <div className={styles["product-info"]}>
            <h1 className={styles["heading"]}>Product Info</h1>
            <Grid container spacing={1} className={styles['grid']}>
              <Grid item xs={12}>
                <TextField
                  required
                  variant="outlined"
                  multiline
                  rows="2"
                  label="Product Description"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  variant="outlined"
                  label="Listing Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required variant="outlined" label="UPC" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  variant="outlined"
                  label="Supplier Code"
                  fullWidth
                />
              </Grid>
            </Grid>
          </div>
          <div className={styles["product-details"]}>
            <h1 className={styles["heading"]}>Product Details</h1>
            <Grid container spacing={1} className={styles['grid']}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  variant="outlined"
                  label="Fits Size"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  variant="outlined"
                  label="Dimensions"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  variant="outlined"
                  label="Collection"
                  fullWidth
                />
                <h6>Collection(s): </h6>
              </Grid>
              <Grid item xs={12}>
                <TextField required variant="outlined" label="Tags" fullWidth />
                <h6>Tag(s): </h6>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  variant="outlined"
                  label="Low Stock"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  multiline
                  rows="2"
                  variant="outlined"
                  label="Packaging"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  multiline
                  rows="2"
                  variant="outlined"
                  label="Product Notes"
                  fullWidth
                />
              </Grid>
            </Grid>
          </div>
          <div className={styles["buttons"]}>
            <button className={styles["submit-button"]}>Submit</button>
            <button
              className={styles["cancel-button"]}
              onClick={() => goBack()}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
