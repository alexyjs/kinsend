import React, { useEffect } from "react";
import { Form, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";

import LayoutComponent from "./../../../components/Layout";
import CustomField from "../CustomField";
import FormList from "./FormList";
import { getTagsAsync, selectSettings } from "../../../redux/settingsReducer";

function callback(key) {
  console.log(key);
}

const Settings = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { customFields, forms } = useSelector(selectSettings);

  useEffect(() => {
    dispatch(getTagsAsync());
  }, [useDispatch]);

  return (
    <LayoutComponent className="settings-page" title="Setting">
      <h1>
        Forms & Widgets <span>SETTINGS</span>
      </h1>
      <Tabs defaultActiveKey="1" onChange={callback} className="mt-10">
        <Tabs.TabPane tab={`${forms?.length || 0} Form`} key="1">
          <FormList />
        </Tabs.TabPane>
        {/* <Tabs.TabPane tab="0 Widget" key="2">
          Widget
        </Tabs.TabPane> */}
        <Tabs.TabPane
          tab={`${customFields?.length || 0} Custom fields`}
          key="3"
        >
          <CustomField />
        </Tabs.TabPane>
      </Tabs>
    </LayoutComponent>
  );
};

export default Settings;
