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
        <Row gutter={16}>
          <Col span={12} gut>
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
              // shouldUpdate={(prevValues, currentValues) =>
              //   prevValues.options !== currentValues.options
              // }
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      label={index === 0 ? "Options" : ""}
                      required={false}
                      key={`option-new-${field.key}`}
                    >
                      <Form.Item
                        {...field}
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
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add more options
                    </Button>
                    {/* <Button
                    type="dashed"
                    onClick={() => {
                      add("The head item", 0);
                    }}
                    icon={<PlusOutlined />}
                  >
                    Add field at head
                  </Button> */}
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
          <Col span={12}>
            <Form.Item
              name="tag"
              label={<>INBOUND TAG</>}
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
              <Select mode="multiple" placeholder="Choose tag..." allowClear>
                {tags &&
                  tags.map((tag) => (
                    <Select.Option key={`tag-new-${tag.id}`} value={tag.id}>
                      {tag.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  }, [customFieldType, tags]);

  useEffect(() => {
    setType(null);
  }, [visible]);

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
