import { Button, Col, Form, Input, Modal, Row } from 'antd'
import React from 'react'
import { EMAIL_REGEX } from '../../utils/constants'
import { useModal } from '../hook/useModal'
import SelectNumberModal from './SelectNumberModal'

const AccountSetupModal = ({ visible, handleOk, handleCancel }) => {
  const { close, show, visible: phoneNumberModalVisible } = useModal()
  const handleFinish = () => {}
  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      destroyOnClose={true}
      centered
      width={840}
    >
      <h3 className="font-bold text-center text-2xl mb-6">Account Setup</h3>
      <Form layout="vertical" onFinish={handleFinish} initialValues={{}}>
        <Form.Item
          name="email"
          label="Starter Plan ($19.99 per moth)"
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <Input size="large" placeholder="Card Number" />
        </Form.Item>
        <Row wrap={false} gutter={28}>
          <Col>
            <Form.Item label="Expiry" name="month">
              <Input size="large" placeholder="Month" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="&NBSP;" name="year">
              <Input size="large" placeholder="Year" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="CVV" name="cvv">
              <Input size="large" placeholder="" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end" className="mt-6">
          <Col>
            <Form.Item noStyle>
              <Button
                className="min-w-200"
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
                className="min-w-200"
                type="primary"
                size="large"
                htmlType="submit"
                onClick={show}
              >
                Next
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <SelectNumberModal
        handleCancel={close}
        handleOk={close}
        visible={phoneNumberModalVisible}
      />
    </Modal>
  )
}

export default AccountSetupModal
