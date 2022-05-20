import React, { useEffect } from "react";
import { Row, Col, Form, Input, Button, Select, Option, Tabs } from "antd";

import LayoutComponent from "../../../components/Layout";
import TagsComponent from "./TagsComponent";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function callback(key) {
  console.log(key);
}

const TagsManage = () => {

  return (
    <LayoutComponent className="settings-page">
      <h1>
        Tags & Segments <span>SETTINGS</span>
      </h1>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <Tabs.TabPane tab=" 2 Tags" key="1">
          <TagsComponent />
        </Tabs.TabPane>
        <Tabs.TabPane tab="0 Segments" key="2">
          Segments
        </Tabs.TabPane>
      </Tabs>
    </LayoutComponent>
  );
};

export default TagsManage;
