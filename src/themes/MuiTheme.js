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
  overrides: {
    MuiTablePagination:{
      selectRoot:{
        marginRight: "16px"
      },
      actions: {
        marginLeft: "10px"
      }
    },
    MuiTableCell:{
      root:{
        padding: "16px 10px"
      }
    }
  }
});

export default MuiTheme;
