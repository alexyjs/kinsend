import React from "react";
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
  Space,
} from "antd";
import { CUSTOM_FIELD_TYPE } from "./../../utils/constants";

const CustomFieldsComponent = ({ data, onChange }) => {
  if (!data) return null;
  // input
  if (data.type === CUSTOM_FIELD_TYPE.INPUT) {
    return (
      <Form.Item
        name={data.label}
        label={data.label}
        rules={[{ required: data.isRequired }]}
      >
        <Input placeholder={data.placeholder} />
      </Form.Item>
    );
  }

  // PARAGRAPH_TEXT
  if (data.type === CUSTOM_FIELD_TYPE.PARAGRAPH_TEXT) {
    return (
      <Form.Item
        name={data.label}
        label={data.label}
        rules={[{ required: data.isRequired }]}
      >
        <Input.TextArea placeholder={data.placeholder} />
      </Form.Item>
    );
  }

  // RADIO
  if (data.type === CUSTOM_FIELD_TYPE.RADIO) {
    return (
      <Form.Item
        name={data.label}
        label={data.label}
        rules={[{ required: data.isRequired }]}
      >
        <label>{data.placeholder}</label>
        <Radio.Group>
          <Space direction="vertical">
            {data.options.map((option, index) => (
              <Radio
                value={option.label}
                key={`custom-field-radio-${option.label}-${index}`}
              >
                _{option.label}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>
    );
  }

  // SELECT
  if (data.type === CUSTOM_FIELD_TYPE.SELECT) {
    return (
      <Form.Item
        name={data.label}
        label={data.label}
        rules={[{ required: data.isRequired }]}
      >
        <Select placeholder={data.placeholder}>
          {data.options.map((option, index) => (
            <Select.Option
              key={`option-field-select-${option.label}-${index}`}
              value={option.label}
            >
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    );
  }

  return (
    <Form.Item
      name={data.label}
      label={data.label}
      rules={[{ required: data.isRequired }]}
    >
      <Checkbox.Group>
        <Space direction="vertical">
          {data.options.map((option, index) => (
            <Checkbox
              key={`checkbox-field-checkbox-${option.label}-${index}`}
              value={option.label}
            >
              {option.label}
            </Checkbox>
          ))}
        </Space>
      </Checkbox.Group>
    </Form.Item>
  );
};

export default CustomFieldsComponent;
