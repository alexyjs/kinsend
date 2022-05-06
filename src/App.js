import { Button, Layout, Menu } from "antd";
import { ConfigProvider } from "antd-country-phone-input";
import "antd-country-phone-input/dist/index.css";
import "flagpack/dist/flagpack.css";
import { Route, Routes, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import en from "world_countries_lists/data/countries/en/world.json";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UIKit from "./pages/UIKit";
import Dashboard from "./pages/Dashboard";
import "./styles/antd.less";
import "./styles/tailwind.css";
import "./App.less";
import { STORAGE_AUTH_KEY } from "./utils/constants";
import useLocalStorage from "./pages/hook/userLocalStorage";
import PaymentSetup from "./pages/PaymentSetup";
import { selectUsers } from "./redux/userReducer";

const { Header } = Layout;
function App() {
  const [savedAuth, setAuth] = useLocalStorage(STORAGE_AUTH_KEY);
  const location = useLocation();
  const { user } = useSelector(selectUsers);

  return (
    <main>
      <ConfigProvider
        locale={en}
        areaMapper={(area) => {
          return {
            ...area,
            emoji: <span className={`fp ${area.short.toLowerCase()}`} />,
          };
        }}
      >
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["/"]}
            selectedKeys={[location.pathname]}
          >
            <Menu.Item key="home">
              <NavLink to="/">Home</NavLink>
            </Menu.Item>
            {!user && (
              <Menu.Item key="sign-up">
                <NavLink to="/sign-up">Sign Up</NavLink>
              </Menu.Item>
            )}
            {!user && (
              <Menu.Item key="/login">
                <NavLink to="/login">Login</NavLink>
              </Menu.Item>
            )}
            <Menu.Item key="ui-kit">
              <NavLink to="/ui-kit">UI Kit</NavLink>
            </Menu.Item>
            <Menu.Item key="/dashboard">
              <NavLink to="/dashboard">Dashboard</NavLink>
            </Menu.Item>
            <Menu.Item key="/payment-setup">
              <NavLink to="/payment-setup">Payment Setup</NavLink>
            </Menu.Item>
            {user && (
              <Menu.Item key="/log-out">
                <Button type="text" onClick={() => setAuth()}>
                  Log out
                </Button>
              </Menu.Item>
            )}
          </Menu>
        </Header>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ui-kit" element={<UIKit />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payment-setup" element={<PaymentSetup />} />
        </Routes>
      </ConfigProvider>
    </main>
  );
}

export default App;