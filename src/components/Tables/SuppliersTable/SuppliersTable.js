import React, { useState, useEffect } from "react";
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
import { useSuppliers } from "contexts/SuppliersContext";
import { useNavigation } from "contexts/NavigationContext";

import styles from "./SuppliersTable.module.css";

const SuppliersTable = (props) => {
  const classes = useStyles();
  const { suppliers } = useSuppliers();
  const { viewDetails } = useNavigation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    var term = localStorage.getItem("searchSupTerm");
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
    setSearchTerm(event.target.value);
    localStorage.setItem("searchSupTerm", event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    localStorage.setItem("searchSupTerm", "");
  };

  let result = suppliers;
  if (searchTerm) {
    result = suppliers.filter((supplier) => {
      var digits = supplier.id.toString();
      var search = searchTerm.toLowerCase();
      if (digits.includes(searchTerm)) return supplier;
      else if (supplier.supplier_name?.toLowerCase().includes(search))
        return true;
      else if (supplier.supplier_website?.toLowerCase().includes(search))
        return true;
      else if (supplier.supplier_email?.toLowerCase().includes(search))
        return true;
      else if (supplier.supplier_notes?.toLowerCase().includes(search))
        return true;
      return false;
    });
  }

  // Name - Website - Email - Notes
  return (
    <Paper>
      <div className={styles["table-toolbar"]}>
        <h1>Suppliers</h1>
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
        <Table className={styles["table"]} aria-label="simple table">
          <TableHead className={styles["table-header"]}>
            <TableRow>
              <TableCell align="left" width="15%">
                <b>Name</b>
              </TableCell>
              <TableCell align="left" width="20%">
                <b>Website</b>
              </TableCell>
              <TableCell align="left" width="20%">
                <b>Email</b>
              </TableCell>
              <TableCell align="left" width="20%">
                <b>Notes</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  className={styles["table-row"]}
                  onClick={() =>
                    viewDetails(`suppliers/supplier-details/${row["id"]}`)
                  }
                >
                  <TableCell align="left">{row["supplier_name"]}</TableCell>
                  <TableCell align="left">
                    {/* {row["supplier_website"] === null
                      ? "N/A"
                      : row["supplier_website"]} */}
                    {row["supplier_website"]? <a href={row["supplier_website"]} target="_blank">Go to website</a> : "N/A"}
                  </TableCell>
                  <TableCell align="left">
                    {row["supplier_email"] === null
                      ? "N/A"
                      : row["supplier_email"]}
                  </TableCell>

                  <TableCell align="left">
                    {row["supplier_notes"] === null
                      ? "N/A"
                      : row["supplier_notes"]}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 15]}
        rowsPerPage={rowsPerPage}
        count={suppliers.length}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Paper>
  );
};

export default SuppliersTable;
