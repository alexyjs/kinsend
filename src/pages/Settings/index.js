import React, { useEffect } from "react";
import { Row, Col, Form, Input, Button, Select, Option, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";

import LayoutComponent from '../../components/Layout';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function callback(key) {
  console.log(key);
}

const Settings = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  return (
    <LayoutComponent  className="settings-page">
      <h1>
        Forms & Widgets <span>SETTINGS</span>
      </h1>
      <Tabs defaultActiveKey="1" onChange={callback}>
      <Tabs.TabPane tab="1 Forrm" key="1">
        Content of Tab Pane 1
      </Tabs.TabPane>
      <Tabs.TabPane tab="Tab 2" key="2">
        Tabs.TabPane of Tab Pane 2
      </Tabs.TabPane>
      <Tabs.TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </Tabs.TabPane>
    </Tabs>
    </LayoutComponent>
  );
};

export default Settings;
