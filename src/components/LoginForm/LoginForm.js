import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

//assets
import Logo from "../../assets/tpc_logo.jpg";

import styles from "./LoginForm.module.css";

const LoginForm = () => {
  return (
    <div className={styles["login-form"]}>
      <img src={Logo} alt="logo" className={styles["logo"]} />
      <form className={styles["form"]} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          style={{
            boxShadow: "0 0 3px rgba(0, 0, 0, .15)",
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          style={{
            boxShadow: "0 0 3px rgba(0, 0, 0, .15)",
          }}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ color: "white", padding: "15px", marginTop: "20px" }}
        >
          LOGIN
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
