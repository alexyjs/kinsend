import {
  Button,
  Checkbox,
  Col,
  Collapse,
  Form,
  Input,
  Radio,
  Row,
  Space,
  Typography,
} from "antd";
import _ from "lodash";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { useNavigate } from "react-router-dom";

import { SuccessIcon } from "../../assets/svg";
import { createUserAsync, selectCreateUser } from "../../redux/userReducer";
import { phoneValidator } from "../../utils";
import { EMAIL_REGEX, INFO_FROM, PASSWORD_REGEX } from "../../utils/constants";
import { InputPhone, InputSocial, PlanModal } from "../components";
import { useModal } from "../hook/useModal";
import {
  getListSubscriptionPricesAsync,
  selectSubscriptions,
} from "../../redux/subscriptionReducer";

const { Title } = Typography;
const { Panel } = Collapse;

function SlideBackButton() {
  const swiper = useSwiper();

  return (
    <Form.Item noStyle>
      <Button
        className="md:min-w-200 mt-8"
        type="text"
        size="large"
        onClick={() => swiper.slidePrev()}
      >
        Back
      </Button>
    </Form.Item>
  );
}

const SignUp = () => {
  const [isEnd, setIsEnd] = useState(false);
  const { isLoading, errors, user, signupSuccess } =
    useSelector(selectCreateUser);
  const swiperRef = React.useRef(null);
  const dispatch = useDispatch();
  const { close, show, visible } = useModal();
  const { listSubscriptionPrices } = useSelector(selectSubscriptions);
  let navigate = useNavigate();

  const subscriptionPrices = useMemo(() => {
    return _.orderBy(listSubscriptionPrices, "unit_amount");
  }, [listSubscriptionPrices]);

  const handleFinish = (values) => {
    const swiper = _.get(swiperRef, "current.swiper", null);

    if (!swiper) {
      return;
    }

    if (swiper.activeIndex === 0) {
      swiperRef.current.swiper.slideNext();
    } else {
      try {
        let params = { ...values };
        params.phoneNumber = [params.phoneNumber];
        dispatch(createUserAsync(params));
      } catch {}
    }
  };

  useEffect(() => {
    if (signupSuccess) {
      swiperRef.current.swiper.slideNext();

      // TODO: remove this logic. we shouldn't handle reddirect by signupSuccess
      navigate("/login");
    }
  }, [signupSuccess]);

  useEffect(() => {
    dispatch(getListSubscriptionPricesAsync());
  }, []);

  return (
    <div className="flex flex-col justify-center min-h-screen py-6">
      <div className="container mx-auto px-4">
        <Title className="text-center">Sign Up for KinSend</Title>
        <Typography className={`mb-8 text-center ${isEnd ? "invisible" : ""}`}>
          <p>
            Thank you for your interest in the KinSend Starter Plan starting at
            $20.00/month{" "}
            <span
              className="text-primary font-bold cursor-pointer"
              onClick={show}
            >
              Change Plan
            </span>
          </p>
        </Typography>
        <Form
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            phoneNumber: {
              phone: undefined,
              code: 1,
              short: "US",
            },
          }}
        >
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={50}
            onSlideChange={(s) => {
              setIsEnd(s.isEnd);
            }}
            calculateHeight={true}
            noSwiping={true}
            className="swiper-no-swiping"
            pagination={{ clickable: false }}
            ref={swiperRef}
          >
            <SwiperSlide>
              <div className="pb-12">
                <Row gutter={40}>
                  <Col sm={12} span={24}>
                    <Form.Item
                      name="firstName"
                      label="First Name"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <Input size="large" placeholder="Adam " />
                    </Form.Item>
                  </Col>
                  <Col sm={12} span={24}>
                    <Form.Item
                      name="lastName"
                      label="Last Name"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <Input size="large" placeholder="Smith" />
                    </Form.Item>
                  </Col>
                  <Col sm={12} span={24}>
                    <Form.Item
                      name="email"
                      label="email"
                      rules={[
                        {
                          validator(_, value) {
                            if (EMAIL_REGEX.test(value) || !value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("The email is invalid")
                            );
                          },
                        },
                      ]}
                    >
                      <Input size="large" placeholder="Email@.com" />
                    </Form.Item>
                  </Col>
                  <Col sm={12} span={24}>
                    <Form.Item
                      name="phoneNumber"
                      label="Phone"
                      rules={[phoneValidator]}
                    >
                      <InputPhone />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="oneSocial"
                      label="Social"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <InputSocial />
                    </Form.Item>
                  </Col>
                  <Col sm={12} span={24}>
                    <Form.Item
                      name="password"
                      label="Password"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                        {
                          validator(_, value) {
                            if (PASSWORD_REGEX.test(value) || !value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "The password must be a minimum of eight characters, at least one letter, and one number."
                              )
                            );
                          },
                        },
                      ]}
                    >
                      <Input
                        autoComplete="off"
                        aria-autocomplete="off"
                        type="password"
                        size="large"
                        placeholder="********"
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={12} span={24}>
                    <Form.Item
                      name="confirmPassword"
                      label="Confirm Password"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "The two passwords that you entered do not match!"
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <Input
                        type="password"
                        size="large"
                        placeholder="********"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="end">
                  <Col>
                    <Form.Item noStyle shouldUpdate>
                      <Button
                        className="md:min-w-200 mt-8"
                        type="primary"
                        size="large"
                        // htmlType="submit"
                        onClick={() => swiperRef.current.swiper.slideNext()}
                      >
                        Next
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="pb-12">
                <div className="my-12">
                  <Title level={4} className="text-center">
                    Tell Us More
                  </Title>
                </div>
                <Collapse className="my-4" accordion expandIconPosition="right">
                  <Panel header="How are you hear about KinSend?" key="1">
                    <Form.Item noStyle name="infoFrom">
                      <Checkbox.Group>
                        <Space direction="vertical">
                          {_.map(INFO_FROM, ({ key, value, title }) => {
                            return (
                              <Checkbox key={key} value={value}>
                                {title}
                              </Checkbox>
                            );
                          })}
                        </Space>
                      </Checkbox.Group>
                    </Form.Item>
                  </Panel>
                </Collapse>
                <Collapse className="my-4" accordion expandIconPosition="right">
                  <Panel
                    header="What are you looking to get out of KinSend?"
                    key="2"
                  >
                    <Checkbox.Group name="what">
                      <Space direction="vertical">
                        <Checkbox value="1">
                          I would like to collect data on my customers and rurn
                          them into phone contacts
                        </Checkbox>
                        <Checkbox value="2">
                          I would like to have the ability to send mass messages
                          to my contacts
                        </Checkbox>
                        <Checkbox value="3">
                          I would like to convert an existing email list into
                          text
                        </Checkbox>
                        <Checkbox value="4">
                          I would like to sync my Shopify store and sell
                          products through text
                        </Checkbox>
                        <Checkbox value="5">
                          I would like to manage RSVPs for events via text
                        </Checkbox>
                        <Checkbox value="6">
                          I would like to supply my sales associates/employees
                          with their own KinSend Number
                        </Checkbox>
                      </Space>
                    </Checkbox.Group>
                  </Panel>
                </Collapse>
                <Collapse className="my-4" accordion expandIconPosition="right">
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
                    <SlideBackButton />
                  </Col>
                  <Col>
                    <Form.Item noStyle shouldUpdate>
                      <Button
                        className="md:min-w-200 mt-8"
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={isLoading}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="pb-12">
                <div className="bg-gray max-w-2xl mx-auto p-16 text-center">
                  <Space direction="vertical" size={"large"}>
                    <div className="text-center">
                      <SuccessIcon className="mx-auto" />
                    </div>
                    <Title className="text-center" level={2}>
                      Verify your email
                    </Title>
                    <Typography className="text-center">
                      <p className="max-w-sm mx-auto">
                        Thank you for completing the sigup for the KinSend
                        Starter Plan. Plase check your email for a verification
                        link.
                      </p>
                    </Typography>
                    <Typography className="text-center">
                      <span className="text-primary font-bold underline uppercase">
                        resent email verification
                      </span>
                    </Typography>
                  </Space>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </Form>
      </div>
      <PlanModal
        handleCancel={close}
        handleOk={(subscription) => {
          close();
        }}
        visible={visible}
        subscriptionPrices={subscriptionPrices}
        disabled={true}
      />
    </div>
  );
};

export default SignUp;
