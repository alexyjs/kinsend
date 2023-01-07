import { useDispatch, useSelector } from "react-redux";
import { extractInfoFromRawContacts } from "./helpers";
import FieldMapper from "./FieldMapper";

import './contact-import.less';
import { fieldMapped, selectSettings } from "../../redux/settingsReducer";

const ContactImportMapper = ({ rawContacts, isCurrentStep, onEdit }) => {
  const dispatch = useDispatch();
  const { mappedFields } = useSelector(selectSettings);
  const { rawFields, colValues } = extractInfoFromRawContacts(rawContacts);
  const maxWidth = rawFields.length * 308;

  const handleMap = (from, to, isSkipped) => {
    dispatch(fieldMapped({ from, to }));
  };

  return (
    <div className="bg-gray-1 p-12 border-4 border-white">
      <div className="flex md:flex-row flex-col justify-between">
        <div>
          <h2 className="text-lg text-black font-bold mb-1">Map your File to your Kinsend</h2>
          {isCurrentStep && (
            <span>
              Select which data you want to match to your file columns by selecting each from the dropdown.
            </span>
          )}
        </div>
        <div>
          <p>
            <span><strong>{colValues[0].length}</strong> { colValues[0].length > 1 ? 'Rows' : 'Row' }, <strong>{mappedFields.length}</strong> Columns Mapped</span>
            {!isCurrentStep && (
              <span className="ml-2 font-bold text-primary cursor-pointer" onClick={onEdit}>Edit</span>
            )}
          </p>
        </div>
      </div>
      {isCurrentStep && (
        <div className="w-full overflow-x-scroll mt-5">
          <div className="flex md:flex-row flex-col space-x-5 my-5" style={{ width: maxWidth + 'px' }}>
            {
              rawFields.map((field, index) => (
                <FieldMapper
                  key={index}
                  index={index}
                  fieldName={field} 
                  fieldValues={colValues[index]} 
                  handleMap={handleMap}
                />
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactImportMapper;