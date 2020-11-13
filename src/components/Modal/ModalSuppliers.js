import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";

// styles
import useStyles from "components/Tables/tableThemes";
import modalStyles from "./ModalTableMakeStyles";
// import styles from "./Modal.module.css";

import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

function ModalSuppliers({
  setSupplier,
  openModal,
  setOpenModal,
  suppliers,
  supplier,
}) {
  const classes = useStyles(modalStyles);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [keySupSearch, setKeySupSearch] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchTerm = (event) => {
    if (page !== 0) setPage(0);
    console.log(event.target.value);
    setKeySupSearch(event.target.value);
  };

  // const clearSearch = () => {
  //   setKeySupSearch("");
  // };
  let result = suppliers;

  if (keySupSearch) {
    result = suppliers.filter((supplier) => {
      var digits = supplier.id.toString();
      var search = keySupSearch.toLowerCase();
      if (digits?.includes(search)) {
        return true;
      } else if (supplier.supplier_name?.toLowerCase().includes(search)) {
        return true;
      }
      return false;
    });
  }

  let modalContent = result
    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row) => (
      <TableRow
        key={row["id"]}
        selected={supplier.id === row.id}
        classes={{ selected: classes.selected }}
        onClick={() => {
          setSupplier(row);
        }}
      >
        <TableCell style={{ padding: "16px" }} align="left">
          {row["id"]}
        </TableCell>
        <TableCell align="left">{row["supplier_name"]}</TableCell>
      </TableRow>
    ));

  return (
    <Dialog
      fullWidth="true"
      maxWidth="sm"
      open={openModal}
      onClose={() => setOpenModal(false)}
    >
      <DialogTitle>
        <Grid container style={{ display: "flex" }} justify="space-between">
          <Grid item xs={12} sm={5}>
            <Typography
              variant="h6"
              align="left"
              style={{ paddingTop: "10px" }}
            >
              Supplier Code: <u>{supplier?.id}</u>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            {/* <TextField
              required
              label={"Search"}
              value={keySupSearch}
              onChange={(e) => handleSearchTerm(e)}
            /> */}
            {/* <SearchField
              key={keySupSearch}
              handleSearchTerm={handleSearchTerm}
            /> */}
            <TextField
              placeholder="search"
              value={keySupSearch}
              onChange={(e) => handleSearchTerm(e)}
              fullWidth={true}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{ color: "rgba(0, 0, 0, 0.4)" }} />
                  </InputAdornment>
                ),
              }}
            />
            {/* <IconButton
              size="small"
              className={classes.margin}
              onClick={clearSearch}
            >
              <ClearIcon fontSize="inherit" />
            </IconButton> */}
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent style={{ overflow: "hidden" }}>
        <DialogContentText>
          <TableContainer
            style={{ maxHeight: "350px" }}
            // className={styles["container"]}
          >
            <Table
              style={{ maxHeight: "200px" }}
              aria-label="simple table"
              size="small"
            >
              <TableHead
              // className={styles["table-header"]}
              ></TableHead>
              <TableBody className={classes.tbody}>{modalContent}</TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={suppliers?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </DialogContentText>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenModal(false);
            }}
            size="large"
          >
            CANCEL
          </Button>
          <Button
            disabled={supplier ? false : true}
            size="large"
            variant="contained"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            CONFIRM
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default ModalSuppliers;
