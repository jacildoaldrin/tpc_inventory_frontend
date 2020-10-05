import React from "react";

import styles from "./Login.module.css";

//component
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = () => {
  return (
    <div className={styles["login"]}>
      <div className={styles["overlay"]}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
