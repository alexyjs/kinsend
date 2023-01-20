import { Button, Col, Form, Modal, Row } from "antd";
import React from "react";

const DeleteKeywordResponseModal = ({ visible, handleOk, handleCancel, item }) => {
  return (
    <Modal
      key="DeleteKeywordResponseModal"
      visible={visible}
      onOk={_ => handleOk(item)}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      destroyOnClose={true}
      centered
      className="DeleteKeywordResponseModal"
      width={560}
    >
      <h3 className="font-bold text-center text-2xl mb-9">
        Delete Keyword Response
      </h3>
      <p className="text-center pb-5">
        Do you want to delete the Keyword Response <strong>"{ item?.keyword }"?</strong>
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
              onClick={_ => handleOk(item)}
            >
              Confirm
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Modal>
  );
};

export default DeleteKeywordResponseModal;
