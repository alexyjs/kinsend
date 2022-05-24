import React, { useState, useMemo, useEffect } from "react";
import { Button, Col, Form, Input, Modal, Row, Select, Radio } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import {
  addCustomFieldAsync,
  selectSettings,
} from "../../../redux/settingsReducer";
import {
  CUSTOM_FIELD_TYPE,
  CUSTOM_FIELD_OPTIONS,
} from "../../../utils/constants";
import { CloseModalIcon } from "../../../assets/svg";

const AddNewCustomField = ({ visible, handleOk, handleCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [customFieldType, setType] = useState(null);
  const { tags } = useSelector(selectSettings);

  const handleFinish = (values) => {
    let params = {
      ...values,
      isRequired: false,
      tags:
        customFieldType.type === CUSTOM_FIELD_TYPE.INPUT ||
        customFieldType.type === CUSTOM_FIELD_TYPE.PARAGRAPH_TEXT
          ? [values.tag]
          : values.tag,
      type: customFieldType.type,
    };
    dispatch(addCustomFieldAsync(params));
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

    if (
      customFieldType.type === CUSTOM_FIELD_TYPE.INPUT ||
      customFieldType.type === CUSTOM_FIELD_TYPE.PARAGRAPH_TEXT
    ) {
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
        </>
      );
    }

    // if (customFieldType.type === CUSTOM_FIELD_TYPE.RADIO) {
    // }

    // if (customFieldType.type === CUSTOM_FIELD_TYPE.SELECT) {
    // }
    // hadnleUpdateField("options", [""]);
    // default checkbox
    return (
      <>
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
        <Form.List
          name="options"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 1) {
                  return Promise.reject(new Error("At least 1 option"));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => {
                console.log("###");
                return (
                  <Form.Item
                    label={index === 0 ? "Options" : ""}
                    required={false}
                    key={`option-new-${field.key}`}
                  >
                    <Row gutter={16} className="w-full">
                      <Col span={12}>
                        <Form.Item
                          {...field}
                          name={[field.name, "label"]}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message:
                                "Please input option's name or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input placeholder={`Options ${index}`} />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...field}
                          name={[field.name, "tag"]}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "Please select or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Select placeholder="Choose tag..." allowClear>
                            {tags &&
                              tags.map((tag) => (
                                <Select.Option
                                  key={`tag-new-${tag.id}`}
                                  value={tag.id}
                                >
                                  {tag.name}
                                </Select.Option>
                              ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                );
              })}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add more options
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </>
    );
  }, [customFieldType, tags]);

  useEffect(() => {
    setType(null);
  }, [visible]);

  useEffect(() => {
    return onReset();
  }, []);

  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      // closable={false}
      closeIcon={<CloseModalIcon />}
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
            <Form.Item name="isRequired" label="">
              <Radio.Group>
                <Radio value={true}>Required</Radio>
              </Radio.Group>
            </Form.Item>
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
