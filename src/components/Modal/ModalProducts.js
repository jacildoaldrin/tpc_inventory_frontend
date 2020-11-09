import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import InputField from "components/InputField/InputField";
import React from "react";

import img from "assets/tpc_logo.jpg";

function ModalProducts({
  setProduct,
  target,
  openModal,
  setOpenModal,
  modalType,
  products,
  product,
  openModalHandler,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let modalContent = products
    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row) => (
      <TableRow
        key={row["_id"]}
        // className={
        //   styles["table-row"]
        // }
        onClick={() => {
          setProduct(row);
        }}
      >
        <TableCell align="center">
          <img
            alt="img"
            src={row["image"] ? `${target}/images/${row["image"]}` : img}
            // src={`${target}/images/${row["image"]}`}
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
      open={openModal}
      onClose={() => setOpenModal(false)}
    >
      <DialogTitle>Products</DialogTitle>
      <DialogContent style={{ overflow: "hidden" }}>
        <DialogContentText>
          <InputField
            required
            label={"Product"}
            value={`${product?._id} - ${product?.description}`}
          />

          <TableContainer
            style={{ maxHeight: "400px" }}
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
            count={products?.length}
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
          <Button size="large" variant="contained">
            CONFIRM
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default ModalProducts;
