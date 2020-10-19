import React, { useState } from "react";

//context
import { useAuth } from "contexts/AuthContext";

//component
import LoginForm from "components/Forms/LoginForm/LoginForm";

import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleEmailInput = (val) => {
    setEmail(val);
  };

  const handlePasswordInput = (val) => {
    setPassword(val);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles["login"]}>
      <div className={styles["overlay"]}>
        <LoginForm
          handleEmailInput={handleEmailInput}
          handlePasswordInput={handlePasswordInput}
          handleLogin={handleLogin}
          email={email}
          password={password}
          error={error}
        />
      </div>
    </div>
  );
};

export default Login;
