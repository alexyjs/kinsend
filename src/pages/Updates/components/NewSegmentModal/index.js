import { Button, Col, Form, Modal, Row, Input, Select } from "antd";
import React, { useEffect } from "react";
import {
  PlusOutlined,
  MinusCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import {
  getSegmentAsync,
  addSegmentAsync,
} from "../../../../redux/updatesReducer";

import { RECIPIENTS_TYPE } from "../../../../utils/update";

import "./styles.less";

const NewSegmentModal = ({ visible, handleOk, handleCancel, title }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    const params = {
      ...values,
      filters: [values.filters],
    };
    dispatch(addSegmentAsync(params));
    handleCancel();
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue({
      title: title,
    });
  }, [title]);

  useEffect(() => {
    onReset();
  }, []);

  return (
    <Modal
      key="NewSegmentModal"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      destroyOnClose={true}
      centered
      className=""
    >
      <h3 className="font-bold text-center text-2xl mb-9">New Segment</h3>
      <p className="text-center pb-5">
        Combitine a set of filters to create a targeted segment
      </p>
      <Form
        onFinish={onFinish}
        form={form}
        initialValues={{ title: title || "" }}
        name="control-hooks"
      >
        <Row gutter={16} className="w-full">
          <Col span={24}>
            <Form.Item
              name="name"
              label="Segment name"
              rules={[{ required: true }]}
            >
              <Input placeholder="My New Segment" />
            </Form.Item>
            <Form.List
              name="filters"
              label="FILTERS"
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
                    return (
                      <Form.Item
                        label={index === 0 ? "FILTERS" : ""}
                        required={false}
                        key={`option-new-${field.key}`}
                      >
                        <div>
                          <Form.Item
                            {...field}
                            name={[field.name]}
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
                            <Select placeholder="Add filter" allowClear>
                              {RECIPIENTS_TYPE &&
                                RECIPIENTS_TYPE.map((recipient) => (
                                  <Select.Option
                                    key={`recipient-${recipient.value}`}
                                    value={recipient.value}
                                  >
                                    {recipient.label}
                                  </Select.Option>
                                ))}
                            </Select>
                          </Form.Item>
                        </div>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button text-primary"
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
                      Add more filters
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
        </Row>
        <Row justify="space-around" className="mt-12">
          <Col>
            <Form.Item noStyle>
              <Button
                className="md:min-w-200"
                type="primary"
                size="large"
                onClick={handleCancel}
                block
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
                block
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewSegmentModal;
