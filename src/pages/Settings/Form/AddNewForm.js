import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Option,
  Radio,
  Checkbox,
  notification,
} from "antd";
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
import { parseFormDataValue } from "../../../utils";

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
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const { tags, customFields, addedForm, isNewFormLoading } =
    useSelector(selectSettings);

  const onSubmitAddNewForm = (values) => {
    if (!image) {
      notification.error({
        title: "Action failed",
        message: `Please upload your image`,
      });
      return;
    }
    const formData = new FormData();
    formData.append("file", image, image.name);

    formData.append("tagId", values.tagId);
    formData.append("customFieldsId", values.customFieldsId);
    formData.append("url", values.url);
    formData.append("title", values.title + ".kinsend.io");
    formData.append("browserTitle", values.browserTitle);
    formData.append("redirectUrl", values.redirectUrl);
    formData.append("description", values.description);
    values?.optionalFields?.forEach((option) => {
      formData.append("optionalFields[]", option);
    });

    formData.append("submisstion", values.submisstion);
    formData.append("isEnabled", parseFormDataValue(values.isEnabled));
    formData.append("isVcardSend", JSON.stringify(values.isVcardSend));
    formData.append("message", values.message);

    dispatch(addFormAsync(formData));
  };

  const onFileChange = async (event) => {
    console.log("###onFileChange", event);
    setImage(event.target.files[0]);
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

  useEffect(() => {
    if (!image) {
      setPreviewImage(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreviewImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

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
            <AvatarComponent
              onFileChange={onFileChange}
              imgSrc={previewImage}
            />
          </Col>
          <Col sm={18}>
            <Form.Item
              name="url"
              label={
                <div>
                  KINSEND URL{" "}
                  <span>A public url to your address book form.</span>
                </div>
              }
              rules={[{ required: true }]}
            >
              <div className="input-subfix">
                <Input placeholder="" />
                <button type="text">.kinsend.io</button>
              </div>
            </Form.Item>
            <Form.Item
              name="tagId"
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
                allowClear
                // onChange={onTagChange}
                placeholder="Choose tag..."
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
            <Form.Item name="title" label="TITLE" rules={[{ required: true }]}>
              <Input placeholder="Add title" />
            </Form.Item>
            <Form.Item
              name="browserTitle"
              label="BROWSER TITLE"
              rules={[{ required: true }]}
            >
              <Input placeholder="Add title browser title" />
            </Form.Item>
            <Form.Item
              name="redirectUrl"
              label="CUSTOM REDIRECT URL"
              rules={[{ required: true }]}
            >
              <Input placeholder="http//.." />
            </Form.Item>
            <Form.Item
              name="discription"
              label="DESCRIPTION"
              rules={[{ required: true }]}
            >
              <RichText
                className="mb-2"
                value={desc}
                onChange={(value) => {
                  setDescription(value);
                }}
              />
            </Form.Item>
            <Form.Item name="optionalFields" label="OPTIONAL FIELDS">
              <Select
                mode="multiple"
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
            <Form.Item name="customFieldsId" label="CUSTOM FIELDS">
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
              name="submisstion"
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
            <Row>
              <Col span={6}>
                <Form.Item name="isEnabled" label="">
                  <Checkbox>Enabled</Checkbox>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="isVcardSend" label="">
                  <Checkbox>vCard send</Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="message"
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
                disabled={isNewFormLoading}
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
