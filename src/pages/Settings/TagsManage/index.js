import React from "react";
import { Tabs } from "antd";
import { useSelector } from "react-redux";

import LayoutComponent from "../../../components/Layout";
import TagsList from "./TagsList";

import { selectSettings } from "../../../redux/settingsReducer";

function callback(key) {
  console.log(key);
}

const TagsManage = () => {
  const { tags } = useSelector(selectSettings);
  return (
    <LayoutComponent className="settings-page">
      <h1>
        Tags & Segments <span>SETTINGS</span>
      </h1>
      <Tabs defaultActiveKey="1" onChange={callback} className="mt-10">
        <Tabs.TabPane tab={`${tags?.length}  Tags`} key="1">
          <TagsList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="0 Segments" key="2">
          Segments
        </Tabs.TabPane>
      </Tabs>
    </LayoutComponent>
  );
};

export default TagsManage;
