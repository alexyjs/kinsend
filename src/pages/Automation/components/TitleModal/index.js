import { Button, Col, Form, Modal, Row, Input } from "antd";
import React, { useEffect } from "react";

import "./styles.less";

const TitleModal = ({ visible, handleOk, handleCancel, title }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    handleOk(values.title);
  };

  useEffect(() => {
    form.setFieldsValue({
      title: title,
    });
  }, [title]);

  return (
    <Modal
      key="TitleModal"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      destroyOnClose={true}
      centered
      className=""
    >
      <h3 className="font-bold text-center text-2xl mb-9">Change Title</h3>
      <p className="text-center pb-5">
        This title is for internal reference only and will not be surfaced to
        your contacts
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
              name="title"
              label="AUTOMATION TITLE"
              rules={[{ required: true }]}
            >
              <Input placeholder="Please input automation title" />
            </Form.Item>
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

export default TitleModal;
