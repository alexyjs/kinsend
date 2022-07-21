import React, { useEffect, useState, useMemo } from "react";
import _ from "lodash";
import {
  Divider,
  Form,
  Input,
  Button,
  Row,
  Col,
  Tooltip,
  Dropdown,
  Menu,
  Space,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import cl from "classnames";
import {
  PlusOutlined,
  MinusCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { selectUpdates, getSegmentAsync } from "../../../redux/updatesReducer";

import { useModal } from "../../../hook/useModal";
import {
  UploadFileModal,
  EmojiPicker,
  LayoutComponent,
} from "../../../components";
import {
  AutomationActionMessageIcon,
  AutomationActionMaxMessageIcon,
  AttachmentIcon,
  EmojiIcon,
  DatetimeIcon,
} from "../../../assets/svg";
import phoneFrameImg from "../../../assets/phone-frame.png";
import { RECIPIENTS_TYPE } from "../../../utils/update";
import NewSegmentModal from "../components/NewSegmentModal";

import "./styles.less";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AddNewUpdates = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [recipients, setRecipients] = useState(null);
  const [attachment, setAttachmentUrl] = useState({});
  const [datetime, setDatetime] = useState(new Date());
  const { segments } = useSelector(selectUpdates);
  const [dataRecipients, setDataRecipients] = useState(RECIPIENTS_TYPE);

  const {
    close: closeSegment,
    show: showSegment,
    visible: visibleSegment,
  } = useModal();

  const {
    close: closeUpload,
    show: showUpload,
    visible: visibleUpload,
  } = useModal();
  const [showEmoji, setShowEmoji] = useState(false);

  // const { user, isLoading } = useSelector(selectUsers);
  const handleUploadFile = (value) => {
    setAttachmentUrl(value);
    closeUpload();
  };

  const handleChangeEmoji = (emojiObj) => {
    let message = form.getFieldValue("message") || "";
    form.setFieldsValue({
      message: message + emojiObj.native,
    });
    setShowEmoji(false);
  };

  const handleRecipients = (item) => {
    setRecipients(item);
  };

  useEffect(() => {
    setDataRecipients(RECIPIENTS_TYPE.concat(segments || []));
  }, [segments]);

  useEffect(() => {
    dispatch(getSegmentAsync());
  }, []);

  const menu = useMemo(() => {
    return (
      <Menu onSelect={(e) => console.log(e)}>
        {dataRecipients.map((item, index) => (
          <Menu.Item
            key={`recipients-${item.value}`}
            className="custom-field flex items-center justify-between"
            onClick={() => handleRecipients(item)}
          >
            <span className="inline-flex items-center">{item.label}</span>
          </Menu.Item>
        ))}
      </Menu>
    );
  }, []);

  const hadnleSubmit = () => {};

  return (
    <LayoutComponent className="add-updates-page">
      <div className="flex items-center">
        <img className="phone-image-frame" src={phoneFrameImg} />
        <Form
          form={form}
          name="control-hooks"
          onFinish={hadnleSubmit}
          className="flex-auto"
        >
          <div className="">
            <div>
              <h1 className="mb-5">Send an Update</h1>
            </div>
          </div>
          <div className="custom-textarea-wrap">
            <div className="hint">
              <Tooltip
                placement="topLeft"
                title={
                  <>
                    Messages without <b>emojis & special</b> characters are sent
                    in segments of <b>160 characters.</b>
                  </>
                }
              >
                <Button>
                  <AutomationActionMaxMessageIcon />| 160
                </Button>
              </Tooltip>
              <Tooltip
                placement="top"
                title={
                  <>
                    Carriers charge you for <b>every segment</b> they deliver to
                    your recipient
                  </>
                }
              >
                <Button>
                  <AutomationActionMessageIcon />
                </Button>
              </Tooltip>
            </div>
            <Form.Item
              name="message"
              label="New update"
              rules={[{ required: true, max: 160 }]}
            >
              <Input.TextArea
                style={{ height: 200 }}
                placeholder="Send new messenge ..."
              />
            </Form.Item>
            <div className="textarea-actions">
              <AttachmentIcon onClick={showUpload} />
              <EmojiIcon onClick={() => setShowEmoji(true)} />
              {showEmoji && <EmojiPicker onEmojiSelect={handleChangeEmoji} />}
              <UploadFileModal
                visible={visibleUpload}
                handleOk={handleUploadFile}
                handleCancel={closeUpload}
              />
            </div>
          </div>
          <div className="recipients">
            <div className="flex justify-between mb-4">
              RECIPIENTS
              <span
                className="text-primary cursor-pointer"
                onClick={showSegment}
              >
                Manage
              </span>
            </div>
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              className="w-full"
              overlayClassName="max-h-60	overflow-y-auto"
              placement="bottom"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space
                  className={cl(
                    "flex-1 select-custom-field-btn custom-field flex items-center justify-between"
                  )}
                >
                  {recipients ? (
                    <span className="inline-flex items-center">
                      {recipients.label}
                    </span>
                  ) : (
                    <span className="font-bold text-l">Select Recipients</span>
                  )}
                  <DownOutlined className="flex align-center" />
                </Space>
              </a>
            </Dropdown>
          </div>
          <div className="flex flex-col">
            SCHEDULE TIME/INTERVAL
            <div className="datetime-wrap inline-flex items-center mt-3">
              <DatetimeIcon />
              <DatePicker
                showTimeSelect
                selected={datetime}
                onChange={(date) => setDatetime(date)}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="bg-transparent	"
              />
            </div>
          </div>
          <Row justify="end" className="mt-12">
            <Col>
              <Form.Item noStyle>
                <NavLink to="/updates">
                  <Button className="md:min-w-200" type="text" size="large">
                    Cancel
                  </Button>
                </NavLink>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item noStyle shouldUpdate>
                <Button
                  className="md:min-w-200 ml-5"
                  type="primary"
                  size="large"
                  htmlType="submit"
                  block
                  disabled
                >
                  Save
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <NewSegmentModal
        visible={visibleSegment}
        handleOk={closeSegment}
        handleCancel={closeSegment}
      />
    </LayoutComponent>
  );
};

export default AddNewUpdates;
