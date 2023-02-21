import { Button, Card, Col, Modal, Radio, Row, Typography } from "antd";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Switch } from "antd";
import classnames from "classnames";

import { PLAN_PAYMENT_METHOD } from "../utils/constants";

import "./PlanModal.less";

const PlanModal = ({
  visible,
  handleOk,
  handleCancel,
  subscriptionPrices,
  disabled,
  planPaymentMethod,
  handleChangeTypePlan,
}) => {
  const [planPaymentMethodState, setPlanPaymentMethodState] = useState(
    planPaymentMethod || PLAN_PAYMENT_METHOD.MONTHLY
  );
  const handleSelectSubscription = (subscription) => {
    handleOk(subscription);
  };

  useEffect(() => {
    setPlanPaymentMethodState(planPaymentMethod);
  }, [planPaymentMethod]);

  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      destroyOnClose={true}
      centered
      width="80%"
    >
      <Typography.Title level={1} className="text-center">
        Get Started with Kinsend
      </Typography.Title>
      <div className="w-tabs-list-h mt-4">
        <button
          className={classnames("w-tabs-item", {
            active: planPaymentMethodState !== PLAN_PAYMENT_METHOD.ANNUAL,
          })}
          onClick={() => handleChangeTypePlan(PLAN_PAYMENT_METHOD.MONTHLY)}
        >
          Monthly
        </button>
        <button
          className={classnames("w-tabs-item", {
            active: planPaymentMethodState === PLAN_PAYMENT_METHOD.ANNUAL,
          })}
          onClick={() => handleChangeTypePlan(PLAN_PAYMENT_METHOD.ANNUAL)}
        >
          Annual
        </button>
      </div>
      <div className="text-center my-8">
        <Radio.Group
          defaultValue="servicePlans"
          size="large"
          buttonStyle="solid"
        >
          <Radio.Button type="primary" value="servicePlans">
            Self Service Plans
          </Radio.Button>
          {/* <Radio.Button value="enterprisePlans">Enterprise plans</Radio.Button> */}
        </Radio.Group>
      </div>
      <Row className="w-full">
        {_.map(subscriptionPrices, (subscription) => {
          const { unit_amount: unitAmount, id } = subscription;
          const product = _.get(subscription, "product", {});
          const { name, metadata = {}, key, code } = product;
          const { messages, prices, annual_prices, subscribers, descriptions } =
            metadata;
          return (
            <Col sm={{ span: 8 }} key={id}>
              <Card
                headStyle={{
                  background: "#f5f5f5",
                }}
                header
                title={
                  <>
                    <div className="text-center bg-gray-1">
                      <p className="uppercase text-bold text-lg mb-2">{name}</p>
                      <p className="text-bold text-5xl my-2">
                        {planPaymentMethod === PLAN_PAYMENT_METHOD.ANNUAL
                          ? annual_prices
                          : prices}
                      </p>
                      {/* <p className='text-bold text-5xl my-2'>
                        {accounting.formatMoney(unitAmount / 100 )}/m
                        </p> */}
                      <p className="text-sm">Ideal if you</p>
                      <p className="text-sm">Have {subscribers} subscribers</p>
                      <p className="text-sm">Send {messages} Messages</p>
                    </div>
                  </>
                }
              >
                <div className="text-center">
                  {_.map(_.split(descriptions, "#"), (desc, index) => {
                    return (
                      <Typography.Paragraph key={index}>
                        {desc}
                      </Typography.Paragraph>
                    );
                  })}

                  <Button
                    className="mt-4"
                    size="large"
                    type="primary"
                    disabled={disabled}
                    onClick={() => handleSelectSubscription(subscription)}
                  >
                    Select plan
                  </Button>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Modal>
  );
};

export default PlanModal;
