import React, { useState, useContext } from "react";

//context
import { AuthenticationContext } from "contexts";

//component
import LoginForm from "components/LoginForm/LoginForm";

import styles from "./Login.module.css";

const Login = () => {
  const { loginHandler } = useContext(AuthenticationContext);
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
          handleLogin={() => loginHandler(email, password, checked)}
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
