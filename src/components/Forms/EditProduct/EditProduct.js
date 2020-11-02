import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Grid,
  CircularProgress,
} from "@material-ui/core";

import target from "api/api.target";

//context
import { useNavigation } from "contexts/NavigationContext";
import { useProducts } from "contexts/ProductsContext";
import { useSnackbar } from "contexts/SnackbarContext";

//assets
import Logo from "assets/tpc_logo.jpg";

//components
import LeftChevron from "components/LeftChevron/LeftChevron";
import InputField from "components/InputField/InputField";
import InputArea from "components/InputArea/InputArea";

import styles from "./EditProduct.module.css";

const EditProduct = () => {
  const { goBack } = useNavigation();
  const { getProductDetails, editProduct } = useProducts();
  const { openSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { product_id } = useParams();
  const [image, setImage] = useState("");
  const [newImage, setNewImage] = useState("");
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

  useEffect(() => {
    const getProduct = async () => {
      let product = await getProductDetails(product_id);
      setImage(product["image"] || "");
      setListingName(product["list_name"] || "");
      setProductDescription(product["description"] || "");
      setUpc(product["upc"] || "");
      setSupplierCode(product["supplier_code"] || "");
      setFitsSize(product["fits_size"] || "");
      setDimensions(product["dimensions"] || "");
      setLowStock(product["low_stock"] || "");
      setOriginalCost(product["orig_cost"] || "");
      setOriginalCostWithTax(product["orig_cost_with_tax"] || "");
      setUnitSellingPrice(product["unit_sell_price"] || "");
      setProductNotes(product["product_notes"] || "");
      setPackaging(product["packaging"] || "");
    };
    getProduct();
  }, [product_id, getProductDetails]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    let formData = new FormData();
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
    formData.append(
      "unit_sell_price",
      unitSellingPrice === "" ? 0 : unitSellingPrice
    );
    formData.append("image", image);
    if (newImage !== "") {
      formData.append("newImage", newImage);
    }
    await editProduct(product_id, formData, callBack);
    setIsSubmitting(false);
  };

  const handleImageFile = (event) => {
    setNewImage(event.target.files[0]);
  };

  const callBack = () => {
    openSnackbar("Successfully edited product!!");
    goBack();
  };

  return (
    <div className={styles["edit-product"]}>
      <LeftChevron />
      <h1 className={styles["header"]}>EDIT PRODUCT</h1>
      <form
        className={styles["container"]}
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className={styles["left-inner-container"]}>
          <div className={"product-image"}>
            {!newImage ? (
              <img
                src={image === "" ? Logo : `${target}/images/${image}`}
                className={styles["image"]}
                alt={image}
              />
            ) : (
              <img
                src={URL.createObjectURL(newImage)}
                alt="new"
                className={styles["image"]}
              />
            )}
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
              {/* <Grid item xs={12}>
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
              </Grid> */}
              {/* <Grid item xs={12}>
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
              </Grid> */}
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
            <Button type="submit" disabled={isSubmitting} size="large" variant="contained" style={{minWidth: "200px"}}>
              {isSubmitting ? <CircularProgress size={16} /> : "SAVE"}
            </Button>
            <Button type="button" size="large" variant="contained" style={{minWidth: "200px"}} onClick={() => goBack()}>
              CANCEL
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
