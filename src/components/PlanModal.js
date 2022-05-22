import { Button, Card, Col, Modal, Radio, Row, Typography } from "antd";
import _ from "lodash";
import React from "react";

const PlanModal = ({
  visible,
  handleOk,
  handleCancel,
  subscriptionPrices,
  disabled,
}) => {
  const handleSelectSubscription = (subscription) => {
    handleOk(subscription);
  };

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
        Get Started with SuperPhone
      </Typography.Title>
      <Typography className={`mb-4 text-center`}>
        <p>
          Want to estimate your monthly spend?{" "}
          <span className="text-primary font-bold">
            Use our handy calculator
          </span>
        </p>
      </Typography>
      <Typography className={`mb-4 text-center`}>
        <p>
          Want to learn more about SMS Rates?{" "}
          <span className="text-primary font-bold">
            Check pricing by country
          </span>
        </p>
      </Typography>
      <div className="text-center my-8">
        <Radio.Group
          defaultValue="servicePlans"
          size="large"
          buttonStyle="solid"
        >
          <Radio.Button type="primary" value="servicePlans">
            Self Service Plans
          </Radio.Button>
          <Radio.Button value="enterprisePlans">Enterprise plans</Radio.Button>
        </Radio.Group>
      </div>
      <Row className="w-full">
        {_.map(subscriptionPrices, (subscription) => {
          const { unit_amount: unitAmount, id } = subscription;
          const product = _.get(subscription, "product", {});
          const { name, metadata = {}, key, code } = product;
          const { messages, prices, subscribers, descriptions } = metadata;
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
                      <p className="text-bold text-5xl my-2">{prices}</p>
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
