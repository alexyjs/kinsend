import React, { useState, useMemo } from "react";
import { Button, Col, Form, Input, Modal, Row, Select, Radio } from "antd";

import { useDispatch, useSelector } from "react-redux";
import {
  addCustomFieldAsync,
  selectSettings,
} from "../../../redux/settingsReducer";
import {
  CUSTOM_FIELD_TYPE,
  CUSTOM_FIELD_OPTIONS,
} from "../../../utils/constants";

import "./AddNewCustomField.less";

const AddNewCustomField = ({ visible, handleOk, handleCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [customFieldType, setType] = useState(null);
  const { tags } = useSelector(selectSettings);

  const handleFinish = (values) => {
    dispatch(
      addCustomFieldAsync({
        ...values,
        type: customFieldType.type,
      })
    );
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleSelectType = (item) => {
    setType(item);
  };

  const hadnleUpdateField = (key, value) => {
    form.setFieldsValue({
      [key]: value,
    });
  };

  const renderBody = useMemo(() => {
    if (!customFieldType?.type) {
      return;
    }

    if (customFieldType.type === CUSTOM_FIELD_TYPE.INPUT || customFieldType.type === CUSTOM_FIELD_TYPE.TEXTAREA) {
      return (
        <>
          <Form.Item
            name="tag"
            label={
              <>
                INBOUND TAG
                <span>
                  Choose which tag(s) get applied to incoming contacts
                </span>
              </>
            }
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.name !== currentValues.name
            }
          >
            <Select placeholder="Choose tag..." allowClear>
              {tags &&
                tags.map((tag) => (
                  <Select.Option key={`tag-${tag.id}`} value={tag.id}>
                    {tag.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="label"
            label="LABEL QUESTION"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Input size="large" placeholder="Copy NEW Salon Today Magazine" />
          </Form.Item>
          <Form.Item
            name="placeholder"
            label="PLACEHOLDER TEXT"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Input size="large" placeholder="Favorite color?" />
          </Form.Item>
          <Form.Item name="isRequired" label="">
            <Radio.Group>
              <Radio value={true}>Required</Radio>
            </Radio.Group>
          </Form.Item>
        </>
      );
    }

    // if (customFieldType.type === CUSTOM_FIELD_TYPE.RADIO) {
    // }

    // if (customFieldType.type === CUSTOM_FIELD_TYPE.SELECT) {
    // }

    // default checkbox
    return (
      <>
        <Form.Item
          name="name"
          label="new tag name"
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <Input size="large" placeholder="New tag name" />
        </Form.Item>
      </>
    );
  }, [customFieldType, tags]);

  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      // closable={false}
      destroyOnClose={true}
      centered
      className="reset-modal"
    >
      <h3 className="font-bold text-center text-4xl mb-5">Custom Fields</h3>
      <p className="text-center pb-5">
        Collect specific information from your contacts using custom fields.
      </p>
      <Form layout="vertical" onFinish={handleFinish} initialValues={{}}>
        {/* step 1 */}
        {!customFieldType &&
          CUSTOM_FIELD_OPTIONS.map((item) => (
            <div
              key={`custom-field-add-${item.type}`}
              className="custom-field flex items-center justify-between"
            >
              <span className="inline-flex items-center">
                <item.icon className="mr-2" />
                {item.label}
              </span>
              <button type="text" onClick={() => handleSelectType(item)}>
                Select
              </button>
            </div>
          ))}
        {/* step 2 */}
        {customFieldType && (
          <>
            <div className="custom-field flex items-center justify-between">
              <span className="inline-flex items-center">
                <customFieldType.icon className="mr-2" />
                {customFieldType.label}
              </span>
            </div>
            {renderBody}
            <Row justify="end" className="mt-12">
              <Col>
                <Form.Item noStyle>
                  <Button
                    className="md:min-w-200"
                    type="text"
                    size="large"
                    onClick={() => setType(null) && onReset()}
                  >
                    Cancel
                  </Button>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item noStyle shouldUpdate>
                  <Button
                    className="md:min-w-200"
                    type="primary"
                    size="large"
                    htmlType="submit"
                    block
                  >
                    Save
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default AddNewCustomField;
