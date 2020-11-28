import React, { useEffect, useState } from "react";
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
  IconButton,
} from "@material-ui/core";

// themes
import useStyles from "../tableThemes";

//icons
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

//context
import { useProducts } from "contexts/ProductsContext";
import { useNavigation } from "contexts/NavigationContext";

import styles from "./ProductsTable.module.css";
import target from "api/api.target";
import img from "assets/tpc_logo.jpg";

const ProductsTable = () => {
  const classes = useStyles();
  const { products, page, setPage, rowsPerPage, setRowsPerPage } = useProducts();
  const { viewDetails } = useNavigation();
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    var term = localStorage.getItem("searchProdTerm");
    setSearchTerm(term);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleSearchTermChange = (event) => {
    if (page !== 0) setPage(0);
    setSearchTerm(event.target.value);
    localStorage.setItem("searchProdTerm", event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    localStorage.setItem("searchProdTerm", "");
  };

  let result = products;
  if (searchTerm) {
    result = products.filter((product) => {
      var digits = product._id.toString();
      var search = searchTerm.toLowerCase();
      if (digits?.includes(search)) {
        return true;
      } else if (product.upc?.toString().toLowerCase().includes(search)) {
        return true;
      } else if (
        product.supplier_code?.toString().toLowerCase().includes(search)
      ) {
        return true;
      } else if (product.description?.toLowerCase().includes(search)) {
        return true;
      } else if (product.category_name?.toLowerCase().includes(search)) {
        return true;
      } else if (product.list_name?.toLowerCase().includes(search)) {
        return true;
      } else if (product.stock_qty === search) return true;
      else if (product.cost_with_tax === search) return true;
      else if (product.unit_sell_price === search) return true;
      return false;
    });
  }

  return (
    <Paper style={{ marginBottom: "8rem" }}>
      <div className={styles["table-toolbar"]}>
        <h1>Products</h1>
        <div>
          <div className={styles["search-bar"]}>
            <TextField
              placeholder="search"
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
            <IconButton
              size="small"
              className={classes.margin}
              onClick={clearSearch}
            >
              <ClearIcon fontSize="inherit" />
            </IconButton>
          </div>
          <div className={styles["sort"]}></div>
        </div>
      </div>
      <TableContainer className={styles["container"]}>
        <Table
          className={styles["table"]}
          aria-label="simple table"
          size="small"
        >
          <TableHead className={styles["table-header"]}>
            <TableRow>
              <TableCell align="center" width="5%" />
              <TableCell align="left" width="30%">
                <b>Product Description</b>
              </TableCell>
              <TableCell align="center" width="15%">
                <b>Product Code</b>
              </TableCell>
              <TableCell align="center" width="20%">
                <b>UPC</b>
              </TableCell>
              <TableCell align="center" width="20%">
                <b>Supplier Code</b>
              </TableCell>
              {/* <TableCell align="left" width="5%">
                <b>Quantity</b>
              </TableCell>
              <TableCell align="left" width="5%">
                <b>Unit Sell Price</b>
              </TableCell>
              <TableCell align="left" width="5%">
                <b>Category</b>
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {result
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row["_id"]}
                  className={styles["table-row"]}
                  onClick={() => {
                    localStorage.setItem("searchTerm", searchTerm);
                    viewDetails(`products/product-details/${row["_id"]}`);
                  }}
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
                  <TableCell align="left">{row["description"]}</TableCell>
                  <TableCell align="center">{row["_id"]}</TableCell>
                  <TableCell align="center">{row["upc"]}</TableCell>
                  <TableCell align="center">{row["supplier_code"]}</TableCell>
                  {/* <TableCell align="left">
                    {Moment(row["date_modified"]).format(
                      "MMMM D, YYYY, HH:MM a"
                    )}
                  </TableCell> */}
                  {/* <TableCell align="left">{row["stock_qty"]}</TableCell>
                  <TableCell align="left">{row["unit_sell_price"]}</TableCell>
                  <TableCell align="left">{row["category_name"]}</TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 15, 100]}
        rowsPerPage={rowsPerPage}
        count={result.length}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProductsTable;
