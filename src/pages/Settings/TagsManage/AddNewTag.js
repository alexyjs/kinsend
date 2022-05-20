import React from "react";
import { Button, Col, Form, Input, Modal, Row } from "antd";

import { useDispatch } from "react-redux";
import { addTagAsync } from "../../../redux/settingsReducer";

const AddNewTag = ({ visible, handleOk, handleCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const handleFinish = (values) => {
    dispatch(addTagAsync(values));
  };
  
  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      destroyOnClose={true}
      centered
      className="reset-modal"
    >
      <h3 className="font-bold text-center text-4xl mb-5">
        Add tag
      </h3>
      <p className="text-center pb-5">Chose a name for the new tag</p>
      <Form layout="vertical" onFinish={handleFinish} initialValues={{}}>
        <Form.Item
          name="name"
          label="new tag name"
          rules={[
            {
              required: true,
              message: "This field is required",
            }
          ]}
        >
          <Input size="large" placeholder="New tag name" />
        </Form.Item>
        <Row justify="end" className="mt-12">
          <Col>
            <Form.Item noStyle>
              <Button
                className="md:min-w-200"
                type="text"
                size="large"
                onClick={handleCancel}
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
      </Form>
    </Modal>
  );
};

export default AddNewTag;
