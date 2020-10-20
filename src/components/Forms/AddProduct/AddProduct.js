import React, { useState } from "react";
import {
  TextField,
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Chip,
} from "@material-ui/core";
import LeftChevron from "components/LeftChevron/LeftChevron";

//context
import { useNavigation } from "contexts/NavigationContext";

//assets
import Hugo from "assets/hugo.jpg";

import styles from "./AddProduct.module.css";

const AddProduct = () => {
  const { goBack } = useNavigation();
  const [collection, setCollection] = useState("");
  const [collections, setCollections] = useState([]);
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setCollection(event.target.value);
    if (
      event.target.value !== "" &&
      !collections.includes(event.target.value)
    ) {
      let temp = collections;
      temp.push(event.target.value);
      setCollections([...temp]);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveCollection = (index) => {
    let temp = collections;
    temp.splice(index, 1);
    setCollections([...temp]);
  };

  return (
    <div className={styles["add-product"]}>
      <LeftChevron />
      <h1 className={styles["header"]}>ADD PRODUCT</h1>
      <form className={styles["container"]}>
        <div className={styles["left-inner-container"]}>
          <img src={Hugo} alt="sample-item" className={styles["image"]} />
          <div className={styles["product-price"]}>
            <h1 className={styles["heading"]}>Product Price</h1>
            <Grid container spacing={1} className={styles["grid"]}>
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
            <Grid container spacing={1} className={styles["grid"]}>
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
            <Grid container spacing={1} className={styles["grid"]}>
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
                <FormControl fullWidth variant="outlined">
                  <InputLabel
                    id="collection-label"
                    className={styles["dropdown-label"]}
                  >
                    Collection
                  </InputLabel>
                  <Select
                    labelId="collection-label"
                    value={collection}
                    open={open}
                    onChange={handleChange}
                    onOpen={handleOpen}
                    onClose={handleClose}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="table">Table</MenuItem>
                    <MenuItem value="pot">Pot</MenuItem>
                  </Select>
                </FormControl>
                <h6>
                  Collection(s):{" "}
                  {collections.map((collection, idx) => (
                    <Chip
                      key={idx}
                      label={collection}
                      onDelete={() => handleRemoveCollection(idx)}
                    />
                  ))}
                </h6>
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
            <button className={styles["button"]}>Submit</button>
            <button className={styles["button"]} onClick={() => goBack()}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
