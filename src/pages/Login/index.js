import { Button, Divider, Form, Input, Typography } from "antd";
import _ from "lodash";
import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  loginAsync,
  loginWithGoogleAsync,
  selectAddPaymentSuccess,
  selectUsers,
} from "../../redux/userReducer";
import { EMAIL_REGEX } from "../../utils/constants";
import { ErrorMessages, ResendPasswordModal } from "../../components";
import { useModal } from "../../hook/useModal";

const { Title } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, errors, user } = useSelector(selectUsers);
  const { close, show, visible } = useModal();
  let navigate = useNavigate();
  const handleFinish = (values) => {
    try {
      dispatch(loginAsync(values));
    } catch {}
  };

  const responseGoogle = (response) => {
    handleLogin(response);
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
      navigate("/payment-setup");
    }
  }, [user]);

  return (
    <div className="grid place-items-center min-h-screen">
      <div className="container mx-auto px-4 max-w-lg">
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
                Forgot your password?{" "}
                <span
                  className="text-primary font-bold underline"
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
          {/* <ErrorMessages errors={errors} classNames="text-center pb-4" /> */}
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
            <span className="text-primary">or</span>
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
  );
};

export default Login;
