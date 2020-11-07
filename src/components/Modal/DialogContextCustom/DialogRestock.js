import { DialogContentText, Grid } from "@material-ui/core";
import InputField from "components/InputField/InputField";
import React from "react";
// import DialogContentText
// import { DialogContentText } from "@material-ui/core";

function DialogRestock({ custom }) {
  return (
    <DialogContentText>
      {custom}
      <Grid item xs={12} sm={12}>
        <InputField required label={"Product"} />
      </Grid>
    </DialogContentText>
  );
}

export default DialogRestock;
