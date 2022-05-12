import React, { useEffect } from "react";
import _ from "lodash";
import { Divider, Avatar, Form, Input, Button, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { selectUsers, patchUserAsync, resetPasswordAsync } from "../../redux/userReducer";
import AvatarImg from "../../assets/svg/avatar.png";
import LayoutComponent from "../../components/Layout";
import { PASSWORD_REGEX } from "../../utils/constants";
import "./styles.less";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Profile = () => {
  const [form] = Form.useForm();
  const [formReset] = Form.useForm();
  const { user } = useSelector(selectUsers);
  const dispatch = useDispatch();

  const onSubmitProfile = (values) => {
    dispatch(patchUserAsync(values));
  };

  const onResetPassword = (values) => {
    dispatch(resetPasswordAsync(values));
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
  }, [user]);

  return (
    <LayoutComponent className="profile-page">
      <h1>
        Profile <span>SETTINGS</span>
      </h1>
      <div className="grid grid-cols-4">
        <div>
          <Avatar src={AvatarImg} size={186} />
        </div>
        <div className="col-span-2">
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onSubmitProfile}
            className="form-profile"
          >
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Row justify="end">
              <Col>
                <Form.Item>
                  <Button type="primary" size="large" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <Divider />
      <div className="grid grid-cols-4">
        <div></div>
        <div className="col-span-2">
          <Form
            {...layout}
            form={formReset}
            name="control-hooks"
            onFinish={onResetPassword}
            className="form-profile"
          >
            <Form.Item
              name="oldPassword"
              label="EXISTING PASSWORD"
              rules={[{ required: true }]}
            >
              <Input
                autoComplete="off"
                aria-autocomplete="off"
                type="password"
                size="large"
                placeholder="Enter exiting password"
              />
            </Form.Item>
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
            <Row justify="end">
              <Col>
                <Form.Item>
                  <Button type="primary" size="large" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </LayoutComponent>
  );
};

export default Profile;
