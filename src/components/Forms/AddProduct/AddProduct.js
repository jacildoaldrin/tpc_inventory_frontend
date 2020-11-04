import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Chip,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import LeftChevron from "components/LeftChevron/LeftChevron";

//context
import { useNavigation } from "contexts/NavigationContext";
import { useProducts } from "contexts/ProductsContext";
import { useSnackbar } from "contexts/SnackbarContext";

//component
import InputField from "components/InputField/InputField";
import InputArea from "components/InputArea/InputArea";

//assets
import ImagePlaceHolder from "assets/tpc_logo.jpg";

import styles from "./AddProduct.module.css";
import Autocomplete from "@material-ui/lab/Autocomplete";

const AddProduct = () => {
  const { goBack } = useNavigation();
  const { addProduct, getCollections, getTags } = useProducts();
  const { openSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  const [imageFile, setImageFile] = useState("");

  //collection states
  const [collections, setCollections] = useState([]);
  const [collectionList, setCollectionList] = useState([]);

  //tag states
  const [tags, setTags] = useState([]);
  const [tagList, setTagList] = useState([]);

  const pushTag = () => {
    if (document.getElementById("tagInput").value !== "")
      setTags([
        ...new Set([...tags, document.getElementById("tagInput").value]),
      ]);
    document.getElementById("tagInput").value = "";
  };

  const pushCollection = () => {
    if (document.getElementById("collectionInput").value !== "")
      setCollections([
        ...new Set([
          ...collections,
          document.getElementById("collectionInput").value,
        ]),
      ]);
    document.getElementById("collectionInput").value = "";
  };

  const handleImageFile = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("list_name", listingName);
    formData.append("description", productDescription);
    formData.append("upc", upc);
    formData.append("supplier_code", supplierCode);
    formData.append("fits_size", fitsSize);
    formData.append("dimensions", dimensions);
    formData.append("product_notes", productNotes);
    formData.append("packaging", packaging);

    formData.append("low_stock", lowStock === "" ? 0 : lowStock);
    formData.append("orig_cost", originalCost === "" ? 0 : originalCost);
    formData.append(
      "orig_cost_with_tax",
      originalCostWithTax === "" ? 0 : originalCostWithTax
    );
    tags.map((tag) => formData.append("tags[]", tag));
    collections.map((collection) =>
      formData.append("collections[]", collection)
    );

    formData.append(
      "unit_sell_price",
      unitSellingPrice === "" ? 0 : unitSellingPrice
    );
    formData.append("image", imageFile);
    await addProduct(formData, callBack);
    setIsSubmitting(false);
  };

  const callBack = () => {
    openSnackbar("Successfully added a new product!");
    goBack();
  };

  useEffect(() => {
    (async () => {
      setCollectionList(await getCollections());
      setTagList(await getTags());
    })();
  }, [getCollections, getTags]);

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
            <img
              src={
                imageFile !== ""
                  ? URL.createObjectURL(imageFile)
                  : ImagePlaceHolder
              }
              className={styles["image"]}
              alt="preview"
            />
            <input
              className={styles["image-input"]}
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
                  required
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
              <Grid container item xs={12} alignItems="center">
                <Grid item xs={6}>
                  <Autocomplete
                    id="tagInput"
                    options={tagList}
                    clearOnBlur={false}
                    clearOnEscape={true}
                    getOptionLabel={(eachTag) => eachTag.tag_name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="tagInput2"
                        label="Tag(s)"
                        variant="outlined"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            pushTag();
                            e.preventDefault();
                          }
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={4}>
                  <Button onClick={pushTag} variant="contained">
                    Add Tag
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <h6 style={{ paddingTop: "5px" }}>
                    Tag(s):
                    {tags.map((item, idx) => (
                      <Chip
                        key={idx}
                        label={item}
                        onDelete={() =>
                          setTags(tags.filter((tag) => tag !== item))
                        }
                        className={styles["chip"]}
                      />
                    ))}
                  </h6>
                </Grid>
              </Grid>
              <Grid container item xs={12} alignItems="center">
                <Grid item xs={6}>
                  <Autocomplete
                    id="collectionInput"
                    options={collectionList}
                    clearOnBlur={false}
                    clearOnEscape={true}
                    getOptionLabel={(eachTag) => eachTag.collection_name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Collection(s)"
                        variant="outlined"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            pushCollection();
                            e.preventDefault();
                          }
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={5}>
                  <Button onClick={pushCollection} variant="contained">
                    Add Collection
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <h6 style={{ paddingTop: "5px" }}>
                    Collection(s):
                    {collections.map((item, idx) => (
                      <Chip
                        key={idx}
                        label={item}
                        onDelete={() => {
                          // console.log('del')
                          setCollections([
                            ...collections.filter(
                              (collection) => collection !== item
                            ),
                          ]);
                        }}
                        className={styles["chip"]}
                      />
                    ))}
                  </h6>
                </Grid>
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
            <Button
              type="submit"
              disabled={isSubmitting}
              size="large"
              variant="contained"
              style={{ minWidth: "200px" }}
            >
              {isSubmitting ? <CircularProgress size={16} /> : "ADD"}
            </Button>
            <Button
              type="button"
              size="large"
              variant="contained"
              style={{ minWidth: "200px" }}
              onClick={() => goBack()}
            >
              CANCEL
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
