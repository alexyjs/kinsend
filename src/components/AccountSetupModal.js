import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, Col, Form, Modal, Row } from "antd";
import _ from "lodash";
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectUsers } from "../redux/userReducer";
import {
  addPaymentMethodAsync,
  selectAddPayment,
} from "../redux/paymentReducer";
import { PlanModal } from "./";
import { useModal } from "../hook/useModal";
import {
  getListSubscriptionPricesAsync,
  selectSubscriptions,
} from "../redux/subscriptionReducer";
import { PLAN_PAYMENT_METHOD } from "./../utils/constants";

const AccountSetupModal = ({ visible, handleOk, handleCancel }) => {
  // const { updatedUserSuccess } = useSelector(selectUpdatedUserSuccess);
  const { addPaymentSuccess, isLoading } = useSelector(selectAddPayment);
  const [isStripeLoading, setIsStripeLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { close: closePlan, show: showPlan, visible: visiblePlan } = useModal();
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [planPaymentMethod, setPlanPaymentMethod] = useState(
    PLAN_PAYMENT_METHOD.MONTHLY
  );
  const { listSubscriptionPrices } = useSelector(selectSubscriptions);
  const { user } = useSelector(selectUsers);

  const subscriptionPrices = useMemo(() => {
    return _.orderBy(listSubscriptionPrices, "unit_amount");
  }, [listSubscriptionPrices]);

  useEffect(() => {
    dispatch(getListSubscriptionPricesAsync());
  }, [dispatch]);

  const handleSelectSubscription = (subscription) => {
    setSelectedSubscription(subscription);
  };

  const handleChangeTypePlan = (planPaymentMethodChanged) => {
    setPlanPaymentMethod(planPaymentMethodChanged);
  };

  const handleFinish = async (values) => {
    if (!stripe || !elements) {
      return;
    }
    setIsStripeLoading(true);

    try {
      const card = elements.getElement(CardElement);
      const { error: cardError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card,
        });

      setIsStripeLoading(false);

      if (cardError) {
        return;
      }

      dispatch(
        addPaymentMethodAsync({
          paymentMethod,
          user,
          priceID: selectedSubscription.id,
          planPaymentMethod: planPaymentMethod,
        })
      );
    } catch (e) {
      setIsStripeLoading(false);
    }
  };

  const { name, prices, annual_prices } = useMemo(() => {
    const subscription = selectedSubscription || _.first(subscriptionPrices);
    if (_.isEmpty(subscription)) {
      return {};
    }

    return _.get(subscription, "product.metadata");
  }, [selectedSubscription, subscriptionPrices]);

  useEffect(() => {
    if (subscriptionPrices?.length) {
      setSelectedSubscription(_.first(subscriptionPrices));
    }
  }, [subscriptionPrices]);

  useEffect(() => {
    if (addPaymentSuccess) {
      handleOk();
    }
  }, [addPaymentSuccess, handleOk]);

  useEffect(() => {
    if (user && subscriptionPrices?.length) {
      const priceId =
        user?.planSubscription?.priceId || subscriptionPrices[0]?.id;
      setPlanPaymentMethod(
        user?.planSubscription?.planPaymentMethod || PLAN_PAYMENT_METHOD.MONTHLY
      );
      setSelectedSubscription(
        subscriptionPrices.filter((item) => item.id === priceId)[0]
      );
    }
  }, [user, subscriptionPrices]);

  return (
    <>
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        destroyOnClose={true}
        mask={false}
        maskClosable={false}
        keyboard={false}
        centered
        width={840}
      >
        <h3 className="font-bold text-center text-2xl mb-6">Account Setup</h3>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{}}
        >
          <Row justify="end">
            <Col>
              <Button type="text" onClick={showPlan}>
                Change Plan
              </Button>
            </Col>
          </Row>
          <Form.Item
            name="cardNumber"
            label={`${name} (${
              planPaymentMethod === PLAN_PAYMENT_METHOD.ANNUAL
                ? annual_prices
                : prices
            })`}
            rules={[
              {
                required: true,
                message: "Please input card number",
              },
              {
                validator(__, value) {
                  console.log("card value", value);

                  if (_.get(value, "error")) {
                    return Promise.reject(_.get(value, "error.message"));
                  }
                  // if (EMAIL_REGEX.test(value) || !value) {
                  return Promise.resolve();
                  // }
                  // return Promise.reject(new Error('The email is invalid'))
                },
              },
            ]}
            shouldUpdate
          >
            <CardElement
              onChange={(data) => console.log("data", data)}
              className="card-element"
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </Form.Item>
          <Row justify="end" className="mt-6">
            {/* <Col>
              <Form.Item noStyle>
                <Button
                  className="md:min-w-200"
                  type="text"
                  size="large"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Back
                </Button>
              </Form.Item>
            </Col> */}
            <Col>
              <Form.Item noStyle shouldUpdate>
                <Button
                  className="md:min-w-200"
                  type="primary"
                  size="large"
                  htmlType="submit"
                  loading={isStripeLoading || isLoading}
                >
                  Next
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <PlanModal
        handleCancel={closePlan}
        handleOk={(data) => {
          handleSelectSubscription(data);
          closePlan();
        }}
        visible={visiblePlan}
        subscriptionPrices={subscriptionPrices}
        planPaymentMethod={planPaymentMethod}
        handleChangeTypePlan={handleChangeTypePlan}
      />
    </>
  );
};

export default AccountSetupModal;
