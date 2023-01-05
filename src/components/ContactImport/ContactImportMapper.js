import { Select, Switch } from "antd";
import { DEFAULT_FIELDS, OPTION_FIELDS } from "../../utils/constants";
import { extractInfoFromRawContacts } from "./helpers";

import './contact-import.less';
import { useState } from "react";

const ContactImportMapper = ({ rawContacts }) => {
  const { rawFields, colValues } = extractInfoFromRawContacts(rawContacts);
  const maxWidth = rawFields.length * 308;

  return (
    <div className="bg-gray-1 p-12 border-4 border-white rounded-b-lg ">
      <div className="mb-5">
        <h2 className="text-lg text-black font-bold mb-1">Map your File to your Kinsend</h2>
        <span>
          Select which data you want to match to your file columns by selecting each from the dropdown.
        </span>
      </div>
      <div className="w-full overflow-x-scroll">
        <div className="flex md:flex-row flex-col space-x-5 my-5" style={{ width: maxWidth + 'px' }}>
          {
            rawFields.map((field, index) => (
              <FieldMapper 
                key={index}
                fieldName={field} 
                fieldValues={colValues[index]} 
                onMapped={console.log} 
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

const FieldMapper = ({ fieldName, fieldValues, onMapped }) => {
  const [styles, setStyles] = useState('bg-white');

  const onChange = (value) => {
    if (value === 'SKIP') {
      setStyles('bg-gray-1 border-1 border-gray-1');
    } else {
      setStyles('bg-white');
    }
  }

  return (
    <div className={`w-72 rounded-md shadow-md ` + styles}>
      <div className="py-4 text-center">
        <p className="text-xs">Table Colum</p>
        <p className="font-bold text-base text-black">{ fieldName }</p>
      </div>
      <div className="p-5 h-44 border-y-1 border-gray-1">
        <p className="text-base">{ fieldValues[0] }</p>
      </div>
      <div className="p-2 h-14 text-center">
        <Select
          showSearch
          placeholder="Select field to map"
          className="w-full h-full"
          onChange={onChange}
        >
          {['SKIP', ...DEFAULT_FIELDS, ...OPTION_FIELDS].map((option) => (
            <Select.Option key={`option-field-${option}`} value={option}>
              { option !== 'SKIP' ? 'Map to ' : '' }<strong>{option}</strong>
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  )
}

export default ContactImportMapper;
