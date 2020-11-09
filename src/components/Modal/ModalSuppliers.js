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

function ModalSuppliers({
  setSupplier,
  openModal,
  setOpenModal,
  suppliers,
  supplier,
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

  let modalContent = suppliers
    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row) => (
      <TableRow
        key={row["id"]}
        // className={styles["table-row"]}
        onClick={() => {
          setSupplier(row);
        }}
      >
        <TableCell align="left">{row["id"]}</TableCell>
        <TableCell align="left">{row["supplier_name"]}</TableCell>
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
      <DialogTitle>Suppliers</DialogTitle>
      <DialogContent style={{ overflow: "hidden" }}>
        <DialogContentText>
          <InputField
            required
            label={"Supplier"}
            value={`${supplier?.id} - ${supplier?.supplier_name}`}
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
          <Button size="large" variant="contained">
            CONFIRM
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default ModalSuppliers;
