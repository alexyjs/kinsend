import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Divider, Form, Input, Button, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import SideBarUpdate from "./components/SideBarUpdate";

// import {
//   selectUsers,
//   patchUserAsync,
// } from "../../redux/userReducer";
import LayoutComponent from "../../components/Layout";
import { UpdateDashboardEmptyIcon } from "../../assets/svg";

import "./styles.less";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Profile = () => {
  const [form] = Form.useForm();
  const [formReset] = Form.useForm();
  const dispatch = useDispatch();
  // const { user, isLoading } = useSelector(selectUsers);

  return (
    <LayoutComponent className="updates-page">
      <div className="flex-auto flex items-center justify-center flex-col	updates-page-content">
        <UpdateDashboardEmptyIcon />
        <p> You have no upcoming updates</p>
        <NavLink to="/updates/scheduled/new">
          <Button type="primary">New Update</Button>
        </NavLink>
      </div>
      <SideBarUpdate />
    </LayoutComponent>
  );
};

export default Profile;
