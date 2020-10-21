import React from "react";
import { TextField } from "@material-ui/core";

const InputField = (props) => {
  return (
    <TextField required variant="outlined" label={props.label} fullWidth />
  );
};

export default InputField;
