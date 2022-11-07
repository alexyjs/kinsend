import { Button, Divider, Form, Input, Typography } from "antd";
import _ from "lodash";
import React, { memo, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  loginAsync,
  loginWithGoogleAsync,
  selectUsers,
} from "../../redux/userReducer";
import { EMAIL_REGEX } from "../../utils/validations";
import { ResendPasswordModal } from "../../components";
import { useModal } from "../../hook/useModal";
import "./styles.less";

const { Title } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector(selectUsers);
  const { close, show, visible } = useModal();
  let navigate = useNavigate();
  const handleFinish = (values) => {
    try {
      dispatch(loginAsync(values));
    } catch {}
  };

  const responseGoogle = (response) => {
    if (response?.accessToken) {
      handleLogin(response);
    }
  };

  const handleLogin = (googleData) => {
    try {
      dispatch(
        loginWithGoogleAsync({
          idToken: _.get(googleData, "tokenId"),
          accessToken: _.get(googleData, "accessToken"),
          provider: "google",
        })
      );
    } catch {}
  };

  useEffect(() => {
    if (user) {
      if (user?.isEnabledBuyPlan && user?.phoneSystem?.length) {
        // navigate("/dashboard");
        navigate("/message");
      } else {
        navigate("/payment-setup");
      }
    }
  }, [user, user?.isEnabledBuyPlan]);

  return (
    <div className="grid place-items-center min-h-screen signin-page">
      <div className="container mx-auto px-4">
        <div className="signin-page-content">
          <Title className="text-center">Login</Title>
          <Form layout="vertical" onFinish={handleFinish} initialValues={{}}>
            <Form.Item
              name="email"
              label="email"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
                {
                  validator(_, value) {
                    if (EMAIL_REGEX.test(value) || !value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("The email is invalid"));
                  },
                },
              ]}
            >
              <Input size="large" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input type="password" size="large" />
            </Form.Item>
            <div>
              <Typography className={`mb-8`}>
                <p>
                  <span className="underline no-underline">
                    Forgot your password?{" "}
                  </span>
                  <span
                    className="text-primary font-bold cursor-pointer"
                    onClick={show}
                  >
                    Request a new one
                  </span>
                  <ResendPasswordModal
                    handleCancel={close}
                    handleOk={close}
                    visible={visible}
                  />
                </p>
              </Typography>
            </div>
            <Form.Item noStyle shouldUpdate>
              <Button
                className="min-w-200"
                type="primary"
                size="large"
                htmlType="submit"
                block
                loading={isLoading}
              >
                Login
              </Button>
            </Form.Item>
            <Divider>
              <span className="text-primary or-diveder">or</span>
            </Divider>
            <div className="text-center">
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Sign in With Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
                className="btn-google"
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
