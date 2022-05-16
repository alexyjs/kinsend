import React from "react";
import { Avatar, Row, Col, Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  // patchUserAsync,
} from "../../redux/userReducer";
import AvatarImg from "../../assets/svg/avatar.png";
import { CameraIcon } from "../../assets/svg";
import './VCard.less';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const VCard = ({ user }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onSubmitProfile = (values) => {
    // dispatch(patchUserAsync(values));
  };

  return <div className="vcard">
    <Row justify="center" className="text-center">
      <Col>
        <h2 className="text-4xl">Dynamic vCard </h2>
        <p className="pt-1.5	pb-14">Send a vCard that includes the number a contact has been assigned.</p>
        <div className="avatar-wrap">
          <Avatar src={user?.image || AvatarImg} size={186} />
          <input
            className="avatar-input"
            type="file"
            // ref={inputFileRef}
            // onChangeCapture={onFileChange}
          />
          <div
            className="icon-camera"
            // onClick={onBtnClick}
            >
            <CameraIcon />
          </div>
        </div>
      </Col>
    </Row>
    <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onSubmitProfile}
        className="form-profile vcard-form"
      >
    <Row className="mt-6" gutter={24}>
      <Col sm={12}>
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col sm={12}>
        <Form.Item
          name="LAST NAME"
          label="LAST NAME"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col sm={12}>
        <Form.Item
          name="TITLE"
          label="TITLE"
          rules={[{ required: true }]}
        >
          <Input placeholder="Job Title" />
        </Form.Item>
      </Col>
      <Col sm={12}>
        <Form.Item
          name="ORGANIZATION"
          label="ORGANIZATION"
          rules={[{ required: true }]}
        >
          <Input placeholder="Company Name" />
        </Form.Item>
      </Col>
      <Col sm={12}>
        <Form.Item
          name="EMAIL"
          label="EMAIL"
          rules={[{ required: true }]}
        >
          <Input placeholder="EMAIL"/>
        </Form.Item>
      </Col>
      <Col sm={12}>
        <Form.Item
          name="FACEBOOK"
          label="FACEBOOK"
          rules={[{ required: true }]}
        >
          <Input placeholder="https://www.facebook.com" />
        </Form.Item>
      </Col>
      <Col sm={12}>
        <Form.Item
          name="INSTAGRAM"
          label="INSTAGRAM"
          rules={[{ required: true }]}
        >
          <Input placeholder="https://www.instagram.com/"/>
        </Form.Item>
      </Col>
      <Col sm={12}>
        <Form.Item
          name="TWITTER"
          label="TWITTER"
          rules={[{ required: true }]}
        >
          <Input placeholder="https://www.twitter.com/"/>
        </Form.Item>
      </Col>
      <Col sm={12}>
        <Form.Item
          name="LINKEDIN"
          label="LINKEDIN"
          rules={[{ required: true }]}
        >
          <Input placeholder="https://www.linkedin.com/in/" />
        </Form.Item>
      </Col>
      <Col sm={12}>
        <Form.Item
          name="YOUTUBE"
          label="YOUTUBE"
          rules={[{ required: true }]}
        >
          <Input placeholder="https://www.youtube.com/channel/"/>
        </Form.Item>
      </Col>
      <Col sm={12}>
        <Form.Item
          name="SNAPCHAT"
          label="SNAPCHAT"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col sm={12}>
        <Form.Item
          name="SOUNDCLOUD"
          label="SOUNDCLOUD"
          rules={[{ required: true }]}
        >
          <Input placeholder="https://www.soundcloud.com/"/>
        </Form.Item>
      </Col>
      <Col sm={12}>
        <Form.Item
          name="STORE"
          label="STORE"
          rules={[{ required: true }]}
        >
          <Input placeholder="https://" />
        </Form.Item>
      </Col>
      <Col sm={12}>
        <Form.Item
          name="WEB SITE"
          label="WEB SITE"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter new password"/>
        </Form.Item>
      </Col>
      <Col sm={12}>
        <Form.Item
          name="ZIP CODE "
          label="ZIP CODE"
          rules={[{ required: true }]}
        >
          <Input placeholder="Postal Code"/>
        </Form.Item>
      </Col>
      <Col sm={12}>
        <Form.Item
          name="Note"
          label="Note"
          rules={[{ required: true }]}
        >
          <Input placeholder="Note"/>
        </Form.Item>
      </Col>
    </Row>
    <Row justify="end">
      <Col>
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit" className="w-48">
            Save
          </Button>
        </Form.Item>
      </Col>
    </Row>
  </Form>
</div>}

export default VCard;
