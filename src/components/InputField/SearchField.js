import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import React from "react";

//icons
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import useStyles from "./InputFieldMakeStyles";

function SearchField({ key, handleSearchTerm, clearSearch }) {
  const classes = useStyles;
  return (
    <>
      <TextField
        placeholder="search"
        value={key}
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
      <IconButton size="small" className={classes.margin} onClick={clearSearch}>
        <ClearIcon fontSize="inherit" />
      </IconButton>
    </>
  );
}

export default SearchField;
