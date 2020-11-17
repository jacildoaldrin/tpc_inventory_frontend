import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  // Typography,
} from "@material-ui/core";
import React from "react";

import img from "assets/tpc_logo.jpg";
import useStyles from "components/Tables/tableThemes";
import modalStyles from "./ModalTableMakeStyles";

function ModalProducts({
  setProduct,
  target,
  openModal,
  setOpenModal,
  products,
  product,
}) {
  const classes = useStyles(modalStyles);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [keyProdSearch, setKeyProdSearch] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchTerm = (event) => {
    if (page !== 0) setPage(0);
    setKeyProdSearch(event.target.value);
  };

  let result = products;

  if (keyProdSearch) {
    result = products.filter((product) => {
      var digits = product._id.toString();
      var search = keyProdSearch.toLowerCase();
      if (digits?.includes(search)) {
        return true;
      } else if (product.description?.toLowerCase().includes(search)) {
        return true;
      }
      return false;
    });
  }

  let modalContent = result
    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row) => (
      <TableRow
        key={row["_id"]}
        selected={product._id === row._id}
        classes={{ selected: classes.selected }}
        onClick={() => {
          setProduct(row);
        }}
      >
        <TableCell align="center">
          <img
            alt="img"
            src={row["image"] ? `${target}/images/${row["image"]}` : img}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
            }}
          />
        </TableCell>
        <TableCell align="left">{row["description"]}</TableCell>
      </TableRow>
    ));

  // style={{ maxWidth: "700px", maxHeight: "800px" }}
  return (
    <Dialog
      fullWidth="true"
      maxWidth="sm"
      // minWidth="sm"
      open={openModal}
      onClose={() => setOpenModal(false)}
    >
      <DialogTitle style={{ paddingBottom: "0px" }}>
        <Grid container justify="space-between">
          <Grid item xs={12} sm={5}>
            <Typography
              variant="h6"
              align="left"
              style={{ paddingTop: "10px" }}
            >
              Product ID: <u>{product?._id}</u>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              required
              label={"Search"}
              value={keyProdSearch}
              onChange={(e) => handleSearchTerm(e)}
            />
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent style={{ paddingTop: "0px", overflow: "hidden" }}>
        <DialogContentText>
          <TableContainer
            style={{ maxHeight: "350px", minHeight: "350px" }}
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
              <TableBody>{modalContent}</TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={result?.length}
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
            disabled={product ? false : true}
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

export default ModalProducts;
