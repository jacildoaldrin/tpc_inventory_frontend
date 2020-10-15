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
import { useSuppliers } from "contexts/SuppliersContext";

import styles from "./SuppliersTable.module.css";

const SuppliersTable = (props) => {
  const { suppliers } = useSuppliers();
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
        <h1>Suppliers</h1>
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
            <TableCell align="center" width="5%">
              <b>ID</b>
            </TableCell>
            <TableCell align="left" width="10%">
              <b>Name</b>
            </TableCell>
            <TableCell align="left" width="15%">
              <b>Email</b>
            </TableCell>
            <TableCell align="left" width="10%">
              <b>Phone #</b>
            </TableCell>
            <TableCell align="left" width="20%">
              <b>Address</b>
            </TableCell>
            <TableCell align="left" width="10%">
              <b>Contact</b>
            </TableCell>
            <TableCell align="left" width="15%">
              <b>Notes</b>
            </TableCell>
            <TableCell align="center" width="5%">
              <b>Action</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center" component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row["supplier_name"]}</TableCell>
                <TableCell align="left">
                  {row["supplier_email"] === null
                    ? "N/A"
                    : row["supplier_email"]}
                </TableCell>
                <TableCell align="left">
                  {row["supplier_phone"] === null
                    ? "N/A"
                    : row["supplier_phone"]}
                </TableCell>
                <TableCell align="left">
                  {row["supplier_address"] === null
                    ? "N/A"
                    : row["supplier_address"]}
                </TableCell>
                <TableCell align="left">
                  {row["supplier_contact"] === null
                    ? "N/A"
                    : row["supplier_contact"]}
                </TableCell>
                <TableCell align="left">
                  {row["supplier_notes"] === null
                    ? "N/A"
                    : row["supplier_notes"]}
                </TableCell>
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
        count={suppliers.length}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default SuppliersTable;
