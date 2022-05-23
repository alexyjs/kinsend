import { ConfigProvider } from "antd-country-phone-input";
import "antd-country-phone-input/dist/index.css";
import "flagpack/dist/flagpack.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import en from "world_countries_lists/data/countries/en/world.json";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import FormManage from "./pages/Settings/Form";
import AddNewForm from "./pages/Settings/Form/AddNewForm";
import TagsManage from "./pages/Settings/TagsManage";
import "./styles/antd.less";
import "./styles/tailwind.css";
import "./App.less";
import { STORAGE_AUTH_KEY } from "./utils/constants";
import useLocalStorage from "./hook/userLocalStorage";
import PaymentSetup from "./pages/PaymentSetup";
import Profile from "./pages/Profile";
import { getUserAsync, selectUsers } from "./redux/userReducer";
import { authStorage } from "./utils";

function App() {
  const [savedAuth, setAuth] = useLocalStorage(STORAGE_AUTH_KEY);
  const { user } = useSelector(selectUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (savedAuth) {
      dispatch(getUserAsync());
    }
  }, [savedAuth]);
  const isAuth = authStorage.get();

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
          {isAuth && <Route path="/settings/profile" element={<Profile />} />}
          {isAuth && <Route path="/payment-setup" element={<PaymentSetup />} />}
          {isAuth && <Route path="/dashboard" element={<Dashboard />} />}
          {/* {isAuth && <Route path="/settings/forms" element={<Dashboard />} />} */}

          {isAuth && <Route path="/settings/tags" element={<TagsManage />} />}

          {isAuth && <Route path="/settings/forms" element={<FormManage />} />}
          {isAuth && (
            <Route path="/settings/forms/new" element={<AddNewForm />} />
          )}
          {/* {isAuth && <Route path="/settings/custom-fields" element={<FormManage />} />} */}
          {isAuth ? (
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </ConfigProvider>
    </main>
  );
}

export default App;
