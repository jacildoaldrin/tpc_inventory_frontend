import React, { useState } from "react";

import LeftChevron from "components/LeftChevron/LeftChevron";
import target from "api/api.target";

//assets
import img from "assets/tpc_logo.jpg";

// styles
import styles from "./AddRestock.module.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import InputArea from "components/InputArea/InputArea";
import InputField from "components/InputField/InputField";
// import Autocomplete from "@material-ui/lab/Autocomplete";

// modal
// import Modal from "../../Modal/Modal";

function AddRestock() {
  //image states
  // const [products, setProducts] = useState("");
  // const [suppliers, setSuppliers] = useState("");

  const [product, setProduct] = useState("");
  const [supplier] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [modalType, setModalType] = useState(false);

  const openModalHandler = (type) => {
    setModalType(type);
    setOpenModal(true);
  };

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
          // marginTop: "20px",
          backgroundColor: "#fbfbfb",
        }}
      >
        <h1 className={styles["header"]}>ADD RESTOCK</h1>

        <form
          className={styles["container"]}
          // onSubmit={(event) => handleSubmit(event)}
        >
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
                Product ID: {product._id}
              </Typography>
              <Grid container spacing={1} className={styles["grid"]}>
                <Grid item xs={12} sm={7}>
                  <InputField required label={"Product"} />
                </Grid>
                <Grid item xs={12} sm={5} align="right">
                  <Button
                    size="large"
                    variant="contained"
                    onClick={() => openModalHandler("product")}
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
                    Supplier ID: {supplier.id}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={7}>
                  <InputField required label={"Supplier"} />
                </Grid>
                <Grid item xs={12} sm={5} align="right">
                  <Button
                    size="large"
                    variant="contained"
                    onClick={() => setOpenModal(true)}
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
                <Grid item xs={12} sm={7}>
                  <InputField
                    required
                    label={"Quantity"}
                    // value={unitSellingPrice}
                    // setValue={setUnitSellingPrice}
                    type="number"
                  />
                </Grid>

                <Grid item xs={12} sm={7}>
                  <InputField
                    required
                    label={"Unit Cost"}
                    // value={unitSellingPrice}
                    // setValue={setUnitSellingPrice}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} sm={7}>
                  <InputField
                    label={"Cost with Tax"}
                    // value={originalCost}
                    // setValue={setOriginalCost}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} sm={7}>
                  <InputField
                    required
                    label={"Total Cost"}
                    // value={originalCostWithTax}
                    // setValue={setOriginalCostWithTax}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} sm={7}>
                  <InputArea
                    label={"Notes"}
                    // value={originalCostWithTax}
                    // setValue={setOriginalCostWithTax}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} sm={7} align="right">
                  <Button size="large" variant="contained">
                    CONFIRM
                  </Button>
                </Grid>
                <Grid item xs={12} sm={7} align="right">
                  <Button size="large" variant="contained">
                    CANCEL
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </form>
      </Paper>

      {/* <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        dialogTitle="ARE YOU SURE?"
        dialogContentText={`
        You are about to delete ${
          modalType === "product" ? "Product" : "Supplier"
        }`}
        custom="restock"
        onClose={() => setOpenModal(false)}
      >
        <Button onClick={() => setOpenModal(false)} size="large">
          Cancel
        </Button>
        <Button
          size="large"
          variant="contained"
        >
          CONFIRM
        </Button>
      </Modal> */}

      <Dialog
        // style={{ maxWidth: "700px", maxHeight: "800px" }}
        fullWidth="true"
        maxWidth="sm"
        open={openModal}
        onClose={() => setOpenModal(false)}
        // open={openModal}
      >
        <DialogTitle>{modalType}</DialogTitle>
        <DialogContent style={{ overflow: "hidden" }}>
          <DialogContentText>
            {/* <img
              src={product.image ? `${target}/images/${product.image}` : img}
              className={styles["img"]}
              alt="product"
            /> */}
            <InputField required label={"Product"} value={product} />

            <TableContainer
              // style={{ maxHeight: "700px" }}
              style={{ maxHeight: "350px" }}
              className={styles["container"]}
            >
              <Table
                // className={styles["table"]}
                aria-label="simple table"
                // size="small"
                // stickyHeader
              >
                <TableHead className={styles["table-header"]}>
                  {/* <TableRow>
                    <TableCell align="center" width="1%" />
                    <TableCell align="left" width="19%">
                      <InputField required label={"Product"} value={product} />
                    </TableCell>
                  </TableRow> */}
                </TableHead>
                <TableBody>
                  {[
                    { _id: 1, description: "item-1" },
                    { _id: 2, description: "item-2" },
                    { _id: 3, description: "item-3" },
                    { _id: 4, description: "item-4" },
                    { _id: 5, description: "item-5" },
                    { _id: 6, description: "item-6" },
                    { _id: 13, description: "item-1" },
                    { _id: 14, description: "item-1" },
                    { _id: 15, description: "item-1" },
                    { _id: 16, description: "item-1" },
                    { _id: 23, description: "item-1" },
                    { _id: 24, description: "item-1" },
                    { _id: 25, description: "item-1" },
                    { _id: 26, description: "item-1" },
                  ]?.map((row) => (
                    <TableRow
                      key={row["_id"]}
                      className={styles["table-row"]}
                      onClick={() => {
                        setProduct(row["_id"]);
                      }}
                    >
                      <TableCell align="center">
                        <img
                          alt="img"
                          src={
                            row["image"]
                              ? `${target}/images/${row["image"]}`
                              : img
                          }
                          // src={`${target}/images/${row["image"]}`}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        />
                      </TableCell>
                      <TableCell align="left">{row["description"]}</TableCell>
                      {/* <TableCell align="center">{row["_id"]}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)} size="large">
              Cancel
            </Button>
            <Button size="large" variant="contained">
              CONFIRM
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddRestock;
