import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Chip,
} from "@material-ui/core";

import target from "api/api.target";

//context
import { useNavigation } from "contexts/NavigationContext";

//assets
import Logo from "assets/tpc_logo.jpg";

//components
import LeftChevron from "components/LeftChevron/LeftChevron";
import InputField from "components/InputField/InputField";
import InputArea from "components/InputArea/InputArea";

import styles from "./EditProduct.module.css";

const EditProduct = () => {
  const { goBack } = useNavigation();
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
    const getProductDetails = async () => {
      await axios
        .get(`${process.env.REACT_APP_BACKEND_API_KEY}/products/${product_id}`)
        .then((res) => {
          setImage(res.data["image"] || "");
          setListingName(res.data["list_name"] || "");
          setProductDescription(res.data["description"] || "");
          setUpc(res.data["upc"] || "");
          setSupplierCode(res.data["supplier_code"] || "");
          setFitsSize(res.data["fits_size"] || "");
          setDimensions(res.data["dimensions"] || "");
          setLowStock(res.data["low_stock"] || "");
          setOriginalCost(res.data["orig_cost"] || "");
          setOriginalCostWithTax(res.data["orig_cost_with_tax"] || "");
          setUnitSellingPrice(res.data["unit_sell_price"] || "");
          setProductNotes(res.data["product_notes"] || "");
          setPackaging(res.data["packaging"] || "");
        });
    };
    getProductDetails();
  }, [product_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
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

    axios.put(`${target}/products/${product_id}`, formData);
  };

  const handleImageFile = (event) => {
    setNewImage(event.target.files[0]);
  };

  return (
    <div className={styles["edit-product"]}>
      <LeftChevron />
      <h1 className={styles["header"]}>ADD PRODUCT</h1>
      <form
        className={styles["container"]}
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className={styles["left-inner-container"]}>
          <div className={"product-image"}>
            {newImage === "" ? (
              <img
                src={
                  image === ""
                    ? Logo
                    : `${process.env.REACT_APP_BACKEND_API_KEY}/images/${image}`
                }
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

export default EditProduct;
