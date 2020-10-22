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

const ProductsTable = () => {
  const { products } = useProducts();
  const { viewDetails } = useNavigation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangePage = (newPage) => {
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
    result = products.filter((product) =>
      product.description.toLowerCase().includes(searchTerm)
    );
  }

  return (
    <TableContainer component={Paper} className={styles["container"]}>
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
      <Table className={styles["table"]} aria-label="simple table">
        <TableHead className={styles["table-header"]}>
          <TableRow>
            <TableCell align="center" width="10%">
              <b>Product Code</b>
            </TableCell>
            <TableCell align="left" width="20%">
              <b>Product Description</b>
            </TableCell>
            <TableCell align="left" width="15%">
              <b>Date Added</b>
            </TableCell>
            <TableCell align="left" width="15%">
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
            <TableCell align="left" width="5%">
              <b>Category</b>
            </TableCell>
            <TableCell align="center" width="5%">
              <b>Action</b>
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
                <TableCell align="center">{row["_id"]}</TableCell>
                <TableCell align="left">{row["description"]}</TableCell>
                <TableCell align="left">
                  {Moment(row["date_added"]).format("MMMM Do, YYYY, h:MM a")}
                </TableCell>
                <TableCell align="left">
                  {Moment(row["date_modified"]).format("MMMM Do, YYYY, h:MM a")}
                </TableCell>
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
