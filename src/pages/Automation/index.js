import React from "react";
import { useParams, NavLink } from "react-router-dom";
import { Tabs, Button } from "antd";

import LayoutComponent from "../../components/Layout";
import Dashboard from "./Dashboard";

const Automation = () => {
  let { tabname } = useParams();

  const handleChangeTab = () => {};
  return (
    <LayoutComponent className="settings-page" title="Automation">
      <div className="flex justify-between items-center md:flex-row flex-col">
        <h1>Automation</h1>
        <NavLink to="/automation/new">
          <Button type="primary" size="large" className="w-48	md:mt-0 mt-4">
            New
          </Button>
        </NavLink>
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
