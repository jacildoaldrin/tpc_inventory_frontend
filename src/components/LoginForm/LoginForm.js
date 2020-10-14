import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

//context
import { useAuth } from "contexts/AuthContext";

//assets
import Logo from "assets/tpc_logo.jpg";

import styles from "./LoginForm.module.css";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles["login-form"]}>
      <img src={Logo} alt="logo" className={styles["logo"]} />
      <div className={styles["form"]}>
        <TextField
          value={email}
          onChange={(event) => emailHandler(event)}
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
          value={password}
          onChange={(event) => passwordHandler(event)}
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
        <button
          className={styles["button"]}
          onClick={(event) => loginHandler(event)}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
