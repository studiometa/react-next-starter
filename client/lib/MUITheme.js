import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

// A theme with custom primary and secondary color.
// It's optional.
export default createMuiTheme({
  palette: {
    primary: {
      light: purple[100],
      main: purple[100],
      dark: purple[100],
    },
    secondary: {
      light: '#0000ff',
      main: '#00ff00',
      dark: '#ff0000',
    },
  },
});