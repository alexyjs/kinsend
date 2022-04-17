import {createTheme} from "@material-ui/core";

const Palette = {
  primaryColor: '#D15D36',
  textPrimaryColor: '#000000',
}

export const AppTheme = createTheme({
  datePicker: {
    selectColor: Palette.primaryColor,
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        backgroundColor: '#F1F2F7',
        borderColor: '#DCDCDC',
        color: '#707070',
        '&:hover': {
          color: Palette.textPrimaryColor,
          fontWeight: 700
        }
      }
    },
    MuiButton: {
      outlinedPrimary: {
        '&:hover': {
          backgroundColor: Palette.primaryColor,
          color: '#FAFAFA',
          fontWeight: 700
        }
      }
    }
  },
  palette: {
    primary: {
      main: Palette.primaryColor,
    },
    secondary: {
      main: Palette.textPrimaryColor,
    },
    text: {
      primary: Palette.textPrimaryColor,
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
