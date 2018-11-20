import { createMuiTheme } from '@material-ui/core/styles';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({

  /***********************************************
   *  PALETTE
   ***********************************************/

  palette: {
    primary: {
      main: '#EE4266',
    },
    secondary: {
      main: '#42D9C8',
    },
    grey: {
      50: '#F1F3F6',
      100: '#e6e8eb',
      150: '#E2E5EA',
      200: '#999EA6',
      250: '#5A5A5A',
    },
    text: {
      primary: '#070707',
      secondary: '#292929',
      white: '#fff',
    },
  },

  /***********************************************
   *  TYPOGRAPHY
   ***********************************************/

  typography: {
    fontSize: 16,
    fontFamily: 'BwSurco, Arial, sans-serif',
    display4: { // Hero
      fontSize: '3rem',
      color: '#070707',
      fontWeight: 400,
    },
    display3: { // H1
      fontSize: '2.5rem',
      color: '#070707',
      fontWeight: 300,
    },
    display2: { // H2
      fontSize: '2rem',
      color: '#070707',
      fontWeight: 500,
      lineHeight: '2.5rem',
    },
    display1: { // H3
      fontSize: '1.6875rem',
      color: '#292929',
      fontWeight: 500,
    },
    headline: { // H4
      fontSize: '1.375rem',
      color: '#292929',
      fontWeight: 400,
    },
    title: { // H5
      fontSize: '1.125rem',
      color: '#292929',
      fontWeight: 500,
    },
    subheading: { // H6
      fontSize: '0.5625rem',
      color: '#292929',
      fontWeight: 400,
    },
    body2: { // Paragraph L
      fontSize: '1.125rem',
      color: '#070707',
      fontWeight: 300,
    },
    body1: { // Paragraph
      fontSize: '1rem',
      color: '#070707',
      fontWeight: 300,
    },
    caption: { // Paragraph S
      fontSize: '0.8125rem',
      color: '#292929',
      fontWeight: 300,
    },
    button: {
      fontSize: '0.875rem',
      color: '#070707',
      fontWeight: 500,
      textTransform: 'none',
    },
  },

  /***********************************************
   *  PROPS OVERRIDES
   ***********************************************/

  props: {
    MuiInput: {
      disableUnderline: true,
    },
    Hidden: {
      implementation: 'css',
    },
  },

  /***********************************************
   *  STYLES OVERRIDES
   ***********************************************/

  overrides: {
    MuiInput: {
      focused: {
        background: 'inherit',
      },
    },
  },

  /***********************************************
   *  GRADIENTS
   ***********************************************/

  gradients: {
    default: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%)',
  },

  /***********************************************
   *  Transitions
   ***********************************************/

  transitions: {
    easing: {
      easeOut: 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
    },
  },
});


/***********************************************
 *  Styles
 *
 *  This adds some pre-built styles objects that
 *  can be easily used through the app
 ***********************************************/


theme.styles = {
  responsivePadding: {
    paddingLeft: `${theme.spacing.unit * 7}px`,
    paddingRight: `${theme.spacing.unit * 7}px`,
    [theme.breakpoints.down('md')]: {
      paddingRight: `${theme.spacing.unit * 6}px`,
      paddingLeft: `${theme.spacing.unit * 6}px`,
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: `${theme.spacing.unit * 4}px`,
      paddingRight: `${theme.spacing.unit * 4}px`,
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: `${theme.spacing.unit * 2}px`,
      paddingLeft: `${theme.spacing.unit * 2}px`,
    },
  },
  responsiveMargin: {
    marginLeft: `${theme.spacing.unit * 7}px`,
    marginRight: `${theme.spacing.unit * 7}px`,
    [theme.breakpoints.down('md')]: {
      marginRight: `${theme.spacing.unit * 6}px`,
      marginLeft: `${theme.spacing.unit * 6}px`,
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: `${theme.spacing.unit * 4}px`,
      marginRight: `${theme.spacing.unit * 4}px`,
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: `${theme.spacing.unit * 2}px`,
      marginLeft: `${theme.spacing.unit * 2}px`,
    },
  },

  hover: {
    offLinkUnderline: {
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 1,
        backgroundColor: theme.palette.text.primary,
        transform: 'scaleX(0)',
        transition: `transform 0.4s ${theme.transitions.easing.easeOut}`,
        transformOrigin: '100% 100%',
      },
      '&:hover::after': {
        transform: 'scaleX(1)',
        transformOrigin: '0 0',
      },
    },
    offLinkUnderlineWhite: {
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 1,
        backgroundColor: theme.palette.text.white,
        transform: 'scaleX(0)',
        transition: `transform 0.4s ${theme.transitions.easing.easeOut}`,
        transformOrigin: '100% 100%',
      },
      '&:hover::after': {
        transform: 'scaleX(1)',
        transformOrigin: '0 0',
      },
    },
    onLinkUnderline: {
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 1,
        backgroundColor: theme.palette.text.primary,
        transform: 'scaleX(1)',
        transition: `transform 0.4s ${theme.transitions.easing.easeOut}`,
        transformOrigin: '0 0',
      },
      '&:hover::after': {
        transform: 'scaleX(0)',
        transformOrigin: '100% 100%',
      },
    },
  },
};

theme.shadows[1] = '0 5px 10px 0 rgba(0,0,0,0.05)';

export default theme;