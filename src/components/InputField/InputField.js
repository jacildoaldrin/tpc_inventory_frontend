import React from "react";
import { TextField } from "@material-ui/core";

const InputField = (props) => {
  return (
    <TextField
      required={props.required? true : false}
      variant="outlined"
      label={props.label}
      fullWidth
      value={props.value}
      onKeyDown={props.onKeyDown ? props.onKeyDown : e=>{e.key === 'Enter' && e.preventDefault()}}
      onChange={(event) => props.setValue(event.target.value)}
      type={props.type ? "number" : "text"}
    />
  );
};

export default InputField;
