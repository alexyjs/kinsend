import React from 'react';
import {Select as MuiSelect} from "@material-ui/core";

function Select({options = [], ...rest}) {
  return (
    <MuiSelect variant="outlined" color="primary" autoWidth native {...rest}>
      {
        options.map(option => {
          return <option value={option.value} key={option.id}>
            {option.label}
          </option>
        })
      }
    </MuiSelect>
  );
}

Select.propTypes = {};
Select.defaultProps = {};

export default Select;
