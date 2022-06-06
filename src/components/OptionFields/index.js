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
import {
  OPTION_FIELDS,
  INDUSTRY,
  getDays,
  getMonths,
  getYears,
  GENDER_OPTIONS,
} from "./../../utils/constants";

const OptionFieldsComponent = ({ type, onChange }) => {
  if (!OPTION_FIELDS.includes(type)) return null;
  let label = "";
  let placeholder = "";
  let name = "";

  switch (type) {
    case "GENDER":
      name = "gender";
      label = "Gender";
      placeholder = "Please input your gender";
      break;
    case "TWITTER":
      name = "twitter";
      label = "Twitter Link";
      placeholder = "Please input your twitter";
      break;
    case "INSTAGRAM":
      name = "instagram";
      label = "Instagram Link";
      placeholder = "Please input your instagram";
      break;
    case "LINKEDIN":
      name = "linkedin";
      label = "Linkedin Link";
      placeholder = "Please input your linkedin";
      break;
    case "JOB":
      name = "job";
      label = "Job Title";
      placeholder = "Please input your job title";
      break;
    case "TITLE":
      name = "title";
      label = "Title";
      placeholder = "Please input";
      break;
    case "COMPANY":
      name = "company";
      label = "Company";
      placeholder = "Please input your company";
      break;
    case "BIRTHDAY":
      name = "birthday";
      label = "Birthday";
      placeholder = "Please input your birthday";
      break;
    case "INDUSTRY":
      name = "industry";
      label = "Industry";
      placeholder = "Select Industry";
      break;
  }

  if (type === "GENDER") {
    return (
      <Form.Item name={name} label={label} rules={[{ required: true }]}>
        <Select placeholder={placeholder}>
          {GENDER_OPTIONS.map((item, index) => (
            <Select.Option key={`gender-${item}-${index}`} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    );
  }

  if (type === "BIRTHDAY") {
    return (
      <Form.Item
        rules={[{ required: true }]}
        name={name}
        label={label}
        className="optional-field-birthday w-full"
      >
        <Row className="w-full">
          <Col sm={8}>
            <Form.Item
              name={[name, "month"]}
              // rules={[{ required: true }]}
            >
              <Select placeholder="Month">
                {getMonths().map((item, index) => (
                  <Select.Option
                    key={`month-${item.value}-${index}`}
                    value={item.value}
                  >
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col sm={8}>
            <Form.Item
              name={[name, "day"]}
              // rules={[{ required: true }]}
            >
              <Select placeholder="Day">
                {getDays().map((item, index) => (
                  <Select.Option key={`day-${item}-${index}`} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col sm={8}>
            <Form.Item
              name={[name, "year"]}
              // rules={[{ required: true }]}
            >
              <Select placeholder="Year">
                {getYears().map((item, index) => (
                  <Select.Option key={`year-${item}-${index}`} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
    );
  }

  if (type === "INDUSTRY") {
    return (
      <Form.Item name={name} label={label} rules={[{ required: true }]}>
        <Select placeholder={placeholder}>
          {INDUSTRY.map((item, index) => (
            <Select.Option key={`industry-${item}-${index}`} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    );
  }

  return (
    <Form.Item
      name={name}
      label={label}
      // rules={[{ required: false }]}
    >
      <Input placeholder={placeholder} />
    </Form.Item>
  );
};

export default OptionFieldsComponent;
