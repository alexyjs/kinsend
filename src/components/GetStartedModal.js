import { Button, Form, Input, Modal } from "antd";
import React from "react";
import { phoneValidator } from "../utils";
import PhoneInput from "./InputPhone";

const GetStartedModal = ({ visible, handleOk, handleCancel }) => {
  const handleFinish = () => {};
  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      destroyOnClose={true}
      centered
    >
      <h3 className="font-bold text-center text-2xl mb-6">
        Get started with KinSend
      </h3>
      <Form layout="vertical" onFinish={handleFinish} initialValues={{}}>
        <Form.Item name="phoneNumber" label="Phone" rules={[phoneValidator]}>
          <PhoneInput placeholder="Enter phone number" />
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          <Button
            className="min-w-200 mt-6"
            type="primary"
            size="large"
            htmlType="submit"
            block
          >
            Request access
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GetStartedModal;
