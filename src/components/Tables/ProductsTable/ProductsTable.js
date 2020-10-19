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

//icons
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";

//context
import { useProducts } from "contexts/ProductsContext";

import styles from "./ProductsTable.module.css";

const ProductsTable = (props) => {
  const { products } = useProducts();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className={styles["container"]}>
      <div className={styles["table-toolbar"]}>
        <h1>Products</h1>
        <div>
          <div className={styles["search-bar"]}>
            <TextField
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
      <Table className={styles["table"]} aria-label="simple table">
        <TableHead className={styles["table-header"]}>
          <TableRow>
            <TableCell align="center" width="10%">
              <b>Product Code</b>
            </TableCell>
            <TableCell align="left" width="20%">
              <b>Product Description</b>
            </TableCell>
            <TableCell align="left" width="10%">
              <b>Date Added</b>
            </TableCell>
            <TableCell align="left" width="10%">
              <b>Last Modified</b>
            </TableCell>
            <TableCell align="left" width="10%">
              <b>Quantity</b>
            </TableCell>
            <TableCell align="left" width="10%">
              <b>Unit Total Cost</b>
            </TableCell>
            <TableCell align="left" width="10%">
              <b>Unit Sell Price</b>
            </TableCell>
            <TableCell align="left" width="10%">
              <b>Category</b>
            </TableCell>
            <TableCell align="center" width="10%">
              <b>Action</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row["_id"]}</TableCell>
                <TableCell align="left">{row["description"]}</TableCell>
                <TableCell align="left">{row["date_added"]}</TableCell>
                <TableCell align="left">{row["date_modified"]}</TableCell>
                <TableCell align="left">{row["stock_qty"]}</TableCell>
                <TableCell align="left">{row["cost_with_tax"]}</TableCell>
                <TableCell align="left">{row["unit_sell_price"]}</TableCell>
                <TableCell align="left">{row["category_name"]}</TableCell>
                <TableCell align="center">
                  <MoreVertIcon />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 15]}
        rowsPerPage={rowsPerPage}
        count={products.length}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default ProductsTable;
