import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import Moment from "moment";

//icons
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";

//context
import { useProducts } from "contexts/ProductsContext";
import { useNavigation } from "contexts/NavigationContext";

import styles from "./ProductsTable.module.css";
import target from "api/api.target";
import img from "assets/tpc_logo.jpg";

const ProductsTable = () => {
  const { products } = useProducts();
  const { viewDetails } = useNavigation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  let result = products;
  if (searchTerm) {
    result = products.filter((product) => {
      var digits = product._id.toString();
      var supplierCodeString = product.supplier_code
        ? product.supplier_code.toString().toLowerCase()
        : undefined;
      var upcCodeString = product.upc
        ? product.upc.toString().toLowerCase()
        : undefined;

      var search = searchTerm.toLowerCase();
      // console.log(search);
      // console.log(upcCodeString);
      // console.log(supplierCodeString);
      if (digits.includes(search)) {
        return product;
      } else if (upcCodeString !== undefined) {
        if (upcCodeString.includes(search)) return true;
      } else if (supplierCodeString !== undefined) {
        if (supplierCodeString.includes(search)) return true;
      } else if (supplierCodeString !== undefined) {
        if (supplierCodeString.includes(search)) return true;
      } else if (product.description.toLowerCase().includes(search)) {
        return true;
      } else if (product.category_name !== undefined) {
        if (product.category_name.toLowerCase().includes(search)) return true;
      } else if (product.stock_qty === search) return true;
      else if (product.cost_with_tax === search) return true;
      else if (product.unit_sell_price === search) return true;
    });
  }

  return (
    <Paper style={{ marginBottom: "8rem" }}>
      <div className={styles["table-toolbar"]}>
        <h1>Products</h1>
        <div>
          <div className={styles["search-bar"]}>
            <TextField
              value={searchTerm}
              onChange={handleSearchTermChange}
              fullWidth={true}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{ color: "rgba(0, 0, 0, 0.4)" }} />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className={styles["sort"]}></div>
        </div>
      </div>
      <TableContainer className={styles["container"]}>
        <Table className={styles["table"]} aria-label="simple table">
          <TableHead className={styles["table-header"]}>
            <TableRow>
              <TableCell align="center" width="5%" />
              <TableCell align="center" width="5%">
                <b>Product Code</b>
              </TableCell>
              <TableCell align="left" width="20%">
                <b>Product Description</b>
              </TableCell>
              <TableCell align="left" width="5%">
                <b>UPC</b>
              </TableCell>
              {/* <TableCell align="left" width="15%">
                <b>Last Modified</b>
              </TableCell> */}
              <TableCell align="left" width="5%">
                <b>Quantity</b>
              </TableCell>
              <TableCell align="left" width="5%">
                <b>Unit Total Cost</b>
              </TableCell>
              <TableCell align="left" width="5%">
                <b>Unit Sell Price</b>
              </TableCell>
              <TableCell align="left" width="5%">
                <b>Category</b>
              </TableCell>
              <TableCell align="center" width="5%">
                <b>Supplier</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row["_id"]}
                  className={styles["table-row"]}
                  onClick={() =>
                    viewDetails(`products/product-details/${row["_id"]}`)
                  }
                >
                  <TableCell align="center">
                    <img
                      alt="img"
                      src={
                        row["image"] ? `${target}/images/${row["image"]}` : img
                      }
                      // src={`${target}/images/${row["image"]}`}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{row["_id"]}</TableCell>
                  <TableCell align="left">{row["description"]}</TableCell>
                  <TableCell align="left">{row["upc"]}</TableCell>
                  {/* <TableCell align="left">
                    {Moment(row["date_added"]).format("MMMM D, YYYY, HH:MM a")}
                  </TableCell>
                  <TableCell align="left">
                    {Moment(row["date_modified"]).format(
                      "MMMM D, YYYY, HH:MM a"
                    )}
                  </TableCell> */}
                  <TableCell align="left">{row["stock_qty"]}</TableCell>
                  <TableCell align="left">{row["cost_with_tax"]}</TableCell>
                  <TableCell align="left">{row["unit_sell_price"]}</TableCell>
                  <TableCell align="left">{row["category_name"]}</TableCell>
                  <TableCell align="center">{row["supplier_code"]}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 15]}
        rowsPerPage={rowsPerPage}
        count={products.length}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProductsTable;
