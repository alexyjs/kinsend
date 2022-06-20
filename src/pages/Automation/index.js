import React from "react";
import { useParams } from "react-router-dom";
import { Tabs, Button } from "antd";

import LayoutComponent from "../../components/Layout";
import Dashboard from "./Dashboard";

const Automation = () => {
  let { tabname } = useParams();

  const handleChangeTab = () => {};
  return (
    <LayoutComponent className="settings-page">
      <div className="flex justify-between items-center">
        <h1>Automation</h1>
        <Button type="primary" size="large" className="w-48	">
          New
        </Button>
      </div>
      <Tabs
        defaultActiveKey="active"
        onChange={handleChangeTab}
        className="mt-10"
      >
        <Tabs.TabPane tab="Explore" key="explore" disabled>
          Explore
        </Tabs.TabPane>
        <Tabs.TabPane tab="My Automation" key="active">
          <Dashboard />
        </Tabs.TabPane>
      </Tabs>
    </LayoutComponent>
  );
};

export default Automation;
