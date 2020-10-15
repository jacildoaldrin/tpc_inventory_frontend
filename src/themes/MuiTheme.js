import { createMuiTheme } from "@material-ui/core";
import {grey} from "@material-ui/core/colors";

const MuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
    },
  },
});

export default MuiTheme;
