// material ui
import { makeStyles } from "@material-ui/core";

const detailsMakeStyles = makeStyles((theme) => ({
  chevron: {
    fontSize: "10vh",
  },
  mainProdName: {
    fontSize: "3vh",
  },
  underline: {
    borderBottom: "1px solid lightgray",
    marginBottom: "1rem",
  },
  img: {
    display: "block",
    maxWidth: "80%",
    border: "1px solid lightgray",
    borderRadius: "5%",
    margin: "0 auto",
  },
  mt1rem: {
    marginTop: "1rem",
  },
  mt2rem: {
    marginTop: "2rem",
  },
  mb15vh: {
    marginBottom: "6.4rem",
  },
  tblcontainer: {
    width: "100%",
  },
  fab: {
    position: "fixed",
    zIndex: 1000,
    bottom: "6rem",
    // [theme.breakpoints.down(768)]: {
    right: "2vw",
    // },
    // [theme.breakpoints.up(768)]: {
    //   right: "5vw"
    // },
  },
  btnfloathide: {
    position: "fixed",
    bottom: "6rem",
    opacity: 0,
    // [theme.breakpoints.down(768)]: {
    right: "2vw",
    // },
    // [theme.breakpoints.up(768)]: {
    //   right: "5vw"
    // },
    transition: "all .1s ease-in",
  },
  btnfloatshow1: {
    opacity: 1,
    position: "fixed",
    bottom: "9.5rem",
    zIndex: 999,
    // [theme.breakpoints.down(768)]: {
    right: "2vw",
    // },
    // [theme.breakpoints.up(768)]: {
    //   right: "5vw"
    // },
    transition: "all .1s ease-in",
    boxShadow: "0px 3px 3px -3px rgba(0,0,0,0.75)",
  },
  btnfloatshow2: {
    position: "fixed",
    bottom: "13rem",
    zIndex: 555,
    // [theme.breakpoints.down(768)]: {
    right: "2vw",
    // },
    // [theme.breakpoints.up(768)]: {
    //   right: "5vw"
    // },
    transition: "all .15s ease-in",
    boxShadow: "0px 3px 3px -3px rgba(0,0,0,0.75)",
  },
  txtGreen: {
    color: "#25a732",
  },
  supplierButton: {
    margin: "5px 0",
    // marginLeft: "28px",
  },
  supplierRightColumn: {
    marginTop: "10%",
    marginBottom: "5%",
    // [theme.breakpoints.down("sm")]: {
    //   marginTop: "20%",
    // },
    // [theme.breakpoints.down("xs")]: {
    //   marginLeft: "12vw",
    //   marginTop: "0",
    // },
  },
}));

export { detailsMakeStyles };
