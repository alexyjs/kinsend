import React, { useEffect } from "react";
import { Row, Col, Form, Input, Button, Select, Option, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";

import LayoutComponent from './../../../components/Layout';
import CustomField from "../CustomField";
import { getTagsAsync } from "../../../redux/settingsReducer";

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

  useEffect(() => {
    dispatch(getTagsAsync());
  }, [useDispatch]);

  return (
    <LayoutComponent  className="settings-page">
      <h1>
        Forms & Widgets <span>SETTINGS</span>
      </h1>
      <Tabs defaultActiveKey="1" onChange={callback} className="mt-10">
        <Tabs.TabPane tab="0 Form" key="1">

        </Tabs.TabPane>
        <Tabs.TabPane tab="0 Widget" key="2">
          Widget
        </Tabs.TabPane>
        <Tabs.TabPane tab="0 Custom fields" key="3">
          <CustomField />
        </Tabs.TabPane>
      </Tabs>
    </LayoutComponent>
  );
};

export default Settings;
