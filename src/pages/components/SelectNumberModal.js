import { Button, Col, Form, Input, Modal, Row } from 'antd'
import React from 'react'
import { InputPhone } from '.'
import { phoneValidator } from '../../utils'
import { useModal } from '../hook/useModal'
import CustomTag from './CustomTag'
import NumberAddedModal from './NumberAddedModal'

const SelectNumberModal = ({ visible, handleOk, handleCancel }) => {
  const { close, show, visible: numberAddedModalVisible } = useModal()
  const handleFinish = () => { }
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
        Select your number
      </h3>

      <p className="text-base text-dark-gray text-center mb-6">
        Can't find the number you are looking for? We support Toll-Free and
        phone numbers of almost all countries.{' '}
        <span className="text-primary">Get in touch</span>
      </p>
      <Form
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          phoneNumber: {
            phone: undefined,
            code: 1,
            short: 'US',
          },
        }}>
        <Form.Item
          name="phoneNumber"
          label="Phone"
          rules={[
            phoneValidator,
          ]}
        >
          <InputPhone placeholder="Enter your phone" />
        </Form.Item>

        <div className="my-6">
          <p className="text-base text-primary text-center ">
            How about any of these numbers?
          </p>

          <CustomTag />
        </div>

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
                onClick={show}
              >
                Confirm
              </Button>
            </Form.Item>
            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue }) => {
                const phoneNumber = getFieldValue('phoneNumber')
                return (
                  <NumberAddedModal
                    handleCancel={close}
                    handleOk={close}
                    visible={numberAddedModalVisible}
                    phoneNumber={phoneNumber}
                  />
                )
              }}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default SelectNumberModal
