import { createMuiTheme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const MuiTheme = createMuiTheme({
  typography: {
    fontFamily: `"Montserrat", "Helvetica", "Arial", sans-serif`,
  },
  palette: {
    primary: {
      main: grey[900],
    },
  },
});

export default MuiTheme;
