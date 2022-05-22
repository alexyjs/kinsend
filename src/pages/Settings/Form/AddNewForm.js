import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, Button, Select, Option, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";

import LayoutComponent from "../../../components/Layout";
import { AvatarComponent, RichText } from "../../../components";
import { OPTION_FIELDS } from "../../../utils/constants";
import {
  getFormsAsync,
  selectSettings,
  getCustomFieldsAsync,
  getTagsAsync,
  addFormAsync,
} from "../../../redux/settingsReducer";

import "./AddNewForm.less";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AddNewForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [desc, setDescription] = useState("");
  const { tags, customFields, addedForm } = useSelector(selectSettings);

  const onSubmitAddNewForm = (values) => {
    dispatch(addFormAsync({ values }));
  };

  useEffect(() => {
    dispatch(getCustomFieldsAsync());
    dispatch(getTagsAsync());
  }, [useDispatch]);

  useEffect(() => {
    if (addedForm) {
      // router.push("/settings/forms");
      navigate("/settings/forms", { replace: true });
    }
  }, [addedForm]);

  return (
    <LayoutComponent className="settings-page add-new-form-page">
      <h1>
        Settings <span>SETTINGS</span>
      </h1>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onSubmitAddNewForm}
        className="form-profile vcard-form"
      >
        <Row className="mt-6" gutter={24}>
          <Col sm={6} md={6}>
            <AvatarComponent />
          </Col>
          <Col sm={18}>
            <Form.Item
              name="lastName"
              label={
                <div>
                  SUPERPHONE URL{" "}
                  <span>A public url to your address book form.</span>
                </div>
              }
              rules={[{ required: true }]}
            >
              <div className="input-subfix">
                <Input placeholder="LAST NAME" />
                <button type="text">.superphone.io</button>
              </div>
            </Form.Item>
            <Form.Item
              name="INBOUND TAG"
              label={
                <>
                  INBOUND TAG
                  <span>
                    Choose which tag(s) get applied to incoming contacts
                  </span>
                </>
              }
            >
              <Select
                placeholder="Choose tag..."
                // onChange={onTagChange}
                allowClear
              >
                {tags &&
                  tags.map((option) => (
                    <Select.Option
                      key={`option-new-form-${option.id}`}
                      value={option.id}
                    >
                      {option.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item name="TITLE" label="TITLE" rules={[{ required: true }]}>
              <Input placeholder="Add title" />
            </Form.Item>
            <Form.Item
              name="BROWSER TITLE"
              label="BROWSER TITLE"
              rules={[{ required: true }]}
            >
              <Input placeholder="Add title browser title" />
            </Form.Item>
            <Form.Item
              name="CUSTOM REDIRECT URL"
              label="CUSTOM REDIRECT URL"
              rules={[{ required: true }]}
            >
              <Input placeholder="http//.." />
            </Form.Item>
            <RichText
              className="mb-2"
              value={desc}
              onChange={(value) => {
                setDescription(value);
              }}
            />
            <Form.Item name="tags" label="OPTIONAL FIELDS">
              <Select
                placeholder="Search..."
                // onChange={onTagChange}
                allowClear
              >
                {OPTION_FIELDS.map((option) => (
                  <Select.Option key={`option-field-${option}`} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="customFields" label="CUSTOM FIELDS">
              <Select
                placeholder="Add custom fields..."
                // onChange={onTagChange}
                allowClear
              >
                {customFields &&
                  customFields.map((option) => (
                    <Select.Option key={option.id} value={option.id}>
                      {option.label}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="FORM SUBMISSION"
              label={
                <>
                  FORM SUBMISSION
                  <span>
                    When the user completes your form, KinSend™ will send this
                    message via SMS.
                  </span>
                </>
              }
            >
              <Input.TextArea placeholder="Send new messenge ..." />
            </Form.Item>
            <Form.Item name="isRequired-vcard" label="">
              <Radio.Group>
                <Radio value="enable">Enabled</Radio>
                <Radio value="vcard">vCard send</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="SUBMISSION_Message"
              label={
                <>
                  FORM SUBMISSION SUCCESS PAGE MESSAGE{" "}
                  <span>
                    Unless you provided a custom redirect URL above, a contact
                    that completes your form is forwarded to a page that lets
                    them know the submission was successful. Below you can
                    customize the message the user sees on this page.
                  </span>
                </>
              }
              rules={[{ required: true }]}
            >
              <Input placeholder="Thank you for adding yourself to my phone book!" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end" className="mt-12">
          <Col>
            <NavLink to="/settings/forms">
              <Button className="md:min-w-200" type="text" size="large">
                Cancel
              </Button>
            </NavLink>
          </Col>
          <Col>
            <Form.Item noStyle shouldUpdate>
              <Button
                className="md:min-w-200"
                type="primary"
                size="large"
                htmlType="submit"
                block
              >
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </LayoutComponent>
  );
};

export default AddNewForm;
