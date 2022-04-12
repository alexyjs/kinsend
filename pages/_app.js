import React from 'react'
import {StylesProvider, ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import {AppTheme} from "../infrastructure/theme/AppTheme";
import GlobalStyle from "../infrastructure/theme/GlobalStyle";
import Head from 'next/head'

export default function MyApp({Component, pageProps}) {
  return <>
    <Head>
      <meta charSet='utf-8'/>
      <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' />
    </Head>
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={AppTheme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </MuiThemeProvider>
    </StylesProvider>
  </>
}
