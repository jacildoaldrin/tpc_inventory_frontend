import React from "react";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";

//assets
import Logo from "assets/tpc_logo.jpg";

import styles from "./LoginForm.module.css";

const LoginForm = (props) => {
  return (
    <form
      className={styles["login-form"]}
      onSubmit={(event) => props.handleLogin(event)}
    >
      <img src={Logo} alt="logo" className={styles["logo"]} />
      <Alert
        severity="error"
        className={
          props.error === ""
            ? `${styles["error-message"]} ${styles["hidden"]}`
            : styles["error-message"]
        }
      >
        {props.error}
      </Alert>
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
        <button className={styles["button"]} type="submit">
          LOGIN
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
