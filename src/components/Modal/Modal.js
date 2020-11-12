import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";

// import DialogRestock from "./DialogContextCustom/DialogRestock";

function Modal({
  openModal,
  setOpenModal,
  dialogTitle,
  dialogContentText,
  children,
  custom,
}) {
  let content = <DialogContentText>{dialogContentText}</DialogContentText>;

  // if (custom === "restock") {
  //   content = <DialogRestock custom={custom} />;
  // }

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        {content}
        <DialogActions>{children}</DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
