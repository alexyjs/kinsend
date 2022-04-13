import React from 'react';
import {Switch as MuiSwitch} from "@material-ui/core";

function Switch(props) {
  return (
    <MuiSwitch color="primary" {...props} />
  );
}

Switch.propTypes = {};
Switch.defaultProps = {};

export default Switch;
