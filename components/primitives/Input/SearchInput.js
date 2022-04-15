import React from 'react';
import {OutlinedInput, InputAdornment} from "@material-ui/core";
import {Search} from '@material-ui/icons';

function SearchInput(props) {
  return (
    <OutlinedInput
      placeholder={'Search ...'}
      endAdornment={<InputAdornment position="end"><Search /></InputAdornment>}
      {...props}
    />
  );
}

SearchInput.propTypes = {};
SearchInput.defaultProps = {};

export default SearchInput;
