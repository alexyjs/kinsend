import { Button, Col, Form, Modal, Row, Input, Select, Divider } from "antd";
import React from "react";

import "./styles.less";

const DeleteScheduleModal = ({ visible, handleOk, handleCancel }) => {
  return (
    <Modal
      key="DeleteScheduleModal"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      destroyOnClose={true}
      centered
      className="DeleteScheduleModal"
      width={560}
    >
      <h3 className="font-bold text-center text-2xl mb-9">
        Delete Scheduled Update
      </h3>
      <p className="text-center pb-5">
        Do you want to delete the Scheduled Update?
      </p>
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
              onClick={handleOk}
            >
              Confirm
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Modal>
  );
};

export default DeleteScheduleModal;
