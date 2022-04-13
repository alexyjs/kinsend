import React from 'react';
import {TextField as MuiTextField} from "@material-ui/core";

function Input(props) {
  return (
    <MuiTextField variant="outlined" {...props} />
  );
}

Input.propTypes = {};
Input.defaultProps = {};

export default Input;
