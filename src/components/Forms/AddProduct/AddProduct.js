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
  const [openCollection, setOpenCollection] = useState(false);

  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [openTag, setOpenTag] = useState(false);

  const handleChangeCollection = (event) => {
    if (
      event.target.value !== "" &&
      !collections.includes(event.target.value)
    ) {
      let temp = collections;
      temp.push(event.target.value);
      setCollections([...temp]);
    }
    setCollection("");
  };

  const handleChangeTag = (event) => {
    if (event.target.value !== "" && !tags.includes(event.target.value)) {
      let temp = tags;
      temp.push(event.target.value);
      setTags([...temp]);
    }
    setTag("");
  };

  const handleOpenCollection = () => {
    setOpenCollection(true);
  };

  const handleOpenTag = () => {
    setOpenTag(true);
  };

  const handleCloseCollection = () => {
    setOpenCollection(false);
  };

  const handleCloseTag = () => {
    setOpenTag(false);
  };

  const handleRemoveCollection = (index) => {
    let temp = collections;
    temp.splice(index, 1);
    setCollections([...temp]);
  };

  const handleRemoveTag = (index) => {
    let temp = tags;
    temp.splice(index, 1);
    setTags([...temp]);
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
                    Collection(s)
                  </InputLabel>
                  <Select
                    labelId="collection-label"
                    value={collection}
                    open={openCollection}
                    onChange={handleChangeCollection}
                    onOpen={handleOpenCollection}
                    onClose={handleCloseCollection}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="table">Table</MenuItem>
                    <MenuItem value="pot">Pot</MenuItem>
                  </Select>
                </FormControl>
                <h6 style={{ paddingTop: "15px" }}>
                  Collection(s):
                  {collections.map((collection, idx) => (
                    <Chip
                      key={idx}
                      label={collection}
                      onDelete={() => handleRemoveCollection(idx)}
                      className={styles["chip"]}
                    />
                  ))}
                </h6>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel
                    id="tags-label"
                    className={styles["dropdown-label"]}
                  >
                    Tag(s)
                  </InputLabel>
                  <Select
                    labelId="tags-label"
                    value={tag}
                    open={openTag}
                    onChange={handleChangeTag}
                    onOpen={handleOpenTag}
                    onClose={handleCloseTag}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="metallic">Metallic</MenuItem>
                    <MenuItem value="ceramic">Ceramic</MenuItem>
                    <MenuItem value="with stand">With Stand</MenuItem>
                  </Select>
                </FormControl>
                <h6 style={{ paddingTop: "15px" }}>
                  Tag(s):
                  {tags.map((tag, idx) => (
                    <Chip
                      key={idx}
                      label={tag}
                      onDelete={() => handleRemoveTag(idx)}
                      className={styles["chip"]}
                    />
                  ))}
                </h6>
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
