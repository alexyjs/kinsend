import React from 'react'
import {StylesProvider, ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import {AppTheme} from "../infrastructure/theme/AppTheme";
import GlobalStyle from "../infrastructure/theme/GlobalStyle";
import Head from 'next/head'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import MuiSnackbarProvider from "../infrastructure/providers/MuiSnackbarProvider";

export default function MyApp({Component, pageProps}) {
  return <>
    <Head>
      <meta charSet='utf-8'/>
      <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' />
    </Head>
    <StylesProvider injectFirst>
      <GlobalStyle />
      <MuiThemeProvider theme={AppTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <MuiSnackbarProvider>
            <Component {...pageProps} />
          </MuiSnackbarProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </StylesProvider>
  </>
}
