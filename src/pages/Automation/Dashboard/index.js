import React from "react";
import { Card, Row, Col } from "antd";

import { LogoSmallIcon } from "../../../assets/svg";

const Dashboard = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={true} className="rounded-3xl h-60">
            <div className="flex justify-between items-center">
              <span>Contact</span>
              <LogoSmallIcon />
            </div>
            <div>
              Lorem Ipsum Lorem Lorem Ipsum Lorem
              <br />
              Lorem Ipsum Lorem
            </div>
            <button className="absolute right-3 bottom-2 text-primary text-base underline">
              Customize
            </button>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={true} className="rounded-3xl h-60">
            <div className="flex justify-between items-center">
              <span>Contact</span>
              <LogoSmallIcon />
            </div>
            <div>
              Lorem Ipsum Lorem Lorem Ipsum Lorem
              <br />
              Lorem Ipsum Lorem
            </div>
            <button className="absolute right-3 bottom-2 text-primary text-base underline">
              Customize
            </button>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={true} className="rounded-3xl h-60">
            <div className="flex justify-between items-center">
              <span>Contact</span>
              <LogoSmallIcon />
            </div>
            <div>
              Lorem Ipsum Lorem Lorem Ipsum Lorem
              <br />
              Lorem Ipsum Lorem
            </div>
            <button className="absolute right-3 bottom-2 text-primary text-base underline">
              Customize
            </button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
