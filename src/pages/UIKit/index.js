import { Button, Col, Form, Input, Row, Typography } from 'antd'
import React from 'react'

const UIKit = () => {
  return (
    <div className="mx-5">
      <Typography.Title className="text-center">UI Kit</Typography.Title>
      <Row>
        <Col>
          <div className='mb-6'>
            <Typography.Title level={2}>Button</Typography.Title>
            <Button type="primary" size="large">
              Button Primary
            </Button>
          </div>

          <div className='mb-6'>
            <Typography.Title level={2}>Input</Typography.Title>
            <Form layout="vertical">
              <Form.Item name="first-name" label="First Name">
                <Input size="large" placeholder="placeholder" />
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default UIKit
