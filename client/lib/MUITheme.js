import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';

// A theme with custom primary and secondary color.
// It's optional.
export default createMuiTheme({
  palette: {
    primary: {
      light: blue[100],
      main: blue[100],
      dark: blue[100],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
});