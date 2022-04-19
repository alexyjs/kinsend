import {createTheme} from "@material-ui/core";

const Palette = {
  primaryColor: '#D15D36',
  textPrimaryColor: '#000000',
}


// '&:hover': {
//   backgroundColor: '#F1F2F7',
//     color: '#FAFAFA',
//     fontWeight: 700,
//     border: `1px solid #DCDCDC`,
//     boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.25)'
// },
// '&:focus': {
//   backgroundColor: '#F1F2F7',
//     color: '#FAFAFA',
//     fontWeight: 700,
//     border: `1px solid #DCDCDC`,
//     boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.25)'
// }

export const AppTheme = createTheme({
  datePicker: {
    selectColor: Palette.primaryColor,
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        backgroundColor: '#F1F2F7',
        color: '#707070',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#DCDCDC !important',
        },
        '&:hover': {
          color: '#000000',
          fontWeight: 700,
          border: `1px solid #DCDCDC !important`,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.25)'
        },
        '&.Mui-focused': {
          color: '#000000',
          fontWeight: 700,
          border: `1px solid #DCDCDC !important`,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.25)'
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
