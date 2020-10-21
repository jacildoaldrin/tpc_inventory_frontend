import React from "react";
import { TextField } from "@material-ui/core";

const InputArea = (props) => {
  return (
    <TextField
      required
      variant="outlined"
      multiline
      rows="2"
      fullWidth
      label={props.label}
    />
  );
};

export default InputArea;
