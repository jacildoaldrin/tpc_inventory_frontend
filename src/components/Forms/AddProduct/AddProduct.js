import React, { useState } from "react";
import axios from "axios";
import {
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

//component
import InputField from "components/InputField/InputField";
import InputArea from "components/InputArea/InputArea";

//assets

import styles from "./AddProduct.module.css";

const AddProduct = () => {
  const { goBack } = useNavigation();

  //image states
  const [imageFile, setImageFile] = useState(null);

  //collection states
  const [collection, setCollection] = useState("");
  const [collections, setCollections] = useState([]);
  const [openCollection, setOpenCollection] = useState(false);

  //tag states
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

  const handleOpenCollection = () => {
    setOpenCollection(true);
  };

  const handleCloseCollection = () => {
    setOpenCollection(false);
  };

  const handleRemoveCollection = (index) => {
    let temp = collections;
    temp.splice(index, 1);
    setCollections([...temp]);
  };

  const handleChangeTag = (event) => {
    if (event.target.value !== "" && !tags.includes(event.target.value)) {
      let temp = tags;
      temp.push(event.target.value);
      setTags([...temp]);
    }
    setTag("");
  };

  const handleOpenTag = () => {
    setOpenTag(true);
  };

  const handleCloseTag = () => {
    setOpenTag(false);
  };

  const handleRemoveTag = (index) => {
    let temp = tags;
    temp.splice(index, 1);
    setTags([...temp]);
  };

  const handleImageFile = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("product_description", "testing");
    formData.append("order_price", "12.22");
    formData.append("sell_price", "24.44");

    formData.append("image", imageFile);
    axios
      .post("http://localhost:8000/products/add-product", formData, {
        "content-type": "multipart/form-data",
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles["add-product"]}>
      <LeftChevron />
      <h1 className={styles["header"]}>ADD PRODUCT</h1>
      <form
        className={styles["container"]}
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className={styles["left-inner-container"]}>
          <div className={"product-image"}>
            {imageFile !== null ? (
              <img
                src={URL.createObjectURL(imageFile)}
                className={styles["image"]}
                alt="preview"
              />
            ) : null}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(event) => handleImageFile(event)}
            />
          </div>
          <div className={styles["product-price"]}>
            <h1 className={styles["heading"]}>Product Price</h1>
            <Grid container spacing={1} className={styles["grid"]}>
              <Grid item xs={12} sm={7}>
                <InputField label={"Unit Selling Price"} />
              </Grid>
              <Grid item xs={12} sm={7}>
                <InputField label={"Original Cost"} />
              </Grid>
              <Grid item xs={12} sm={7}>
                <InputField label={"Original Cost with Tax"} />
              </Grid>
            </Grid>
          </div>
        </div>
        <div className={styles["right-inner-container"]}>
          <div className={styles["product-info"]}>
            <h1 className={styles["heading"]}>Product Info</h1>
            <Grid container spacing={1} className={styles["grid"]}>
              <Grid item xs={12}>
                <InputArea label={"Product Description"} />
              </Grid>
              <Grid item xs={12}>
                <InputField label={"Listing Name"} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField label={"UPC"} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField label={"Supplier Code"} />
              </Grid>
            </Grid>
          </div>
          <div className={styles["product-details"]}>
            <h1 className={styles["heading"]}>Product Details</h1>
            <Grid container spacing={1} className={styles["grid"]}>
              <Grid item xs={12} sm={6}>
                <InputField label={"Fits Size"} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField label={"Dimensions"} />
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
                <h6 style={{ paddingTop: "5px" }}>
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
                <h6 style={{ paddingTop: "5px" }}>
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
                <InputField label={"Low Stock"} />
              </Grid>
              <Grid item xs={12}>
                <InputArea label={"Packaging"} />
              </Grid>
              <Grid item xs={12}>
                <InputArea label={"Product Notes"} />
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
