import React from 'react';
import { useSnackbar } from 'notistack';

function useNotification() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const notify = (message, variant, key) => {
    enqueueSnackbar(message, { variant, autoHideDuration: 6000, key });
  };

  const notifySuccess = (message, key) => {
    notify(message, 'success', key);
  };

  const notifyError = (message, key) => {
    notify(message, 'error', key);
  };

  const notifyWarning = (message, key) => {
    notify(message, 'warning', key);
  };

  return {
    notifySuccess,
    notifyError,
    notifyWarning,
    close: closeSnackbar
  }
}


export default useNotification;
