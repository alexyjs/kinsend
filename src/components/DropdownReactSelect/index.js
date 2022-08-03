import React from "react";
import Select, { components as ReactSelectComponent } from "react-select";
import cl from "classnames";

import "./styles.less";

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

// Show the value which selected
const SingleValue = (props) => {
  const { children, formatValue, data } = props;
  console.log("###SingleValue", props);
  return (
    <ReactSelectComponent.SingleValue
      {...props}
      className="DropdownReactSelect-SingleValue"
    >
      {children}
    </ReactSelectComponent.SingleValue>
  );
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

// const Input = (props) => {
//   if (props.isHidden) {
//     return <ReactSelectComponent.Input {...props} className="DropdownReactSelect-input" />;
//   }
//   return (
//     <div>
//         <ReactSelectComponent.Input {...props} className="DropdownReactSelect-input" />
//     </div>
//   );
//   return <ReactSelectComponent.Input {...props} className="DropdownReactSelect-input" />;
// };

const Placeholder = (props) => {
  return (
    <ReactSelectComponent.Placeholder
      {...props}
      className="DropdownReactSelect-Placeholder"
    />
  );
};

const formatGroupLabel = (data) => (
  <div style={groupStyles} className="formatGroupLabel">
    <span>{data.label}</span>
  </div>
);

const DropdownReactSelect = ({
  data = [],
  onChange,
  className,
  value,
  ...props
}) => {
  return (
    <Select
      isClearable
      onChange={onChange}
      options={data}
      className={cl("DropdownReactSelect", className)}
      formatGroupLabel={formatGroupLabel}
      components={{
        SingleValue: (props) => (
          <SingleValue
            {...props}
            // formatValue={valueComponent}
          />
        ),
        // Input: props => <Input {...props} />,
        Placeholder: (props) => <Placeholder {...props} />,
      }}
      {...props}
    />
  );
};

export default DropdownReactSelect;
