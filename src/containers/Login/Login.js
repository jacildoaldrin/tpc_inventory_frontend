import React, { useState } from "react";

//context

//component
import LoginForm from "components/LoginForm/LoginForm";

import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

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
