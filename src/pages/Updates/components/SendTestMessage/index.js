import { Button, Col, Form, Modal, Row, Input, Select, Divider } from "antd";
import React, { useState } from "react";

import { DropdownReactSelect } from "../../../../components";

import "./styles.less";

const SendTestMessage = ({ visible, handleOk, handleCancel, phoneOptions }) => {
  const [phone, setPhone] = useState("");

  const handleChangePhone = (value) => {
    setPhone(value);
  };

  const handleSubmitPhone = () => {
    handleOk(phone);
  };
  return (
    <Modal
      key="SendTestMessage"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      destroyOnClose={true}
      centered
      className="SendTestMessage"
      width={840}
    >
      <h3 className="font-bold text-center text-2xl mb-9">Send a Test</h3>
      <p className="text-center pb-5">
        Send a test message to for formatting before sending to your audience.
        Enter test values for the merge fields you mentioned
      </p>
      <div>
        <label>Segment test message to :</label>
        <DropdownReactSelect
          data={phoneOptions}
          placeholder="Find a contact or enter a number"
          onChange={handleChangePhone}
          // value={phone}
          isSearchable
        />
      </div>
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
              onClick={handleSubmitPhone}
              disabled={!phone}
            >
              Schedule
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Modal>
  );
};

export default SendTestMessage;
