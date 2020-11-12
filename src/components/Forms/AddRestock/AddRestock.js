import React, { useState, useEffect } from "react";

import LeftChevron from "components/LeftChevron/LeftChevron";
import target from "api/api.target";

//assets
import img from "assets/tpc_logo.jpg";

// styles
import styles from "./AddRestock.module.css";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import InputArea from "components/InputArea/InputArea";
import InputField from "components/InputField/InputField";

// navigation
import { useNavigation } from "contexts/NavigationContext";

// products context
import { useProducts } from "contexts/ProductsContext";
import { useSuppliers } from "contexts/SuppliersContext";
import ModalProducts from "components/Modal/ModalProducts";
import ModalSuppliers from "components/Modal/ModalSuppliers";
import Axios from "axios";
import { useRestocks } from "contexts/RestocksContext";
import { useSnackbar } from "contexts/SnackbarContext";

function AddRestock() {
  const { addRestock } = useRestocks();
  const { openSnackbar } = useSnackbar();

  const { products } = useProducts();
  const { suppliers } = useSuppliers();
  const { goBack } = useNavigation();
  const [openModalProducts, setOpenModalProducts] = useState(false);
  const [openModalSuppliers, setOpenModalSuppliers] = useState(false);

  // restock form
  const [product, setProduct] = useState("");
  const [supplier, setSupplier] = useState("");
  const [unitCost, setUnitCost] = useState("");
  const [quantity, setQuantity] = useState("");
  const [costWithTax, setCostWithTax] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [notes, setNotes] = useState("");
  const [validForm, setValidForm] = useState(false);

  const submitRestockHandler = () => {
    var restockData = {
      product_id: parseInt(product._id),
      supplier_id: parseInt(supplier.id),
      quantity: parseInt(quantity),
      unit_cost: parseFloat(unitCost),
      cost_with_tax: parseFloat(costWithTax),
      total_cost: parseFloat(totalCost),
      notes: notes,
    };

    if (validForm) {
      addRestock(restockData, callBack);
    }
  };

  const callBack = () => {
    openSnackbar("Successfully added a new restock!");
    goBack();
  };

  // const addRestock = async (formdata) => {
  //   try {
  //     await Axios.post(`${target}/restocks`, formdata).then((res) =>
  //       console.log(res.data)
  //     );
  //   } catch (err) {
  //     console.log(err);
  //     return;
  //   }
  // };

  useEffect(() => {
    const onValueChange = () => {
      let calcWithTax = 0;
      let totalC = 0;

      if (unitCost > 0 && quantity > 0) {
        let tax = parseFloat(unitCost) * parseFloat(0.15);
        calcWithTax = parseFloat(unitCost) + tax;
        totalC = parseInt(quantity) * calcWithTax;
        setTotalCost(totalC);
        setCostWithTax(calcWithTax);
      }
      return;
    };

    onValueChange();
  }, [unitCost, quantity]);

  useEffect(() => {
    const onFormCheck = () => {
      if (product._id && supplier.id && unitCost > 0 && quantity > 0)
        setValidForm(true);
    };
    onFormCheck();
  }, [product, supplier, unitCost, quantity]);

  return (
    <div
      style={{
        marginTop: "20px",
      }}
      className={styles["add-restock"]}
    >
      <LeftChevron />
      <Paper
        elevation={3}
        style={{
          padding: "20px 10px",
          backgroundColor: "#fbfbfb",
        }}
      >
        <h1 className={styles["header"]}>ADD RESTOCK</h1>

        <form className={styles["container"]}>
          <div className={styles["left-inner-container"]}>
            <div className={"product-image"}>
              <img
                src={product.image ? `${target}/images/${product.image}` : img}
                className={styles["img"]}
                alt="product"
              />
              <h1 className={styles["heading"]}>Product</h1>
              <Typography
                variant="h6"
                align="left"
                style={{ paddingTop: "10px" }}
              >
                Product ID: {product?._id}
              </Typography>
              <Grid container spacing={1} className={styles["grid"]}>
                <Grid item xs={12} sm={7}>
                  <Typography
                    variant="h6"
                    align="left"
                    style={{ paddingTop: "10px" }}
                  >
                    Description: {product?.description}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={5} align="right">
                  <Button
                    size="large"
                    variant="contained"
                    onClick={() => setOpenModalProducts(true)}
                  >
                    Chooose Product
                  </Button>
                </Grid>
                <h1 className={styles["heading"]}>Supplier</h1>

                <Grid item xs={12} sm={12}>
                  <Typography
                    variant="h6"
                    align="left"
                    style={{ paddingTop: "10px" }}
                  >
                    Product Code: {supplier?.id}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={7}>
                  <Typography
                    variant="h6"
                    align="left"
                    style={{ paddingTop: "10px" }}
                  >
                    Name: {supplier?.supplier_name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={5} align="right">
                  <Button
                    size="large"
                    variant="contained"
                    onClick={() => {
                      setOpenModalSuppliers(true);
                    }}
                  >
                    Choose Supplier
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
          <div className={styles["right-inner-container"]}>
            <div className={styles["product-price"]}>
              <Grid container spacing={1} className={styles["grid"]}>
                <h1 className={styles["heading"]}>Costs</h1>

                <Grid item xs={12} sm={6} style={{ paddingTop: "20px" }}>
                  <InputField
                    required
                    label={"Unit Cost"}
                    value={unitCost}
                    setValue={setUnitCost}
                    type="number"
                  />
                </Grid>
                <Grid
                  style={{ padding: "20px 10px" }}
                  item
                  xs={12}
                  sm={6}
                  container
                  justify="space-between"
                >
                  <Typography>Cost with Tax:</Typography>
                  <Typography>$ {costWithTax}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputField
                    required
                    label={"Quantity"}
                    value={quantity}
                    setValue={setQuantity}
                    type="number"
                  />
                </Grid>
                <Grid
                  style={{ padding: "20px 10px" }}
                  item
                  xs={12}
                  sm={6}
                  container
                  justify="space-between"
                >
                  <Typography>Total Cost:</Typography>
                  <Typography>$ {totalCost}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <InputArea
                    label={"Notes"}
                    value={notes}
                    setValue={setNotes}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6} align="center">
                  <Button
                    disabled={validForm ? false : true}
                    size="large"
                    variant="contained"
                    onClick={() => submitRestockHandler()}
                  >
                    CONFIRM
                  </Button>
                </Grid>
                <Grid item xs={6} align="center">
                  <Button
                    size="large"
                    variant="contained"
                    onClick={() => goBack()}
                  >
                    CANCEL
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </form>
      </Paper>

      <ModalProducts
        openModal={openModalProducts}
        setOpenModal={setOpenModalProducts}
        products={products}
        product={product}
        setProduct={setProduct}
        target={target}
      />

      <ModalSuppliers
        openModal={openModalSuppliers}
        setOpenModal={setOpenModalSuppliers}
        suppliers={suppliers}
        supplier={supplier}
        setSupplier={setSupplier}
        target={target}
      />
    </div>
  );
}

export default AddRestock;
