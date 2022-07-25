import React, { useEffect, useState } from "react";
import Select, { components as ReactSelectComponent } from "react-select";

import "./styles.less";

// const groupedOptions = [
//   {
//     label: "lable 1",
//     options: [{ label: "value 1", value: 1 }],
//   },
//   {
//     label: "lable 2",
//     options: [
//       { label: "value 1", value: 1 },
//       { label: "value 2", value: 2 },
//     ],
//   },
// ];

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

// const DropdownIndicator = props => {
//   return (
//       ReactSelectComponent.DropdownIndicator && (
//           <ReactSelectComponent.DropdownIndicator {...props}>
//               {props.selectProps.menuIsOpen ? (
//                   <i className={props.searchable ? 'icon-search' : 'icon icon-angle-up'} />
//               ) : (
//                   <i className="icon icon-angle-down" />
//               )}
//           </ReactSelectComponent.DropdownIndicator>
//       )
//   );
// };
// Format option, use for custom view of option - example, user select, job, company ...
const Option = (props) => {
  const { children, formatOption, data } = props;
  return (
    <ReactSelectComponent.Option {...props}>
      <div className="custom-option">
        {formatOption ? formatOption(data) : children}
      </div>
    </ReactSelectComponent.Option>
  );
};
// Show the value which selected
// const SingleValue = props => {
//   const { children, formatValue, data } = props;
//   return (
//       <ReactSelectComponent.SingleValue {...props}>
//           {formatValue ? formatValue(data) : children}
//       </ReactSelectComponent.SingleValue>
//   );
// };

const formatGroupLabel = (data) => (
  <div style={groupStyles} className="formatGroupLabel">
    <span>{data.label}</span>
  </div>
);

const DropdownGroup = ({ data = [], onChange, defaultValue }) => {
  return (
    <Select
      value={defaultValue}
      // menuIsOpen
      options={data}
      formatGroupLabel={formatGroupLabel}
      className="DropdownGroup"
      components={{
        Option: (props) => (
          <Option {...props} formatOption={(item) => item.label} />
        ),
      }}
      onChange={onChange}
    />
  );
  // hideArrow ? null : <DropdownIndicator {...props} searchable={searchable} />,
  // MenuList: props => <MenuList {...props} formatOption={optionComponent} />,
  // SingleValue: props => <SingleValue {...props} formatValue={valueComponent} />,
};

export default DropdownGroup;
