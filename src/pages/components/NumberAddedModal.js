import { Button, Col, Form, Modal, Row } from 'antd'
import React from 'react'
import { displayPhoneNumber } from '../../utils'

const NumberAddedModal = ({
  visible,
  handleOk,
  handleCancel,
  phoneNumber,
}) => {
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
      <h3 className="font-bold text-center text-2xl mb-6">
        Your shiny new kinSend number
      </h3>
      <h3 className="font-bold text-center text-xl mb-6">{displayPhoneNumber(phoneNumber)}</h3>

      <p className="text-base text-dark-gray text-center mb-6">
        It was popularised in the 1960s with the release of Letraset sheets
        containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker includ ing versions of Lorem
        Ipsum
      </p>
      <Row className="mt-6" gutter={24}>
        <Col flex={1}>
          <Button block className="min-w-200" size='large' onClick={handleCancel}>
            Reguest a Different Number
          </Button>
        </Col>
        <Col flex={1}>
          <Button block className="min-w-200" size='large' type="primary">
            Learn more about routing
          </Button>
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
              Cancel
            </Button>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item noStyle shouldUpdate>
            <Button className="min-w-200" type="primary" size="large">
              Continue to app
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Modal>
  )
}

export default NumberAddedModal
