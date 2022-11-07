import { Button, Col, Form, Modal, Row } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { displayPhoneNumber } from "../utils";
import { addPhoneAsync, selectPhones } from "../redux/phoneReducer";

const NumberAddedModal = ({ visible, handleOk, handleCancel, phoneNumber }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectPhones);
  const handleFinish = () => {
    dispatch(
      addPhoneAsync({
        phoneNumbers: [phoneNumber],
      })
    );
  };

  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      destroyOnClose={true}
      mask={false}
      maskClosable={false}
      keyboard={false}
      centered
      width={840}
    >
      <h3 className="font-bold text-center text-2xl mb-6">
        Your shiny new KinSend number
      </h3>
      <h3 className="font-bold text-center text-xl mb-6">
        {displayPhoneNumber(phoneNumber)}
      </h3>
      <Row className="mt-6" gutter={24}>
        <Col flex={1}>
          <Button
            block
            className="min-w-200"
            size="large"
            onClick={handleCancel}
          >
            Request a Different Number
          </Button>
        </Col>
        <Col flex={1}>
          <Button block className="min-w-200" size="large" type="primary">
            Learn more about routing
          </Button>
        </Col>
      </Row>
      <Row justify="end" className="mt-6">
        {/* <Col>
          <Form.Item noStyle>
            <Button
              className="min-w-200"
              type="text"
              size="large"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </Form.Item>
        </Col> */}
        <Col>
          <Form.Item noStyle shouldUpdate>
            <Button
              className="min-w-200"
              type="primary"
              size="large"
              onClick={handleFinish}
              disabled={isLoading}
            >
              Continue to app
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Modal>
  );
};

export default NumberAddedModal;
