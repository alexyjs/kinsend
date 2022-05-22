import React, { useEffect } from "react";
import { Row, Col, Form, Input, Button, Select, Option } from "antd";
import { useDispatch, useSelector } from "react-redux";

import LayoutComponent from '../../../components/Layout';
import { AvatarComponent, RichText } from "../../../components";
import { OPTION_FIELDS } from "../../../utils/constants";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AddNewForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (vcardData) {
  //     form.setFieldsValue({
  //     });
  //   }
  // }, []);

  return (
    <LayoutComponent  className="settings-page">
      <h1>
      Settings <span>SETTINGS</span>
      </h1>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        // onFinish={onSubmitVCard}
        className="form-profile vcard-form"
      >
        <Row className="mt-6" gutter={24}>
          <Col sm={6} md={6}>
           <AvatarComponent />
          </Col>
          <Col sm={18}>
            <Form.Item
              name="lastName"
              label={<div>SUPERPHONE URL <span>A public url to your address book form.</span></div>}
              rules={[{ required: true }]}
            >
              <div className="input-subfix">
                <Input placeholder="LAST NAME" />
                <button>.superphone.io</button>
              </div>
            </Form.Item>
            <Form.Item
              name="lastName"
              label={<>INBOUND TAG<span>Choose which tag(s) get applied to incoming contacts</span></>}
            >
              <Select
                placeholder="Choose tag..."
                // onChange={onTagChange}
                allowClear
              >
                {OPTION_FIELDS.map(option =>
                <Select.Option value="option">{option}</Select.Option>
                )}
              </Select>
            </Form.Item>
            <Form.Item
              name="TITLE"
              label="TITLE"
              rules={[{ required: true }]}
            >
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
              className="mb-0"
              value={"data.body"}
              // onChange={value => this.onFieldChange(value, 'body')}
            />
          </Col>
        </Row>
      </Form>
    </LayoutComponent>
  );
};

export default AddNewForm;
