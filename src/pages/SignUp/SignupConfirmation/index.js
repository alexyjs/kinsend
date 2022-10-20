import React, { useState } from "react";
import { notification, Button } from "antd";
import { useSearchParams, useNavigate } from "react-router-dom";

import { LogoIcon } from "../../../assets/svg";

import { signupConfirmationAPI } from "../../../redux/userReducer";
import "./styles.less";

const SignupConfirmation = () => {
  const [searchParams] = useSearchParams();
  let navigate = useNavigate();
  const token = searchParams.get("token");
  const [isSuccess, setSuccess] = useState(false);

  const handleVerify = async () => {
    try {
      const res = await signupConfirmationAPI(token);
      console.log("###res", res);
      if (res?.errors) {
        throw res?.errors;
      } else {
        setSuccess(true);
        notification.success({
          title: "Action Completed",
          message: `The account is verified.`,
        });
      }
    } catch (err) {
      console.log("###err", err);
      notification.error({
        title: "Action failed",
        message: err || `Can't verify your account.`,
      });
    }
  };

  const backToLogin = () => {
    navigate("/");
  };

  return (
    <div className="signup-confirmation-page">
      <div className="signup-confirmation-box text-center">
        <LogoIcon />
        <h1 className="text-center mb-4 text-2xl font-bold">
          Welcome to your new inbox
        </h1>
        <p className="note inline-flex">
          Verify your email by clicking the button below.
        </p>
        {isSuccess ? (
          <Button
            className="mt-5 md:min-w-200"
            type="primary"
            size="large"
            onClick={backToLogin}
          >
            Back to Login
          </Button>
        ) : (
          <Button
            className="mt-5 md:min-w-200"
            type="primary"
            size="large"
            onClick={handleVerify}
          >
            Verify
          </Button>
        )}
      </div>
    </div>
  );
};

export default SignupConfirmation;
