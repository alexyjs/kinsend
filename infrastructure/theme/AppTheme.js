import {createTheme} from "@material-ui/core";
export const AppTheme = createTheme({
  datePicker: {
    selectColor: '#D15D36',
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        backgroundColor: '#F1F2F7',
        borderColor: '#DCDCDC',
        color: '#707070'
      }
    },
  },
  palette: {
    primary: {
      main: '#D15D36',
    },
    secondary: {
      main: '#000000',
    },
    text: {
      primary: '#000000',
      disabled: '#7B7B7B',
    },
  }, typography: {
    button: {
      fontWeight: 700
    },
    fontFamily: [
      'Montserrat',
      'sans-serif',
    ].join(','),
  },
})
