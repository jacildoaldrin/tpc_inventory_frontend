import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

//assets
import Logo from "assets/tpc_logo.jpg";

import styles from "./LoginForm.module.css";

const LoginForm = (props) => {
  return (
    <div className={styles["login-form"]}>
      <img src={Logo} alt="logo" className={styles["logo"]} />
      <div className={styles["form"]}>
        <TextField
          value={props.email}
          onChange={(event) => props.handleEmailInput(event.target.value)}
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
          value={props.password}
          onChange={(event) => props.handlePasswordInput(event.target.value)}
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
          control={
            <Checkbox
              value={props.checked}
              onChange={(event) => props.handleCheckbox(event.target.checked)}
              color="primary"
            />
          }
          label="Remember me"
        />
        <button className={styles["button"]} onClick={() => props.handleLogin()}>
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
