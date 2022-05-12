import { Button, Col, Form, Input, Row, Typography } from 'antd'
import React, { useEffect } from 'react'
import { AccountSetupModal, SelectNumberModal } from '../components'
import { useModal } from '../hook/useModal'

const UIKit = () => {
  const { close, show, visible } = useModal()
  const { close: closeSelectNumberModal, show: showSelectNumberModal, visible: visibleSelectNumberModal } = useModal()

  return (
    <div className="mx-5">
      <Typography.Title className="text-center">UI Kit</Typography.Title>
      <Row>
        <Col>
          <div className="mb-6">
            <Typography.Title level={2}>Button</Typography.Title>
            <Button type="primary" size="large">
              Button Primary
            </Button>
          </div>

          <div className="mb-6">
            <Typography.Title level={2}>Input</Typography.Title>
            <Form layout="vertical">
              <Form.Item name="first-name" label="First Name">
                <Input size="large" placeholder="placeholder" />
              </Form.Item>
            </Form>
          </div>

          <div className="mb-6">
            <Typography.Title level={2}>Modal Account Setup</Typography.Title>
            <Button
              className="min-w-200"
              type="primary"
              size="large"
              htmlType="submit"
              block
              onClick={show}
            >
              Ooen modal
            </Button>
            <AccountSetupModal
              handleCancel={close}
              handleOk={close}
              visible={visible}
            />
          </div>
          <div className="mb-6">
            <Typography.Title level={2}>Select Phone Number Modal</Typography.Title>
            <Button
              className="min-w-200"
              type="primary"
              size="large"
              block
              onClick={showSelectNumberModal}
            >
              Ooen Phone Number Modal
            </Button>
            <SelectNumberModal
              handleCancel={closeSelectNumberModal}
              handleOk={closeSelectNumberModal}
              visible={visibleSelectNumberModal}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default UIKit
