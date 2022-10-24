import React, { useState, memo } from "react";
import { notification, Button, Form, Input } from "antd";
import { useSearchParams, useNavigate } from "react-router-dom";

import { forgotPasswordConfirmationAPI } from "../../../redux/userReducer";
import { LogoIcon } from "../../../assets/svg";
import { PASSWORD_REGEX } from "../../../utils/validations";

import "./styles.less";

const ForgotPasswordConfirmation = () => {
  const [searchParams] = useSearchParams();
  let navigate = useNavigate();
  const token = searchParams.get("token");
  const [isSuccess, setSuccess] = useState(false);

  const backToLogin = () => {
    navigate("/");
  };

  const handleFinish = async (values) => {
    try {
      const res = await forgotPasswordConfirmationAPI(values, token);
      console.log("###res", res);
      if (res?.errors) {
        throw res?.errors;
      } else {
        setSuccess(true);
        notification.success({
          title: "Action Completed",
          message: `The password is updated.`,
        });
      }
    } catch (err) {
      console.log("###err", err);
      notification.error({
        title: "Action failed",
        message: err || `Can't update your password.`,
      });
    }
  };
  console.log("###token", token);
  return (
    <div className="ForgotPasswordConfirmation-page">
      <div className="ForgotPasswordConfirmation-box text-center">
        <LogoIcon />
        <h1 className="text-center mb-4 text-2xl font-bold">
          {!isSuccess ? 'Please update your password' : 'Success!'}
        </h1>
        {!isSuccess ? (
          <Form layout="vertical" onFinish={handleFinish} initialValues={{}}>
            <Form.Item
              name="newPassword"
              label="NEW PASSWORD"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
                {
                  validator(_, value) {
                    if (PASSWORD_REGEX.test(value) || !value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "Minimum eight characters, at least one letter, one number and one special character"
                      )
                    );
                  },
                },
              ]}
            >
              <Input
                autoComplete="off"
                aria-autocomplete="off"
                type="password"
                size="large"
                placeholder="Enter new password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="CONFIRM NEW PASSWORD"
              dependencies={["newPassword"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input
                autoComplete="off"
                aria-autocomplete="off"
                type="password"
                size="large"
                placeholder="Enter new password"
              />
            </Form.Item>
            <Button
              className="min-w-200 mt-5"
              type="primary"
              size="large"
              htmlType="submit"
              block
              // loading={isLoading}
            >
              Update
            </Button>
          </Form>
        ) : (
          <div>
            <Button
              className="mt-5 md:min-w-200"
              type="primary"
              size="large"
              onClick={backToLogin}
            >
              Back to Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ForgotPasswordConfirmation);
