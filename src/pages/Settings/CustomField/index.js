import React, { useEffect, useState } from "react";
import { Button, Table, Tag, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { useModal } from "../../../hook/useModal";
import AddNewCustomField from "./AddNewCustomField";
import { AddIcon } from "../../../assets/svg";
import {
  getCustomFieldsAsync,
  selectSettings,
} from "../../../redux/settingsReducer";
import { CUSTOM_FIELD_ICON, CUSTOM_FIELD_LABEL, CUSTOM_FIELD_OPTIONS } from "../../../utils/constants";

import "./styles.less";

const CustomFieldsList = () => {
  const { close, show, visible } = useModal();
  const { customFields, addedCustomField } = useSelector(selectSettings);
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleSelectKey = (raw, raw1) => {
    setSelectedRowKeys(raw);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectKey,
  };

  useEffect(() => {
    dispatch(getCustomFieldsAsync());
  }, [useDispatch]);

  useEffect(() => {
    if (addedCustomField) {
      close();
    }
  }, [addedCustomField, close]);

  return (
    <div>
      <div className="flex justify-between items-center my-10">
        <span className="max-w-lg">
          Custom fields allow you to collect unique information about your
          contacts when they fill out your public form. Put these fields to use
          by selecting them when you customize your form.
        </span>
        <Button
          type="primary"
          size="large"
          className="inline-flex items-center px-10"
          onClick={show}
        >
          <AddIcon className="mr-2" /> New
        </Button>
      </div>
      <div className="custom-field-list">
        {customFields?.length ? (
          customFields.map((customField, index) => {
            const activeCustomField = CUSTOM_FIELD_OPTIONS.find(itemOption => customField?.type === itemOption.type)
            return <div
            key={`custom-field-list-${index}`}
            className="custom-field flex items-center"
          >
            <span className="inline-flex items-center">
              <activeCustomField.icon className="mr-2" />
              <span>
                <span className="custom-field-type">{activeCustomField.label}<br /></span>
                {customField.label}
              </span>
            </span>
          </div>})
        ) : (
          <span>You don’t have custom fields</span>
        )}
      </div>
      <AddNewCustomField
        handleCancel={close}
        handleOk={close}
        visible={visible}
      />
    </div>
  );
};

export default CustomFieldsList;
