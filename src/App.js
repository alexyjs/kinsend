import { ConfigProvider } from "antd-country-phone-input";
import "antd-country-phone-input/dist/index.css";
import "flagpack/dist/flagpack.css";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import en from "world_countries_lists/data/countries/en/world.json";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Message from "./pages/Message";
import MessageDetail from "./pages/Message/MessageDetail";
import FormManage from "./pages/Settings/Form";
import AddNewForm from "./pages/Settings/Form/AddNewForm";
import TagsManage from "./pages/Settings/TagsManage";
import PublicFormSumission from "./pages/Public/FormSubmission";
import PublicThankYouSubmission from "./pages/Public/ThankYouSubmission";
import Automation from "./pages/Automation";
import AddNewAutomation from "./pages/Automation/AddNewAutomation";
import UpdatesDashboard from "./pages/Updates";
import AddNewUpdates from "./pages/Updates/AddNewUpdates";
import EditUpdates from "./pages/Updates/UpdatesDetail";

import { STORAGE_AUTH_KEY } from "./utils/constants";
import useLocalStorage from "./hook/userLocalStorage";
import PaymentSetup from "./pages/PaymentSetup";
import Profile from "./pages/Profile";
import { getUserAsync, selectUsers } from "./redux/userReducer";
import { authStorage, getCname } from "./utils";

import "./styles/antd.less";
import "./styles/tailwind.css";
import "./App.less";

function App() {
  const [savedAuth, setAuth] = useLocalStorage(STORAGE_AUTH_KEY);
  const { user } = useSelector(selectUsers);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (savedAuth) {
      dispatch(getUserAsync());
    }
  }, [savedAuth]);

  useEffect(() => {
    if (user && user.id && !user?.isEnabledBuyPlan) {
      navigate("/payment-setup");
    }
  }, [user]);

  const isAuth = authStorage.get();
  const cname = getCname();

  if (cname) {
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
            <Route path="/thank-you" element={<PublicThankYouSubmission />} />
            <Route path="/f/:id" element={<PublicFormSumission />} />
            <Route path="*" element={<PublicFormSumission />} />
          </Routes>
        </ConfigProvider>
      </main>
    );
  }

  if (isAuth) {
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
            <Route path="/thank-you" element={<PublicThankYouSubmission />} />
            <Route path="/f/:id" element={<PublicFormSumission />} />
            <Route path="/settings/profile" element={<Profile />} />
            <Route path="/payment-setup" element={<PaymentSetup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/message" element={<Message />} />
            <Route path="/message/:messageId" element={<MessageDetail />} />

            <Route path="/settings/tags" element={<TagsManage />} />
            <Route path="/settings/forms" element={<FormManage />} />
            <Route path="/settings/forms/new" element={<AddNewForm />} />
            <Route path="/settings/forms/edit/:id" element={<AddNewForm />} />

            <Route path="/automation/new" element={<AddNewAutomation />} />
            <Route path="/automation/edit/:id" element={<AddNewAutomation />} />
            {/* explore | new | active */}
            <Route path="/automation/:tabname" element={<Automation />} />

            <Route path="/updates" element={<UpdatesDashboard />} />
            <Route
              path="/updates/scheduled/:updatesId"
              element={<AddNewUpdates />}
            />
            <Route path="/updates/scheduled/new" element={<AddNewUpdates />} />
            <Route
              path="/updates/detail/:updatesId"
              element={<EditUpdates />}
            />
            <Route path="*" element={<Navigate to="/message" replace />} />
          </Routes>
        </ConfigProvider>
      </main>
    );
  }

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
          <Route path="/thank-you" element={<PublicThankYouSubmission />} />
          <Route path="/f/:id" element={<PublicFormSumission />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </ConfigProvider>
    </main>
  );
}

export default App;
