import React, { useEffect, useState, useMemo } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
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
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import {
  PlusOutlined,
  MinusCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  selectUpdates,
  getSegmentAsync,
  addUpdatesAsync,
  resetUpdatesAsync,
} from "../../../redux/updatesReducer";
import { selectSettings, getTagsAsync } from "../../../redux/settingsReducer";
import { selectUsers } from "../../../redux/userReducer";
import { useModal } from "../../../hook/useModal";
import {
  UploadFileModal,
  EmojiPicker,
  LayoutComponent,
  DropdownGroup,
} from "../../../components";
import {
  AutomationActionMessageIcon,
  AutomationActionMaxMessageIcon,
  AttachmentIcon,
  EmojiIcon,
  DatetimeIcon,
} from "../../../assets/svg";

import {
  RECIPIENTS_TYPE,
  UPDATE_TRIGGER_TYPE,
  LIVE_IN_TYPE,
} from "../../../utils/update";
import {
  formatOptionsFormDatabase,
  getFilterUpdatesFeature,
} from "../../../utils";
import NewSegmentModal from "../components/NewSegmentModal";
import ConfirmScheduleModal from "../components/ConfirmScheduleModal";

import "./styles.less";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AddNewUpdates = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [recipients, setRecipients] = useState(null);
  const [attachment, setAttachmentUrl] = useState({});
  const [datetime, setDatetime] = useState(new Date());
  const { newUpdate, segments } = useSelector(selectUpdates);
  const { tags } = useSelector(selectSettings);
  const { user } = useSelector(selectUsers);
  const [dataRecipients, setDataRecipients] = useState(RECIPIENTS_TYPE);
  const [dataSubmit, setDataSubmit] = useState(null);

  const message = Form.useWatch("message", form);

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

  const {
    close: closeConfirm,
    show: showConfirm,
    visible: visibleConfirm,
  } = useModal();

  const [showEmoji, setShowEmoji] = useState(() => false);

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

  const hadnleSubmit = (values) => {
    if (!recipients) {
      return;
    }
    setDataSubmit({
      message: values.message,
      datetime: datetime,
      triggerType: values.triggerType,
      filter: getFilterUpdatesFeature(recipients),
    });

    showConfirm();
  };

  const handleConfirm = () => {
    dispatch(addUpdatesAsync(dataSubmit));
  };

  const recipientsOptions = useMemo(() => {
    return [
      {
        label: "Contacts",
        options: RECIPIENTS_TYPE,
      },
      {
        label: "Segments",
        options: formatOptionsFormDatabase({
          data: segments,
          prefixLabel: "Include Segment ",
          typeOption: "isSegment",
        }),
      },
      {
        label: "Location",
        options: formatOptionsFormDatabase({
          data: LIVE_IN_TYPE,
          prefixLabel: "Lives In: ",
          typeOption: "isLocation",
        }),
      },
      {
        label: "Tags",
        options: formatOptionsFormDatabase({
          data: tags,
          prefixLabel: "Is Tagged: ",
          typeOption: "isTagged",
        }),
      },
    ];
  }, [tags, segments]);

  useEffect(() => {
    setDataRecipients(RECIPIENTS_TYPE.concat(segments || []));
  }, [segments]);

  useEffect(() => {
    dispatch(getSegmentAsync());
    dispatch(getTagsAsync());
  }, []);

  useEffect(() => {
    if (newUpdate) {
      navigate("/updates");
      dispatch(resetUpdatesAsync());
    }
  }, [navigate, newUpdate]);

  return (
    <LayoutComponent className="add-updates-page">
      <div className="flex items-center">
        <div className="phone-image-frame">
          <div className="">
            <div className="phone-image-header">
              <div
                className="thumbnail-wrapper circular"
                style={{ width: "23px", height: "23px" }}
              >
                <img src={user?.image} alt="" />
              </div>
              <div className="phone-image-name">{user?.firstName}</div>
            </div>
            <div className="phone-image-content">
              <div className="phone-image-content-date">
                {format(new Date(datetime), "MM/dd/yyyy hh:mm aa")}
              </div>
              <div
                className="phone-image-content-message"
                dangerouslySetInnerHTML={{ __html: message }}
              ></div>
            </div>
          </div>
        </div>
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
            <DropdownGroup
              data={recipientsOptions}
              onChange={handleRecipients}
            />
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
                className="bg-transparent"
                wrapperClassName="w-auto mx-3"
              />
              <Form.Item
                name="triggerType"
                label=""
                rules={[{ required: true }]}
                className="mb-0"
              >
                <Select
                  placeholder="Seelect Schedule Type"
                  className="schedule-custom-select w-52"
                >
                  {UPDATE_TRIGGER_TYPE.map((item, index) => (
                    <Select.Option
                      key={`gender-${item}-${index}`}
                      value={item.value}
                    >
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
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
                  disabled={!recipients}
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
        dataSelect={recipientsOptions}
      />
      <ConfirmScheduleModal
        visible={visibleConfirm}
        handleOk={handleConfirm}
        handleCancel={closeConfirm}
        dataSubmit={dataSubmit}
      />
    </LayoutComponent>
  );
};

export default AddNewUpdates;
