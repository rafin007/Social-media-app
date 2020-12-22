import { createMuiTheme } from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";

function theme(mode) {
  return createMuiTheme({
    palette: {
      type: mode,
      primary: blue,
      secondary: red,
    },
  });
}

export default theme;
