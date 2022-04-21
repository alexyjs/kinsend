import {
  Button, Col, Collapse, Form, Input, Radio, Row, Space, Typography
} from 'antd'
import React, { useState } from 'react'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

const { Title } = Typography
const { Panel } = Collapse

function SlideNextButton() {
  const swiper = useSwiper()

  return (
    <Button
      className="min-w-200 mt-8"
      type="primary"
      size="large"
      onClick={() => swiper.slideNext()}
    >
      Next
    </Button>
  )
}
const SignUp = () => {
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="grid place-items-center h-screen">
      <div className="container mx-auto px-4">
        <Title className="text-center">Sign Up for KinSend</Title>
        <Typography className={`mb-8 text-center ${isEnd ? 'invisible' : ''}`}>
          <p>
            Thank you for your interest in the KinSend Starter Plan starting at
            $20.00/month{' '}
            <span className="text-primary font-bold underline">
              Change Plan
            </span>
          </p>
        </Typography>
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={50}
          onSlideChange={(s) => {
            setIsEnd(s.isEnd);
          }}
          noSwiping={true}
          className="swiper-no-swiping"
          pagination={{ clickable: false }}
        >
          <SwiperSlide>
            <div className='pb-12'>
              <Form layout="vertical">
                <Row gutter={40}>
                  <Col sm={12} span={24}>
                    <Form.Item name="first-name" label="First Name">
                      <Input size="large" placeholder="Adam " />
                    </Form.Item>
                  </Col>
                  <Col sm={12} span={24}>
                    <Form.Item name="last-name" label="Last Name">
                      <Input size="large" placeholder="Smith" />
                    </Form.Item>
                  </Col>
                  <Col sm={12} span={24}>
                    <Form.Item name="email" label="email">
                      <Input size="large" placeholder="Email@.com" />
                    </Form.Item>
                  </Col>
                  <Col sm={12} span={24}>
                    <Form.Item name="phone" label="Phone">
                      <Input size="large" placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="social" label="Social">
                      <Input size="large" placeholder="@kinsend.io" />
                    </Form.Item>
                  </Col>
                  {/* <Col span={24}>
              <Form.Item label="Social">
                <Row>
                  <Col>
                    <Button size="large">Test</Button>
                  </Col>
                  <Col>
                    <Button size="large">Test</Button>
                  </Col>
                  <Col flex="1">
                    <Form.Item noStyle name="social">
                      <Input size="large" placeholder="@kinsend.io" />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
            </Col> */}
                  <Col sm={12} span={24}>
                    <Form.Item name="password" label="Password">
                      <Input
                        type="password"
                        size="large"
                        placeholder="********"
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={12} span={24}>
                    <Form.Item name="confirmPassword" label="Confirm Password">
                      <Input
                        type="password"
                        size="large"
                        placeholder="********"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              <Row justify="end">
                <Col>
                  <SlideNextButton />
                </Col>
              </Row>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <Collapse accordion expandIconPosition="right">
              <Panel header="How are you hear about KinSend ?" key="1">
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="facebook">Facebook</Radio>
                    <Radio value="google">Google</Radio>
                  </Space>
                </Radio.Group>
              </Panel>
              <Panel
                header="What are you looking to get out of KinSend?"
                key="2"
              >
                <Radio.Group name="what">
                  <Space direction="vertical">
                    <Radio value="1">
                      I would like to collect data on my customers and rurn them
                      into phone contacts
                    </Radio>
                    <Radio value="2">
                      I would like to have the ability to send mass messages to
                      my contacts
                    </Radio>
                    <Radio value="3">
                      I would like to convert an existing email list into text
                    </Radio>
                    <Radio value="4">
                      I would like to sync my Shopify store and sell products
                      through text
                    </Radio>
                    <Radio value="5">
                      I would like to manage RSVPs for events via text
                    </Radio>
                    <Radio value="6">
                      I would like to supply my sales associates/employees with
                      their own KinSend Number
                    </Radio>
                  </Space>
                </Radio.Group>
              </Panel>
              <Panel header="What is the size of your audience?" key="3">
                <Radio.Group name="size">
                  <Space direction="vertical">
                    <Space direction="vertical">
                      <Radio value="1">0-1,000</Radio>
                      <Radio value="2">5,000-10,000</Radio>
                      <Radio value="3">10,000-20,000</Radio>
                      <Radio value="4">20,000+</Radio>
                    </Space>
                  </Space>
                </Radio.Group>
              </Panel>
            </Collapse>
            <Row justify="end">
              <Col>
                <SlideNextButton />
              </Col>
            </Row>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-gray max-w-2xl mx-auto p-16">
              <Title className="text-center" level={2}>
                Verify your email
              </Title>
              <Typography className="mb-8 text-center">
                <p className="max-w-sm mx-auto">
                  Thank you for completing the sigup for the KinSend Starter
                  Plan. Plase check your email for a verification link.
                </p>
              </Typography>
              <Typography className="mb-8 text-center">
                <span className="text-primary font-bold underline uppercase">
                  resent emaol verification
                </span>
              </Typography>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default SignUp
