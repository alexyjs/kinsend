import React from 'react';
import {Button as MuiButton} from "@material-ui/core";

function Button(props) {
  return (
    <MuiButton variant="outlined" color="primary" {...props} />
  );
}

Button.propTypes = {};
Button.defaultProps = {};

export default Button;
