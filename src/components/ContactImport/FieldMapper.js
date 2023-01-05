import { Button, Dropdown, Menu, Modal, Select, Space } from "antd";
import { CaretDownOutlined } from '@ant-design/icons';
import { useState } from "react";
import { DEFAULT_FIELDS, OPTION_FIELDS } from "../../utils/constants";
import { useMemo } from "react";
import { CloseModalIcon } from "../../assets/svg";
import { useModal } from "../../hook/useModal";

const FieldMapper = ({ index, fieldName, fieldValues, handleMap }) => {
  const { close, show, visible } = useModal();
  const [mappedField, setMappedField] = useState(index);
  const [styles, setStyles] = useState('bg-white');

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

  return (
    <>
      <div className={`w-72 rounded-md shadow-md ` + styles}>
        <div className="py-4 text-center">
          <p className="text-xs">Table Colum</p>
          <p className="font-bold text-base text-black">{ fieldName }</p>
        </div>
        <div className="p-5 h-44 border-y-1 border-gray-1">
          <p className="text-base">{ fieldValues[0] }</p>
          <p className="text-base">{ fieldValues[1] || '' }</p>
          <p className="text-base">{ fieldValues[2] || '' }</p>
        </div>
        <div className="p-2 h-14 text-center">
          <div className="flex">
            <Dropdown overlay={menu} trigger={["click"]} className="w-full">
              <Button>
                <Space className="flex-1 flex items-center justify-between">
                  Select field
                  <CaretDownOutlined className="flex align-center" />
                </Space>
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
      <Modal
        visible={visible}
        onOk={close}
        onCancel={close}
        footer={null}
        // closable={false}
        closeIcon={<CloseModalIcon />}
        destroyOnClose={true}
        centered
        className="small-modal add-custom-field-modal"
      >
        <h3 className="font-bold text-center text-4xl mb-5">Map Column { fieldName } to</h3>
        <div className="small-body-modal">
          <div className="flex">
            Select fields here!!!
          </div>
        </div>
      </Modal>
    </>
  )
}

export default FieldMapper;