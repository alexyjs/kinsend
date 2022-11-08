import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { useModal } from "../../../hook/useModal";
import AddNewCustomField from "./AddNewCustomField";
import EditCustomField from "./EditCustomField";
import { AddIcon } from "../../../assets/svg";
import {
  getCustomFieldsAsync,
  selectSettings,
} from "../../../redux/settingsReducer";
import { CUSTOM_FIELD_OPTIONS } from "../../../utils/constants";

import "./styles.less";

const CustomFieldsList = () => {
  const { close, show, visible } = useModal();
  const { close: closeEdit, show: showEdit, visible: visibleEdit } = useModal();
  const { customFields, addedCustomField, updatededCustomField } =
    useSelector(selectSettings);
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editData, setEditData] = useState({});

  const handleSelectKey = (raw, raw1) => {
    setSelectedRowKeys(raw);
  };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: handleSelectKey,
  // };

  const handleEdit = (value) => {
    setEditData(value);
    showEdit(true);
  };

  const handleCloseEdit = () => {
    setEditData(null);
    closeEdit();
  };

  useEffect(() => {
    dispatch(getCustomFieldsAsync());
  }, [useDispatch]);

  useEffect(() => {
    if (addedCustomField) {
      close();
    }
  }, [addedCustomField, close]);
  useEffect(() => {
    if (updatededCustomField) {
      handleCloseEdit();
    }
  }, [updatededCustomField]);

  return (
    <div>
      <div className="flex md:flex-row flex-col justify-between items-center my-10">
        <span className="max-w-lg">
          Custom fields allow you to collect unique information about your
          contacts when they fill out your public form. Put these fields to use
          by selecting them when you customize your form.
        </span>
        <Button
          type="primary"
          size="large"
          className="inline-flex items-center px-10 mt-3 md:mt-0"
          onClick={show}
        >
          <AddIcon className="mr-2" /> New
        </Button>
      </div>
      <div className="custom-field-list">
        {customFields?.length ? (
          customFields.map((customField, index) => {
            const activeCustomField = CUSTOM_FIELD_OPTIONS.find(
              (itemOption) => customField?.type === itemOption.type
            );
            return (
              <div
                key={`custom-field-list-${index}`}
                className="custom-field flex items-center justify-between"
              >
                <span className="inline-flex items-center">
                  <activeCustomField.icon className="mr-2" />
                  <span>
                    <span className="custom-field-type">
                      {activeCustomField.label}
                      <br />
                    </span>
                    {customField.label}
                  </span>
                </span>
                <div className="actions">
                  <Button
                    type="primary"
                    size="middle"
                    className="inline-flex items-center px-5"
                    onClick={() => handleEdit(customField)}
                  >
                    Edit
                  </Button>
                  {/* <button
                    type="primary"
                    size="large"
                    className="inline-flex items-center px-10"
                    onClick={show}
                  >
                    Edit
                  </button> */}
                </div>
              </div>
            );
          })
        ) : (
          <span>You don’t have custom fields</span>
        )}
      </div>
      <AddNewCustomField
        handleCancel={close}
        handleOk={close}
        visible={visible}
      />
      <EditCustomField
        handleCancel={handleCloseEdit}
        handleOk={handleCloseEdit}
        visible={visibleEdit}
        data={editData}
      />
    </div>
  );
};

export default CustomFieldsList;
