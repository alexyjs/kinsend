import React, { useState, useRef, useMemo } from "react";
import { Layout, Avatar, Menu, Button } from "antd";
import {
  DoubleRightOutlined,
  DoubleLeftOutlined,
  PartitionOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, NavLink } from "react-router-dom";
import classnames from "classnames";
import { UserOutlined } from "@ant-design/icons";

import { STORAGE_AUTH_KEY } from "../../utils/constants";
import useLocalStorage from "../../hook/userLocalStorage";
import { selectUsers, resetUserAsync } from "../../redux/userReducer";
import LogoSVG from "../../assets/svg/logo.svg";
import {
  NotificationSVG,
  HistorySVG,
  SettingSVG,
  ArrowDownIcon,
  AutomationRobotIcon,
  AutoResponse,
} from "../../assets/svg";
import { useOutsideAlerter } from "../../hook/useOutSide";
import "./styles.less";

const { Header, Sider, Content } = Layout;

const LayoutComponent = ({ className, children, title }) => {
  const { user } = useSelector(selectUsers);
  const [savedAuth, setAuth] = useLocalStorage(STORAGE_AUTH_KEY);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const [collapsed, setCollapsed] = useState(true);
  const [isHover, setHover] = useState(false);
  const [isShowMenuMobile, setShowMenuMobile] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleShowMenuMobile = () => {
    setShowMenuMobile(!isShowMenuMobile);
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

  const desktopRender = useMemo(() => {
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
            defaultSelectedKeys={["/"]}
            selectedKeys={[location.pathname]}
            inlineCollapsed={collapsed}
            className={[{ "menu-hover": isHover }]}
          >
            <Menu.Item key="message">
              <NavLink
                to="/message"
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
              >
                <HistorySVG />
                <span className="menu-item-label">Messaging</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="notification">
              <NavLink
                to="/updates"
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
              >
                <NotificationSVG />
                <span className="menu-item-label">Updates</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="automation">
              <NavLink
                to="/automation/active"
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
              >
                <AutomationRobotIcon />
                <span className="menu-item-label">Automations</span>
              </NavLink>
            </Menu.Item>
            <Menu.SubMenu
              title={
                <div>
                  <SettingSVG
                    onMouseOver={() => setHover(true)}
                    onMouseOut={() => setHover(false)}
                  />
                  <span className="menu-item-label">Settings</span>
                </div>
              }
            >
              <Menu.Item key="settings-form">
                <NavLink to="/settings/forms">
                  <span>Forms & Widgets</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="settings-tag">
                <NavLink to="/settings/tags">
                  <span>Tags & Segments</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="settings-import">
                <NavLink to="/settings/csv-contacts-import">
                  <span>Contact Import</span>
                </NavLink>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="automated-responses">
              <NavLink
                to="/automated-responses"
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
              >
                <AutoResponse />
                <span className="menu-item-label">Automated Reponses</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content">
          <Header>
            <NavLink to="/message">
              <img src={LogoSVG} />
            </NavLink>
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
          {/* <Footer></Footer> */}
        </Layout>
      </Layout>
    );
  });

  const mobileRender = useMemo(() => {
    return (
      <Layout className={classnames("layout", className)}>
        <Layout className="layout-content">
          <Header>
            <div
              className="layout-mobile-mobile"
              onClick={toggleShowMenuMobile}
            >
              {/* <MenuUnfoldOutlined /> */}
              <div className="menu-hamburger">
                <div className="menu-hamburger-line" />
              </div>
            </div>
            <div className="flex-auto layout-mobile-title p-2">{title}</div>
          </Header>
          {isShowMenuMobile && (
            <div className="menu-mobile-popup">
              <div className="menu-mobile-popup-content">
                <NavLink to="/message">
                  <img src={LogoSVG} />
                </NavLink>
                <div className="header-menu px-5 py-3">
                  <div className="header-avatar-wrap">
                    <Avatar
                      src={user?.image || ""}
                      size={58}
                      icon={<UserOutlined />}
                    />
                    <span className="pl-4 bold">
                      {user?.firstName} {user?.lastName}
                    </span>
                  </div>
                  <div className="header-menu-content">
                    <NavLink
                      to="/settings/profile"
                      className="ant-btn ant-btn-text pl-0 text-xs	"
                    >
                      Profile
                    </NavLink>
                    <Button
                      type="text"
                      onClick={handleLogout}
                      className="text-xs	"
                    >
                      Log out
                    </Button>
                  </div>
                </div>
                <Menu
                  theme="light"
                  defaultSelectedKeys={["/"]}
                  selectedKeys={[location.pathname]}
                  className={[{ "menu-hover": isHover }]}
                >
                  <Menu.Item key="message">
                    <NavLink
                      to="/message"
                      onMouseOver={() => setHover(true)}
                      onMouseOut={() => setHover(false)}
                    >
                      <HistorySVG />
                      <span className="menu-item-label">Messaging</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="notification">
                    <NavLink
                      to="/updates"
                      onMouseOver={() => setHover(true)}
                      onMouseOut={() => setHover(false)}
                      className="menu-mobile-update"
                    >
                      <NotificationSVG />
                      <span className="menu-item-label">Updates</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="automation">
                    <NavLink
                      to="/automation/active"
                      onMouseOver={() => setHover(true)}
                      onMouseOut={() => setHover(false)}
                    >
                      <AutomationRobotIcon />
                      <span className="menu-item-label">Automations</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.SubMenu
                    title={
                      <div>
                        <SettingSVG
                          onMouseOver={() => setHover(true)}
                          onMouseOut={() => setHover(false)}
                        />
                        <span className="menu-item-label">Settings</span>
                      </div>
                    }
                  >
                    <Menu.Item key="settings-form">
                      <NavLink to="/settings/forms">
                        <span>Forms & Widgets</span>
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item key="settings-tag">
                      <NavLink to="/settings/tags">
                        <span>Tags & Segments</span>
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item key="settings-import">
                      <NavLink to="/settings/csv-contacts-import">
                        <span>Contact Import</span>
                      </NavLink>
                    </Menu.Item>
                  </Menu.SubMenu>
                  <Menu.Item key="automated-responses">
                    <NavLink
                      to="/automated-responses"
                      onMouseOver={() => setHover(true)}
                      onMouseOut={() => setHover(false)}
                    >
                      <AutoResponse />
                      <span className="menu-item-label">
                        Automated Responses
                      </span>
                    </NavLink>
                  </Menu.Item>
                </Menu>
              </div>
              <div
                className="menu-mobile-popup-backdrop"
                onClick={toggleShowMenuMobile}
              ></div>
            </div>
          )}
          <Content>{children}</Content>
          {/* <Footer></Footer> */}
        </Layout>
      </Layout>
    );
  });

  return (
    <>
      <div className="layout-desktop">{desktopRender}</div>
      <div className="layout-mobile">{mobileRender}</div>
    </>
  );
};

export default LayoutComponent;
