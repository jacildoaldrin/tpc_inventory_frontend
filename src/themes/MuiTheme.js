import { createMuiTheme } from "@material-ui/core";
import green from "@material-ui/core/colors/green";

const MuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

export default MuiTheme;