import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Avatar,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

import {
  CustomFieldsComponent,
  OptionFieldsComponent,
  InputPhone,
} from "../../../components";
import { EMAIL_REGEX } from "../../../utils/validations";
import {
  getFormsSettingDetailAsync,
  addFormSubmissionAsync,
  selectPublic,
} from "../../../redux/publicReducer";
import { parseFormDataValue, phoneValidator, getCname, getMainDomain } from "../../../utils";
import { FORM_SETTINGS_STATUS } from '../../../utils/constants';

import "./styles.less";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const FormSubmission = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  const cname = getCname();
  const mainDomain = getMainDomain();

  const { addedFormSubmission, formSettingDetail, addedForm, isNewFormLoading } =
    useSelector(selectPublic);

  const onSubmitAddNewForm = (values) => {
    let metaData = {
      ...values,
    }
    if (metaData.birthday) {
      metaData.birthday = `${values.birthday.month}/${values.birthday.day}/${values.birthday.year}`
    }
    delete metaData.email
    delete metaData.firstName
    delete metaData.lastName
    delete metaData.phoneNumber
    delete metaData.location
    let params = {
      formId: formSettingDetail.id,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      location: values.location,
      metaData: JSON.stringify(metaData),
    }
    dispatch(addFormSubmissionAsync(params));
  };

  useEffect(() => {
    if (addedFormSubmission) {
      if (addedFormSubmission?.form?.redirectUrl) {
        window.location.href = addedFormSubmission?.form?.redirectUrl;
      } else {
        navigate(`/thank-you`, { replace: true });
      }
    }
  }, [addedFormSubmission, useDispatch]);

  useEffect(() => {
    if (formSettingDetail?.id) {
      navigate(`/f/${formSettingDetail.id}`);
    }
  }, [formSettingDetail]);

  useEffect(() => {
    if (formSettingDetail?.status === FORM_SETTINGS_STATUS.DISABLE) {
      window.location.href = mainDomain;
    }
  }, [formSettingDetail, mainDomain]);

  useEffect(() => {
    dispatch(getFormsSettingDetailAsync(id || cname));
  }, [useDispatch]);

  return (
    <div className="settings-page add-new-form-page pb-5">
      <div className="max-w-screen-md	mx-auto mb-5 mt-14">
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onSubmitAddNewForm}
          className="form-profile vcard-form"
          initialValues={{
            phoneNumber: {
              phone: undefined,
              code: 1,
              short: "US",
            },
          }}
        >
          <div className="flex items-center justify-center mb-5 flex-col	text-center">
            <Avatar src={formSettingDetail?.image || ""} size={186} icon={<UserOutlined />} />
            <h2 className="my-3 font-bold text-lg">{formSettingDetail?.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: formSettingDetail?.description }}></p>
          </div>
          <Row gutter={40}>
            <Col sm={12} span={24}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Input size="large" placeholder="Adam " />
              </Form.Item>
            </Col>
            <Col sm={12} span={24}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Input size="large" placeholder="Smith" />
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item
                name="email"
                label="email"
                rules={[
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
                <Input size="large" placeholder="Email@.com" />
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item
                name="phoneNumber"
                label="Phone"
                rules={[phoneValidator]}
              >
                <InputPhone placeholder="Enter phone number" />
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item
                name="location"
                label="Location"
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Input size="large" placeholder="Please Input your location" />
              </Form.Item>
            </Col>
          </Row>
          <Row className="mt-6 mx-5" gutter={24}>
            <Col sm={24}>
              {formSettingDetail?.customFields &&
                formSettingDetail?.customFields.map((cf) => (
                  <CustomFieldsComponent
                    data={cf}
                    key={`form-submission-customfield-${cf.id}`}
                  />
                ))}
            </Col>
            <Col sm={24}>
              {formSettingDetail?.optionalFields &&
                formSettingDetail?.optionalFields.map((cf) => (
                  <OptionFieldsComponent
                    type={cf}
                    key={`form-submission-optionalfield-${cf}`}
                  />
                ))}
            </Col>
          </Row>
          <Row justify="center" className="mt-12">
            {/* <Col>
              <NavLink to="/settings/forms">
                <Button className="md:min-w-200" type="text" size="large">
                  Cancel
                </Button>
              </NavLink>
            </Col> */}
            <Col>
              <Form.Item noStyle shouldUpdate>
                <Button
                  className="md:min-w-200"
                  type="primary"
                  size="large"
                  htmlType="submit"
                  block
                  disabled={isNewFormLoading}
                >
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default FormSubmission;
