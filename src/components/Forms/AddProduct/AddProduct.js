import React, { useState, useEffect } from "react";
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
  const [unitSellingPrice, setUnitSellingPrice] = useState("");
  const [originalCost, setOriginalCost] = useState("");
  const [originalCostWithTax, setOriginalCostWithTax] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [listingName, setListingName] = useState("");
  const [upc, setUpc] = useState("");
  const [supplierCode, setSupplierCode] = useState("");
  const [fitsSize, setFitsSize] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [lowStock, setLowStock] = useState("");
  const [packaging, setPackaging] = useState("");
  const [productNotes, setProductNotes] = useState("");

  //image states
  const [imageFile, setImageFile] = useState(null);

  //collection states
  const [collection, setCollection] = useState("");
  const [collections, setCollections] = useState([]);
  const [collectionsSelected, setCollectionsSelected] = useState([]);
  const [openCollection, setOpenCollection] = useState(false);

  //tag states
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [openTag, setOpenTag] = useState(false);

  const handleChangeCollection = (event) => {
    if (
      event.target.value !== "" &&
      !collectionsSelected.includes(event.target.value)
    ) {
      let temp = collectionsSelected;
      temp.push(event.target.value);
      setCollectionsSelected([...temp]);
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
    let temp = collectionsSelected;
    temp.splice(index, 1);
    setCollectionsSelected([...temp]);
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
    formData.append("list_name", listingName);
    formData.append("description", productDescription);
    formData.append("upc", upc);
    formData.append("supplier_code", supplierCode);
    formData.append("fits_size", fitsSize);
    formData.append("dimensions", dimensions);
    formData.append("low_stock", lowStock);
    formData.append("orig_cost", originalCost);
    formData.append("orig_cost_with_tax", originalCostWithTax);
    formData.append("unit_sell_price", unitSellingPrice);
    formData.append("product_notes", productNotes);
    formData.append("packaging", packaging);
    formData.append("image", imageFile);

    axios
      .post("http://localhost:8000/products/add-product", formData, {
        "content-type": "multipart/form-data",
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    // axios
    //   .post("http://httpbin.org/anything", formData)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };

  useEffect(() => {
    async function getCollections() {
      let res = await axios.get("http://localhost:8000/collections");
      setCollections(res.data);
    }
    getCollections();
  }, []);

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
          <div className={styles["product-info"]}>
            <h1 className={styles["heading"]}>Product Info</h1>
            <Grid container spacing={1} className={styles["grid"]}>
              <Grid item xs={12}>
                <InputArea
                  required={true}
                  label={"Product Description"}
                  value={productDescription}
                  setValue={setProductDescription}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  label={"Listing Name"}
                  value={listingName}
                  setValue={setListingName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField label={"UPC"} value={upc} setValue={setUpc} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  label={"Supplier Code"}
                  value={supplierCode}
                  setValue={setSupplierCode}
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
                  value={unitSellingPrice}
                  setValue={setUnitSellingPrice}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={7}>
                <InputField
                  label={"Original Cost"}
                  value={originalCost}
                  setValue={setOriginalCost}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={7}>
                <InputField
                  label={"Original Cost with Tax"}
                  value={originalCostWithTax}
                  setValue={setOriginalCostWithTax}
                  type="number"
                />
              </Grid>
            </Grid>
          </div>
          <div className={styles["product-details"]}>
            <h1 className={styles["heading"]}>Product Details</h1>
            <Grid container spacing={1} className={styles["grid"]}>
              <Grid item xs={12} sm={6}>
                <InputField
                  label={"Fits Size"}
                  value={fitsSize}
                  setValue={setFitsSize}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  label={"Dimensions"}
                  value={dimensions}
                  setValue={setDimensions}
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
                    {collections.map((item, idx) => (
                      <MenuItem key={idx} value={item["collection_name"]}>
                        {item["collection_name"]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <h6 style={{ paddingTop: "5px" }}>
                  Collection(s):
                  {collectionsSelected.map((item, idx) => (
                    <Chip
                      key={idx}
                      label={item}
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
                <InputField
                  label={"Low Stock"}
                  value={lowStock}
                  setValue={setLowStock}
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <InputArea
                  label={"Packaging"}
                  value={packaging}
                  setValue={setPackaging}
                />
              </Grid>
              <Grid item xs={12}>
                <InputArea
                  label={"Product Notes"}
                  value={productNotes}
                  setValue={setProductNotes}
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
