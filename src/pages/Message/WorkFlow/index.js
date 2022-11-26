import React from "react";
import { Row, Col, Checkbox, Card } from "antd";
import { NavLink } from "react-router-dom";

const WorkFlow = ({ vcardData, forms }) => {
  return (
    <Row gutter={16}>
      <Col md={12} xs={24} className="mb-4">
        <Card bordered={true} className="rounded-3xl h-35 pl-2 pr-2">
          <div className="flex flex-col justify-between items-start">
            <Checkbox checked={vcardData?.id}>
              <NavLink to="/settings/profile">Vcard</NavLink>
            </Checkbox>
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
            <Checkbox checked={forms?.length}>
              <NavLink to="/settings/forms/new">
                Subscribers Intake Form
              </NavLink>
            </Checkbox>

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
