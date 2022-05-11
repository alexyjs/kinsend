import React, { useState, useRef } from "react";
import { Layout, Avatar, Menu, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, NavLink } from "react-router-dom";
import classnames from "classnames";

import { STORAGE_AUTH_KEY } from "../utils/constants";
import useLocalStorage from "../hook/userLocalStorage";
import { selectUsers, resetUserAsync } from "../redux/userReducer";
import LogoSVG from "../assets/svg/logo.svg";
import AvatarImg from "../assets/svg/avatar.png";
import {
  NotificationSVG,
  HistorySVG,
  SettingSVG,

  DashboardIcon,
  ArrowDownIcon,
} from "../assets/svg";
import { useOutsideAlerter } from '../hook/useOutSide';
import { authStorage } from '../utils';
import "./Layout.less";

const { Header, Footer, Sider, Content } = Layout;

const LayoutComponent = ({ className, children }) => {
  const { user } = useSelector(selectUsers);
  const [savedAuth, setAuth] = useLocalStorage(STORAGE_AUTH_KEY);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAuth();
    dispatch(resetUserAsync());
  };

  const handleClickOutside = () => {
    setShowMenu(false)
  }

  const handleShowMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu)
  }

  useOutsideAlerter(wrapperRef, handleClickOutside);

  return (
    <Layout className={classnames("layout", className)}>
      <Sider>
        <Menu
          theme="dark"
          // mode="horizontal"
          defaultSelectedKeys={["/"]}
          selectedKeys={[location.pathname]}
        >
          <Menu.Item key="dashboard">
            <NavLink to="/dashboard">
              <DashboardIcon />
            </NavLink>
          </Menu.Item>
          <Menu.Item key="history">
            <NavLink to="/">
              <HistorySVG />
            </NavLink>
          </Menu.Item>
          <Menu.Item key="notification">
            <NavLink to="/">
              <NotificationSVG />
            </NavLink>
          </Menu.Item>
          <Menu.Item key="profile">
            <NavLink to="/profile">
              <SettingSVG />
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="layout-content">
        <Header>
          <img src={LogoSVG} />
          <div ref={wrapperRef} className="header-menu">
            <div onClick={handleShowMenu} className="header-avatar-wrap">
              <Avatar src={AvatarImg} size={58}/>
              <ArrowDownIcon />
            </div>
            {showMenu && <div className="header-menu-content">
              <NavLink to="/profile" className="ant-btn ant-btn-text">
                Profile
              </NavLink>
              <Button type="text" onClick={handleLogout}>Log out</Button>
              </div>}
          </div>
        </Header>
        <Content>{children}</Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
