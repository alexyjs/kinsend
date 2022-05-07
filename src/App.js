import { Button, Layout, Menu } from "antd";
import { ConfigProvider } from "antd-country-phone-input";
import "antd-country-phone-input/dist/index.css";
import "flagpack/dist/flagpack.css";
import {
  Route,
  Routes,
  NavLink,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import en from "world_countries_lists/data/countries/en/world.json";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import "./styles/antd.less";
import "./styles/tailwind.css";
import "./App.less";
import { STORAGE_AUTH_KEY } from "./utils/constants";
import useLocalStorage from "./hook/userLocalStorage";
import PaymentSetup from "./pages/PaymentSetup";
import {
  selectUsers,
  patchUserAsync,
  resetUserAsync,
} from "./redux/userReducer";
import { authStorage } from "./utils";

const { Header } = Layout;
function App() {
  const [savedAuth, setAuth] = useLocalStorage(STORAGE_AUTH_KEY);
  const location = useLocation();
  const { user } = useSelector(selectUsers);
  const dispatch = useDispatch();

  const handleLogout = () => {
    setAuth();
    dispatch(resetUserAsync());
  };

  useEffect(() => {
    if (savedAuth) {
      dispatch(patchUserAsync());
    }
  }, [savedAuth]);

  const isAuth = authStorage.get();
  // console.log("###isAuth:", isAuth);
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
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment-setup" element={<PaymentSetup />} />
          {isAuth && <Route path="/dashboard" element={<Dashboard />} />}
          {!isAuth ? (
            <Route path="*" element={<Navigate to="/login" replace />} />
          ) : (
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          )}
        </Routes>
      </ConfigProvider>
    </main>
  );
}

export default App;
