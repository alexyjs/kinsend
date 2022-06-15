import { Button, Col, Form, Input, Modal, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCNAMEAsync,
  updateCNAMEAPI,
  resetCNAME,
  selectUsers,
} from "../../redux/userReducer";
import { CNAME_REGEX } from "../../utils/validations";
import "./styles.less";

const CNameModal = ({ visible, handleOk, handleCancel }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { user, cnameSuccess } = useSelector(selectUsers);
  const handleFinish = (values) => {
    if (user?.cname) {
      dispatch(updateCNAMEAPI(values, user.cname.id));
    } else {
      dispatch(createCNAMEAsync(values));
    }
  };

  useEffect(() => {
    if (cnameSuccess) {
      handleOk && handleOk();
    }

    return () => dispatch(resetCNAME());
  }, [cnameSuccess, handleOk, dispatch]);


  useEffect(() => {
    if (user?.cname) {
      form.setFieldsValue({
        value: user.cname.value,
        title: user.cname.title,
      });
    }
  }, [user]);

  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      destroyOnClose={true}
      centered
      // className="reset-modal"
    >
      <h3 className="font-bold text-center text-2xl mb-9">CNAME Management</h3>
      <Form layout="vertical" onFinish={handleFinish} initialValues={{}} form={form}>
        <Form.Item
          name="title"
          label="title"
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <Input size="large" placeholder="Enter title" />
        </Form.Item>
        <Form.Item
          name="value"
          label="cname"
          rules={[
            {
              required: true,
              message: "This field is required",
            },
            {
              validator(_, value) {
                if (CNAME_REGEX.test(value) || !value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The cname is invalid"));
              },
            },
          ]}
        >
          <Input size="large" placeholder="Enter your cname" />
        </Form.Item>
        <Row justify="end" className="mt-12">
          <Col>
            <Form.Item noStyle shouldUpdate>
              <Button
                className="md:min-w-200"
                type="primary"
                size="large"
                htmlType="submit"
                block
              >
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CNameModal;
