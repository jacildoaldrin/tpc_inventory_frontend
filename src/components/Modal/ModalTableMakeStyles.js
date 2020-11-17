const styles = (theme) => ({
  tableRow: {
    "&$selected, &$selected:hover": {
      backgroundColor: "red !important",
    },
    marginTop: "20px",
  },
  tableCell: {
    "$selected &": {
      color: "red !important",
    },
  },
  selected: {},
  tbody: { fontSize: "50px" },
  margin: {
    margin: theme.spacing(1),
    // padding: "5px",
  },
});

export default styles;
