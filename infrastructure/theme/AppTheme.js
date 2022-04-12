import {createTheme} from "@material-ui/core";

export const AppTheme = createTheme({
  palette: {
    primary: {
      main: '#D15D36',
    },
    secondary: {
      main: '#000000',
    },
    text: {
      primary: '#D15D36',
      secondary: '#000000',
      disabled: '#7B7B7B',
    },
  }, typography: {

    fontFamily: [
      'Montserrat'
    ].join(','),
  },
})
