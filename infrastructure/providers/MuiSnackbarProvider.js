import React from 'react';
import { SnackbarProvider } from 'notistack';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';

const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

function MuiSnackbarProvider({children}) {
  return (
    <SnackbarProvider
      action={key => (
        <IconButton onClick={onClickDismiss(key)} aria-label="Close Snackbar">
          <CloseIcon />
        </IconButton>
      )}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      hideIconVariant
      maxSnack={3}
      ref={notistackRef}
    >
      {children}
    </SnackbarProvider>
  );
}

MuiSnackbarProvider.propTypes = {};
MuiSnackbarProvider.defaultProps = {};

export default MuiSnackbarProvider;
