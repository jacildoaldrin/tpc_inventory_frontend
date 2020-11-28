import React from "react";
import { useHistory } from "react-router-dom";

// styles
import styles from "./Dashboard.module.css";
import { Button, Grid } from "@material-ui/core";

const Dashboard = () => {
  const history = useHistory();

  return (
    <div className={styles["dashboard"]}>
      <Grid
        className={styles["grid-container"]}
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        {/* <Grid>
          <Button
            className={styles["grid-button"]}
            fullWidth
            style={{
              backgroundColor: "#406E16",
              color: "white",
              height: "60px",
              fontSize: "20px",
              paddingTop: "10px",
            }}
            variant="contained"
            onClick={() => history.push("/restocks")}
          >
            RESTOCKS
          </Button>
        </Grid> */}
        <Grid>
          <Button
            fullWidth
            className={styles["grid-button"]}
            style={{
              backgroundColor: "#406E16",
              color: "white",
              height: "60px",
              fontSize: "20px",
              paddingTop: "10px",
            }}
            variant="contained"
            onClick={() => history.push("/products")}
          >
            PRODUCTS
          </Button>
        </Grid>
        <Grid>
          <Button
            className={styles["grid-button"]}
            fullWidth
            style={{
              backgroundColor: "#406E16",
              color: "white",
              height: "60px",
              fontSize: "20px",
              paddingTop: "10px",
            }}
            variant="contained"
            onClick={() => history.push("/suppliers")}
          >
            SUPPLIERS
          </Button>
        </Grid>
        <Grid>
          <Button
            className={styles["grid-button"]}
            fullWidth
            style={{
              backgroundColor: "#406E16",
              color: "white",
              height: "60px",
              fontSize: "20px",
              paddingTop: "10px",
            }}
            variant="contained"
            onClick={() => history.push("/storages")}
          >
            STORAGES
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
