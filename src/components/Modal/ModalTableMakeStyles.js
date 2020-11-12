const styles = (theme) => ({
  tableRow: {
    "&$selected, &$selected:hover": {
      backgroundColor: "#8abb7b",
    },
  },
  tableCell: {
    "$selected &": {
      color: "8abb7b",
    },
  },
  selected: {},
});

export default styles;
