import React, { useState, useRef } from "react";
import { Layout, Avatar, Menu, Button } from "antd";
import {
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, NavLink } from "react-router-dom";
import classnames from "classnames";
import { UserOutlined } from "@ant-design/icons";

import { STORAGE_AUTH_KEY } from "../utils/constants";
import useLocalStorage from "../hook/userLocalStorage";
import { selectUsers, resetUserAsync } from "../redux/userReducer";
import LogoSVG from "../assets/svg/logo.svg";
import {
  NotificationSVG,
  HistorySVG,
  SettingSVG,
  DashboardIcon,
  ArrowDownIcon,
} from "../assets/svg";
import { useOutsideAlerter } from "../hook/useOutSide";
import "./Layout.less";

const { Header, Footer, Sider, Content } = Layout;

const LayoutComponent = ({ className, children }) => {
  const { user } = useSelector(selectUsers);
  const [savedAuth, setAuth] = useLocalStorage(STORAGE_AUTH_KEY);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const [collapsed, setCollapsed] = useState(true);
  const [isHover, setHover] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAuth();
    dispatch(resetUserAsync());
  };

  const handleClickOutside = () => {
    setShowMenu(false);
  };

  const handleShowMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useOutsideAlerter(wrapperRef, handleClickOutside);

  return (
    <Layout className={classnames("layout", className)}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Button
          className="collapsed-btn"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
        </Button>
        <Menu
          theme="light"
          // mode="horizontal"
          defaultSelectedKeys={["/"]}
          selectedKeys={[location.pathname]}
          inlineCollapsed={collapsed}
          className={[{ "menu-hover": isHover }]}
        >
          <Menu.Item key="dashboard">
            <NavLink
              to="/dashboard"
              onMouseOver={() => setHover(true)}
              onMouseOut={() => setHover(false)}
            >
              <DashboardIcon />{" "}
              <span className="menu-item-label">Dashboard</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="history">
            <NavLink
              to="/"
              onMouseOver={() => setHover(true)}
              onMouseOut={() => setHover(false)}
            >
              <HistorySVG />
              <span className="menu-item-label">Messaging</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="notification">
            <NavLink
              to="/"
              onMouseOver={() => setHover(true)}
              onMouseOut={() => setHover(false)}
            >
              <NotificationSVG />
              <span className="menu-item-label">Campaigns</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="profile">
            <NavLink
              to="/settings/profile"
              onMouseOver={() => setHover(true)}
              onMouseOut={() => setHover(false)}
            >
              <SettingSVG />
              <span className="menu-item-label">Settings</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="layout-content">
        <Header>
          <img src={LogoSVG} />
          <div ref={wrapperRef} className="header-menu">
            <div onClick={handleShowMenu} className="header-avatar-wrap">
              <Avatar
                src={user?.image || ""}
                size={58}
                icon={<UserOutlined />}
              />
              <ArrowDownIcon className="arrow-down-icon" />
            </div>
            {showMenu && (
              <div className="header-menu-content">
                <NavLink
                  to="/settings/profile"
                  className="ant-btn ant-btn-text"
                >
                  Profile
                </NavLink>
                <Button type="text" onClick={handleLogout}>
                  Log out
                </Button>
              </div>
            )}
          </div>
        </Header>
        <Content>{children}</Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
