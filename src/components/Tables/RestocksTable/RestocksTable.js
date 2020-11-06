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
import { useRestocks } from "contexts/RestocksContext";
import { useNavigation } from "contexts/NavigationContext";

import styles from "./RestocksTable.module.css";

const RestocksTable = () => {
  const classes = useStyles();
  const { restocks } = useRestocks();
  const { viewDetails } = useNavigation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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

  let result = restocks;
  // if (searchTerm) {
  //   result = restocks.filter((restock) => {
  //     var digits = restock.product_id.toString();
  //     var search = searchTerm.toLowerCase();
  //     if (digits?.includes(search)) {
  //       return true;
  //     } else if (restock.upc?.toString().toLowerCase().includes(search)) {
  //       return true;
  //     } else if (
  //       restock.supplier_code?.toString().toLowerCase().includes(search)
  //     ) {
  //       return true;
  //     } else if (restock.description?.toLowerCase().includes(search)) {
  //       return true;
  //     } else if (restock.category_name?.toLowerCase().includes(search)) {
  //       return true;
  //     } else if (restock.stock_qty === search) return true;
  //     else if (restock.cost_with_tax === search) return true;
  //     else if (restock.unit_sell_price === search) return true;
  //     return false;
  //   });
  // }

  return (
    <Paper style={{ marginBottom: "8rem" }}>
      <div className={styles["table-toolbar"]}>
        <h1>Restocks</h1>
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
              <TableCell align="left" width="10%">
                <b>Product ID</b>
              </TableCell>
              <TableCell align="center" width="15%">
                <b>Date</b>
              </TableCell>
              <TableCell align="center" width="10%">
                <b>Quantity</b>
              </TableCell>
              <TableCell align="center" width="10%">
                <b>Unit Cost</b>
              </TableCell>
              <TableCell align="center" width="10%">
                <b>Cost w/ Tax</b>
              </TableCell>
              <TableCell align="center" width="10%">
                <b>Total Cost</b>
              </TableCell>
              <TableCell align="center" width="10%">
                <b>Notes</b>
              </TableCell>
              <TableCell align="center" width="10%">
                <b>Supplier ID</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row["id"]}
                  className={styles["table-row"]}
                  onClick={() => {
                    localStorage.setItem("searchTerm", searchTerm);
                    viewDetails(`restocks/restock-details/${row["id"]}`);
                  }}
                >
                  <TableCell align="center">{row["product_id"]}</TableCell>
                  <TableCell align="left">
                    {/* {Moment(row["date"]).format("MMMM D, YYYY, HH:MM a")} */}
                    {row["date"]}
                  </TableCell>
                  <TableCell align="center">{row["quantity"]}</TableCell>
                  <TableCell align="center">{row["unit_cost"]}</TableCell>
                  <TableCell align="center">{row["cost_with_tax"]}</TableCell>
                  <TableCell align="center">{row["total_cost"]}</TableCell>
                  <TableCell align="center">{row["notes"]}</TableCell>
                  <TableCell align="center">{row["supplier_id"]}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 15]}
        rowsPerPage={rowsPerPage}
        count={result.length}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Paper>
  );
};

export default RestocksTable;
