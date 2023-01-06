import { Button, Dropdown, Menu, Space } from "antd";
import { CaretDownOutlined } from '@ant-design/icons';
import { useState } from "react";
import { useMemo } from "react";
import { useModal } from "../../hook/useModal";
import FieldSelectModal from "./FieldSelectModal";
import { useSelector } from "react-redux";
import { selectSettings } from "../../redux/settingsReducer";

const FieldMapper = ({ index, fieldName, fieldValues, handleMap }) => {
  const { close, show, visible } = useModal();
  const { mappedFields } = useSelector(selectSettings);
  const [styles, setStyles] = useState('bg-white');

  const mappedField = useMemo(() => {
    const field = mappedFields?.find(field => field.from === index);

    return field?.to || '';
  }, [mappedFields, index]);

  const menu = useMemo(() => {
    return (
      <Menu>
        <Menu.Item key={1} onClick={() => {
          handleMap(index, null, true);
          setStyles('hidden');
        }}>
          Skip
        </Menu.Item>
        <Menu.Item key={2} onClick={() => show(true)}>
          Map to...
        </Menu.Item>
      </Menu>
    );
  }, [index, handleMap, show]);

  const handleFieldSelected = (field) => {
    handleMap(index, field);
  }

  return (
    <>
      <div className={`w-72 rounded-md shadow-md ` + styles}>
        <div className="py-4 text-center">
          <p className="text-xs">Table Colum</p>
          <p className="font-bold text-base text-black">{ fieldName }</p>
        </div>
        <div className="p-5 h-44 border-y-1 border-gray-1">
          <p className="text-base">{ fieldValues[0] || '' }</p>
          <p className="text-base">{ fieldValues[1] || '' }</p>
          <p className="text-base">{ fieldValues[2] || '' }</p>
        </div>
        <div className="p-2 text-center">
          <div className="flex">
            <Dropdown overlay={menu} trigger={["click"]} className="w-full">
              <Button>
                <Space className="flex-1 flex items-center justify-between text-center w-full">
                  { mappedField ? (
                    <span className="normal-case font-normal">Map to <strong>{mappedField}</strong></span>
                  ) : (
                    <span className="normal-case">Select field</span>
                  ) }
                  <CaretDownOutlined className="flex align-center" />
                </Space>
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
      <FieldSelectModal 
        onSelect={handleFieldSelected} 
        close={close} 
        visible={visible} 
        fieldName={fieldName} 
      />
    </>
  )
}

export default FieldMapper;
