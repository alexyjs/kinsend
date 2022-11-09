import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, Button, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  getVCardAsync,
  selectVCard,
  updateVCardAsync,
} from "../../redux/vcardReducer";
import { AvatarComponent } from "..";
import { EMAIL_REGEX } from "../../utils/validations";
import { handleUploadImageCallAPI } from "../../redux/helpers";

import "./styles.less";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: {
    span: 16,
    xs: 24,
    md: 16,
  },
};

const VCard = ({}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { vcardData, isLoading } = useSelector(selectVCard);
  const [imgSrc, setImgSrc] = useState("");

  const onSubmitVCard = (values) => {
    dispatch(updateVCardAsync(values));
  };

  const onFileChange = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0], event.target.files[0].name);
    formData.append("isResize", true);

    handleUploadImageCallAPI(formData)
      .then((res) => {
        notification.success({
          title: "Action Completed",
          message: `Upload file success!.`,
        });
        setImgSrc(res);
        form.setFieldsValue({
          image: res,
        });
      })
      .catch((err) => {
        notification.error({
          title: "Action failed",
          message: err || `Upload file failed`,
        });
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  useEffect(() => {
    if (vcardData) {
      form.setFieldsValue({
        firstName: vcardData?.firstName,
        lastName: vcardData?.lastName,
        email: vcardData?.email,
        title: vcardData?.title,
        organization: vcardData?.organization,
        facebook: vcardData?.facebook,
        instagram: vcardData?.instagram,
        twitter: vcardData?.twitter,
        linkedIn: vcardData?.linkedIn,
        youtube: vcardData?.youtube,
        snapchat: vcardData?.snapchat,
        soundCloud: vcardData?.soundCloud,
        store: vcardData?.store,
        website: vcardData?.website,
        zipCode: vcardData?.zipCode,
        note: vcardData?.note,
        image: vcardData?.image || "",
      });
    }
  }, [vcardData]);

  useEffect(() => {
    dispatch(getVCardAsync());
    setImgSrc("");
  }, []);

  return (
    <div className="vcard md:p-11 p-4">
      <Row justify="center" className="text-center">
        <Col>
          <h2 className="text-4xl">Dynamic vCard </h2>
          <p className="pt-1.5	pb-14">
            Send a vCard that includes the number a contact has been assigned.
          </p>
          <AvatarComponent
            onFileChange={onFileChange}
            imgSrc={imgSrc || vcardData?.image}
          />
        </Col>
      </Row>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onSubmitVCard}
        className="form-profile vcard-form"
      >
        <Row className="mt-6" gutter={24}>
          <Col xs={24} md={12} className="hidden">
            <Form.Item
              name="image"
              label="image"
              // rules={[{ required: true }]}
            >
              <Input placeholder="https://www.facebook.com" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="lastName"
              label="LAST NAME"
              rules={[{ required: true }]}
            >
              <Input placeholder="LAST NAME" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="title" label="TITLE" rules={[{ required: true }]}>
              <Input placeholder="Job Title" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="organization"
              label="ORGANIZATION"
              rules={[{ required: true }]}
            >
              <Input placeholder="Company Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="email"
              label="EMAIL"
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
              <Input placeholder="EMAIL" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="facebook"
              label="FACEBOOK"
              // rules={[{ required: true }]}
            >
              <Input placeholder="https://www.facebook.com" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="instagram"
              label="INSTAGRAM"
              // rules={[{ required: true }]}
            >
              <Input placeholder="https://www.instagram.com/" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="twitter"
              label="TWITTER"
              // rules={[{ required: true }]}
            >
              <Input placeholder="https://www.twitter.com/" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="linkedIn"
              label="LINKEDIN"
              // rules={[{ required: true }]}
            >
              <Input placeholder="https://www.linkedin.com/in/" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="youtube"
              label="YOUTUBE"
              // rules={[{ required: true }]}
            >
              <Input placeholder="https://www.youtube.com/channel/" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="snapchat"
              label="SNAPCHAT"
              // rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="soundCloud"
              label="SOUNDCLOUD"
              // rules={[{ required: true }]}
            >
              <Input placeholder="https://www.soundcloud.com/" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="store"
              label="STORE"
              // rules={[{ required: true }]}
            >
              <Input placeholder="https://" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="website"
              label="WEB SITE"
              // rules={[{ required: true }]}
            >
              <Input placeholder="Enter new password" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="zipCode"
              label="ZIP CODE"
              // rules={[{ required: true }]}
            >
              <Input placeholder="Postal Code" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="note"
              label="Note"
              // rules={[{ required: true }]}
            >
              <Input placeholder="Note" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="w-48"
                disabled={isLoading}
              >
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default VCard;
