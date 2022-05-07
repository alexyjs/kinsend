import { Button, Col, Form, Input, Modal, Row } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resendVerifyEmailAsync, resetResendVerifyEmail, selectUsers } from '../redux/userReducer'
import { EMAIL_REGEX } from '../utils/constants'

const ResendPasswordModal = ({ visible, handleOk, handleCancel }) => {
  const dispatch = useDispatch()
  const { resendVerifyEmailSuccess } = useSelector(selectUsers);
  const handleFinish = (values) => {
    dispatch(resendVerifyEmailAsync(values))
  }

  useEffect(() => {

  })

  useEffect(() => {
    if (resendVerifyEmailSuccess) {
      handleOk && handleOk()
    }

    return () => dispatch(resetResendVerifyEmail());
  }, [resendVerifyEmailSuccess]);

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
        Resend Your Password
      </h3>
      <Form layout="vertical" onFinish={handleFinish} initialValues={{}}>
        <Form.Item
          name="email"
          label="email"
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
            {
              validator(_, value) {
                if (EMAIL_REGEX.test(value) || !value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The email is invalid'))
              },
            },
          ]}
        >
          <Input size="large" placeholder="Enter your email" />
        </Form.Item>
        <Row justify="end" className="mt-6">
          <Col>
            <Form.Item noStyle>
              <Button
                className="md:min-w-200"
                type="text"
                size="large"
                onClick={handleCancel}
              >
                Back
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
                Resend
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default ResendPasswordModal
