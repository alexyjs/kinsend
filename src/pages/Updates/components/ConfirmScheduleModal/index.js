import { Button, Col, Form, Modal, Row, Input, Select, Divider } from "antd";
import React from "react";

import "./styles.less";

const ConfirmScheduleModal = ({
  visible,
  handleOk,
  handleCancel,
  dataSubmit,
  handleSendTest,
}) => {
  if (!dataSubmit?.message) {
    return null;
  }

  return (
    <Modal
      key="ConfirmScheduleModal"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      destroyOnClose={true}
      centered
      className="ConfirmScheduleModal"
      width={840}
    >
      <h3 className="font-bold text-center text-2xl mb-9">Confirm Update</h3>
      <p className="text-center pb-5">Set up anAction to fire automatically</p>
      <div className="ConfirmScheduleModal-preview">
        <h4>PREVIEW</h4>
        <div
          className="phone-image-content-message"
          dangerouslySetInnerHTML={{
            __html: dataSubmit?.message
              .replace(/<fname>/gi, `&lt;fname&gt;`)
              .replace(/<lname>/gi, `&lt;lname&gt;`)
              .replace(/<name>/gi, `&lt;name&gt;`)
              .replace(/<mobile>/gi, `&lt;mobile&gt;`)
              .replace(/<form>/gi, `&lt;form&gt;`),
          }}
        ></div>
      </div>
      <Row justify="space-around" className="mt-12">
        <Col>
          <Form.Item noStyle>
            <Button
              className="md:min-w-200"
              type="primary"
              size="large"
              onClick={handleSendTest}
              block
            >
              Send Test
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
              onClick={handleOk}
            >
              Schedule
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Modal>
  );
};

export default ConfirmScheduleModal;
