import React from 'react';
import {Radio as MuiRadio} from "@material-ui/core";

function Radio(props) {
  return (
    <MuiRadio color="primary" {...props} />
  );
}

Radio.propTypes = {};
Radio.defaultProps = {};

export default Radio;
