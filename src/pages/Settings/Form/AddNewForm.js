import React, { useEffect, useState, useCallback } from "react";
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
  Modal,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { get as _get } from "lodash";

import { useModal } from "../../../hook/useModal";
import LayoutComponent from "../../../components/Layout";
import { AvatarComponent, RichText, VCardComponent } from "../../../components";
import { OPTION_FIELDS } from "../../../utils/constants";
import { handleCallAPI } from "../../../redux/helpers";
import {
  getFormDetail,
  selectSettings,
  getCustomFieldsAsync,
  getTagsAsync,
  addFormAsync,
  updateFormAsync,
} from "../../../redux/settingsReducer";
import {
  selectUsers,
  getUserAsync,
  updateAvatarAsync,
} from "../../../redux/userReducer";
import { selectVCard, getVCardAsync } from "../../../redux/vcardReducer";

import "./AddNewForm.less";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const initialValues = {
  tagId: [],
  url: "",
  title: "",
  browserTitle: "",
  redirectUrl: "",
  description: "",
  optionalFields: [],
  customFieldsIds: [],
  submission: "",
  isEnabled: false,
  isVcardSend: false,
  message: "",
};

const AddNewForm = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [desc, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const { tags, customFields, addedForm, isNewFormLoading } =
    useSelector(selectSettings);
  const { user } = useSelector(selectUsers);
  const { vcardData } = useSelector(selectVCard);
  const {
    close: closeVcard,
    show: showVcard,
    visible: visibleVcard,
  } = useModal();

  const onSubmitAddNewForm = (values) => {
    if (!image && !id) {
      notification.error({
        title: "Action failed",
        message: `Please upload your image`,
      });
      return;
    }
    const formData = new FormData();
    if (image) {
      formData.append("file", image, image.name);
    }
    formData.append("tagId", values.tagId || "");
    formData.append("url", values.url);
    formData.append("title", values.title || "");
    formData.append("browserTitle", values.browserTitle || "");
    formData.append("redirectUrl", values.redirectUrl || "");
    formData.append("description", values.description || "");
    values?.optionalFields?.forEach((option) => {
      formData.append("optionalFields[]", option);
    });

    values?.customFieldsIds?.forEach((option) => {
      formData.append("customFieldsIds[]", option);
    });

    formData.append("submission", values.submission || "");
    formData.append("isEnabled", values.isEnabled || false);
    formData.append("isVcardSend", values.isVcardSend || false);
    formData.append("message", values.message);
    if (id) {
      dispatch(
        updateFormAsync({
          dataUpdate: formData,
          id: id,
        })
      );
    } else {
      dispatch(addFormAsync(formData));
    }
  };

  const onFileChange = async (event) => {
    setImage(event.target.files[0]);
  };

  const onChangeAvatar = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0], event.target.files[0].name);
    dispatch(updateAvatarAsync(formData));
  };

  const handleVcardOk = async (event) => {
    dispatch(getUserAsync());
  };

  const handleVcardCancel = async (event) => {
    closeVcard();
  };

  const resetData = useCallback(() => {
    form.setFieldsValue({
      ...initialValues,
    });
    setPreviewImage("");
    setImage("");
    setDescription("");
  }, []);

  useEffect(() => {
    dispatch(getCustomFieldsAsync());
    dispatch(getTagsAsync());
  }, [useDispatch]);

  useEffect(() => {
    if (addedForm) {
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

  useEffect(() => {
    if (vcardData?.id) {
      closeVcard();
    }
  }, [vcardData]);

  useEffect(() => {
    dispatch(getVCardAsync());
  }, []);

  useEffect(() => {
    if (id) {
      const payload = {
        method: "GET",
        url: `${process.env.REACT_APP_API_BASE_URL}/forms/${id}`,
      };
      handleCallAPI(payload).then((res) => {
        const data = _get(res, "response", {});
        form.setFieldsValue({
          ...data,
          customFieldsIds: (data?.customFields || []).map((item) => item.id),
          tagId: data?.tags?.id,
        });
        setImage("");
        setPreviewImage(data.image);
        setDescription(data.description);
      });
    } else {
      resetData();
    }
  }, [id]);

  return (
    <LayoutComponent className="settings-page add-new-form-page">
      <h1>
        Settings <span>SETTINGS</span>
      </h1>
      <Form
        {...layout}
        initialValues={initialValues}
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
            <div className="input-subfix flex items-end">
              <Form.Item
                name="url"
                label={
                  <div>
                    KINSEND URL{" "}
                    <span>A public url to your address book form.</span>
                  </div>
                }
                rules={[{ required: true }]}
                className="flex-1"
              >
                <Input className="prefix-input-domain" placeholder="" />
              </Form.Item>
              <span
                className="flex items-center mb-6 suffix-domain text-primary"
                type="text"
              >
                .{window.location.host}
              </span>
            </div>
            <Form.Item
              name="tagId"
              rules={[{ required: true }]}
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
              name="description"
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
            <Form.Item name="customFieldsIds" label="CUSTOM FIELDS">
              <Select
                mode="multiple"
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
              name="submission"
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
            {!vcardData?.id && (
              <p className="italic">
                You currently don't have any vCard information to send. If you
                would like to update your vCard please click{" "}
                <button
                  type="button"
                  className="text-primary font-bold uppercase px-1"
                  onClick={() => showVcard()}
                >
                  here
                </button>{" "}
                to do so.
              </p>
            )}
            <Row>
              <Col span={6}>
                <Form.Item name="isEnabled" label="" valuePropName="checked">
                  <Checkbox>Enabled</Checkbox>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="isVcardSend"
                  label=""
                  valuePropName="checked"
                  disabled={!vcardData?.id}
                >
                  <Checkbox disabled={!vcardData?.id}>vCard send</Checkbox>
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
      <Modal
        visible={visibleVcard}
        onOk={handleVcardOk}
        onCancel={handleVcardCancel}
        footer={null}
        closable={false}
        destroyOnClose={true}
        centered
        width={840}
        className="vcard-modal"
      >
        <VCardComponent onFileChange={onChangeAvatar} imgSrc={user?.image} />
      </Modal>
    </LayoutComponent>
  );
};

export default AddNewForm;
