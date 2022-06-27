import { Button, Col, Form, Input, Modal, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, history } from "react-router-dom";
import {
  createCNAMEAsync,
  updateCNAMEAsync,
  resetCNAME,
  selectUsers,
} from "../../redux/userReducer";
import { CNAME_REGEX } from "../../utils/validations";
import "./styles.less";

const CNameModal = ({ visible, handleOk, handleCancel }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { user, cnameSuccess } = useSelector(selectUsers);
  const cnameTitle = Form.useWatch("title", form);

  const handleFinish = (values) => {
    if (user?.cname) {
      dispatch(
        updateCNAMEAsync({
          dataUpdate: values,
          id: user.cname.id,
        })
      );
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
    if (visible && form && user?.cname) {
      form.setFieldsValue({
        title: user?.cname?.title,
      });
    }
  }, [user, form, visible]);

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
      <h3 className="font-bold text-center text-2xl mb-9">CNAME Management</h3>
      <Form
        layout="vertical"
        onFinish={handleFinish}
        name="control-hooks"
        // initialValues={{...{
        //   title: user?.cname?.title || '',
        // }}}
        form={form}
      >
        <div className="input-subfix flex items-end">
          <Form.Item
            name="title"
            label="Your Subdomain"
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
            className="flex-1"
          >
            <Input
              className="prefix-input-domain"
              size="large"
              placeholder="Enter your subdomain"
            />
          </Form.Item>
          <span
            className="flex items-center mb-6 suffix-domain text-primary"
            type="text"
          >
            .kinsend.io
          </span>
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
