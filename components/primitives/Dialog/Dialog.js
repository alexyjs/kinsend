import React from 'react';
import {Dialog as MuiDialog} from "@material-ui/core";

function Dialog(props) {
  return (
    <MuiDialog {...props} />
  );
}

Dialog.propTypes = {};
Dialog.defaultProps = {};

export default Dialog;
