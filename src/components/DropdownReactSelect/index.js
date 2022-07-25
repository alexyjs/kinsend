import CreatableSelect from "react-select/creatable";
import React from "react";

const DropdownReactSelect = ({
  data = [],
  onChange,
  placeholder,
  ...props
}) => {
  return (
    <CreatableSelect
      isClearable
      onChange={onChange}
      options={data}
      {...props}
    />
  );
};

export default DropdownReactSelect;
