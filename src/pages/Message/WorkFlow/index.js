import React from "react";
import { Row, Col, Card } from "antd";
import { CheckCircleOutlined, CheckCircleFilled } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const WorkFlow = ({ vcardData, forms }) => {
  return (
    <Row gutter={16}>
      <Col md={12} xs={24} className="mb-4">
        <Card bordered={true} className="rounded-3xl h-35 pl-2 pr-2">
          <div className="flex flex-col justify-between items-start">
            <NavLink
              to="/settings/profile"
              className="flex items-center py-1 w-full"
            >
              {!vcardData?.firstName ? (
                <CheckCircleFilled style={{ color: "#36B37E" }} />
              ) : (
                <CheckCircleOutlined style={{ color: "#bcbcbc" }} />
              )}
              <span className="ml-2">Vcard</span>
            </NavLink>
            <div className="mt-2">
              VCard updated for subscribers to save your contact information in
              their phone
            </div>
          </div>
        </Card>
      </Col>
      <Col md={12} xs={24} className="mb-4">
        <Card bordered={true} className="rounded-3xl h-35 pl-2 pr-2">
          <div className="flex flex-col justify-between items-start">
            <NavLink
              to="/settings/forms/new"
              className="flex items-center py-1 w-full"
            >
              {forms?.length ? (
                <CheckCircleFilled style={{ color: "#36B37E" }} />
              ) : (
                <CheckCircleOutlined style={{ color: "#bcbcbc" }} />
              )}
              <span className="ml-2">Subscribers Intake Form</span>
            </NavLink>

            <div className="mt-2">
              Form landing page created to collect new subscribers' information
              in your phonebook
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default WorkFlow;
