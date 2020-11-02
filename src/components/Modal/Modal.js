import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";

function Modal({
  openModal,
  setOpenModal,
  dialogTitle,
  dialogContentText,
  children,
}) {
  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogContentText}</DialogContentText>
        <DialogActions>{children}</DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
