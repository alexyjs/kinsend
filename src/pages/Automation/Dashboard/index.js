import React, { useEffect, useMemo } from "react";
import { Card, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Button, Dropdown, Space, Menu } from "antd";
import { NavLink } from "react-router-dom";

import {
  getAutomationListAsync,
  selectAutomation,
  deleteAutomationAsync,
} from "../../../redux/automationReducer";

import { LogoSmallIcon } from "../../../assets/svg";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { automationList } = useSelector(selectAutomation);

  const handleEnableDisable = (checked) => {};
  const handleDeleteAutomation = (id) => {
    dispatch(deleteAutomationAsync(id));
  };

  const menu = (item) => {
    return (
      <Menu onSelect={(e) => console.log(e)}>
        <Menu.Item className="capitalize">
          <NavLink
            to={`/automation/edit/${item?.id}`}
            className="inline-flex items-center"
          >
            Edit/View
          </NavLink>
        </Menu.Item>
        <Menu.Item
          className="capitalize"
          onClick={() => handleDeleteAutomation(item.id)}
        >
          <span className="inline-flex items-center">Delete</span>
        </Menu.Item>
      </Menu>
    );
  };

  useEffect(() => {
    dispatch(getAutomationListAsync());
  }, []);

  return (
    <div>
      <Row gutter={16}>
        {automationList.map((item) => (
          <Col span={8} className="mb-4">
            <Card bordered={true} className="rounded-3xl h-60">
              <div className="flex justify-between items-center">
                <span>
                  {item?.type === "FIRST_MESSAGE"
                    ? "First messenge"
                    : item?.type === "CONTACT_CREATED"
                    ? "Contact Created"
                    : "Contact Tagged"}
                </span>
                <LogoSmallIcon />
              </div>
              <h2 className="font-bold text-xl mb-6">{item?.title}</h2>
              <div className="absolute right-3 bottom-2 left-3 flex justify-between">
                <Dropdown overlay={menu(item)}>
                  <Button
                    className="capitalize border-0 underline shadow-none"
                    type="primary"
                  >
                    <Space>
                      Actions
                      {/* <DownOutlined /> */}
                    </Space>
                  </Button>
                </Dropdown>
                <Switch defaultChecked onChange={handleEnableDisable} />
              </div>
            </Card>
          </Col>
        ))}

        {!automationList.length && (
          <div className="flex items-center justify-center w-60 h-60 mx-auto font-bold text-xxl">
            You don’t have any automation
          </div>
        )}
      </Row>
    </div>
  );
};

export default Dashboard;
