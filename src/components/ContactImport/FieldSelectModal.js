import { Button, Modal } from "antd";
import Search from "antd/lib/transfer/search";
import { useMemo } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CloseModalIcon } from "../../assets/svg";
import { selectSettings } from "../../redux/settingsReducer";
import { DEFAULT_FIELDS, OPTION_FIELDS } from "../../utils/constants";

import './contact-import.less';

const fieldNotSelected = (mappedFields, field) => {
  return mappedFields.filter(mappedField => mappedField.to === field).length === 0;
}

const FieldSelectModal = ({ close, visible, fieldName, onSelect }) => {
  const { mappedFields } = useSelector(selectSettings);
  const [searchText, setSearchText] = useState('');

  const fields = useMemo(() => {
    return [...DEFAULT_FIELDS, ...OPTION_FIELDS].filter(field => field.toLowerCase().indexOf(searchText) >= 0 && fieldNotSelected(mappedFields, field));
  }, [searchText, mappedFields]);

  return (
    <>
      <Modal
        visible={visible}
        onOk={close}
        onCancel={close}
        footer={null}
        closeIcon={<CloseModalIcon />}
        destroyOnClose={true}
        centered
        className="small-modal add-custom-field-modal"
      >
        <h3 className="font-bold text-center text-xl md:text-4xl mb-5">Map Column { fieldName } to</h3>
        <div className="mt-10">
          <div className="flex">
            <Search
              placeholder="Search fields..."
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="mt-10">
            {
              fields.map((field, index) => (
                <div key={index} className="flex flex-row justify-between items-center py-2 border-t-1 border-gray-1">
                  <div>
                    <strong>{ field }</strong>
                  </div>
                  <div>
                    <Button
                      type="primary"
                      size="small"
                      className="inline-flex items-center px-6 py-4 md:mt-0"
                      onClick={() => {
                        onSelect(field);
                        close();
                      }}
                    >
                      Select
                    </Button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </Modal>
    </>
  );
}
 
export default FieldSelectModal;