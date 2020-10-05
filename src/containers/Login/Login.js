import React, { useState } from "react";

import styles from "./Login.module.css";

//component
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const handleLogin = () => {
    console.log(email, password, checked)
  };

  const handleEmailInput = (val) => {
    setEmail(val);
  };

  const handlePasswordInput = (val) => {
    setPassword(val);
  };

  const handleCheckbox = (val) => {
    setChecked(val);
  };

  return (
    <div className={styles["login"]}>
      <div className={styles["overlay"]}>
        <LoginForm
          handleLogin={handleLogin}
          handleEmailInput={handleEmailInput}
          handlePasswordInput={handlePasswordInput}
          handleCheckbox={handleCheckbox}
          email={email}
          password={password}
          checked={checked}
        />
      </div>
    </div>
  );
};

export default Login;
