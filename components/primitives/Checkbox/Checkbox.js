import React from 'react';
import {Checkbox as MuiCheckbox} from "@material-ui/core";

function Checkbox(props) {
  return (
    <MuiCheckbox color="primary" {...props} />
  );
}

Checkbox.propTypes = {};
Checkbox.defaultProps = {};

export default Checkbox;
