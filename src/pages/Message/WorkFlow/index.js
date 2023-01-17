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
              {vcardData?.firstName ? (
                <CheckCircleFilled style={{ fontSize: "1.6em", color: "#36B37E" }} />
              ) : (
                <CheckCircleOutlined style={{ fontSize: "1.6em", color: "#bcbcbc" }} />
              )}
              <span className="font-bold text-xl ml-2">Update vCard</span>
              {!forms?.length && <span className="ml-2">{"(Incomplete)"}</span>}
            </NavLink>
            <div className="mt-1">
              vCard updated for subscribers to save your contact information in
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
                <CheckCircleFilled style={{ fontSize: "1.6em", color: "#36B37E" }} />
              ) : (
                <CheckCircleOutlined style={{ fontSize: "1.6em", color: "#bcbcbc" }} />
              )}
              <span className="font-bold text-xl ml-2">Create Form</span>
              {!forms?.length && <span className="ml-2">{"(Incomplete)"}</span>}
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
