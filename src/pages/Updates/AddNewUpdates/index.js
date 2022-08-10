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
import { NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  selectUpdates,
  getSegmentAsync,
  addUpdatesAsync,
  resetUpdatesAsync,
  sendTestMessageAsync,
} from "../../../redux/updatesReducer";
import {
  selectSettings,
  getTagsAsync,
  getFormSubmissionsAsync,
  getSubscriberLocationsAsync,
} from "../../../redux/settingsReducer";
import { selectUsers } from "../../../redux/userReducer";
import { useModal } from "../../../hook/useModal";
import {
  UploadFileModal,
  EmojiPicker,
  LayoutComponent,
  DropdownReactSelect,
  EditableText,
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
import SendTestMessage from "../components/SendTestMessage";

import "./styles.less";

const AddNewUpdates = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [recipients, setRecipients] = useState(null);
  const [attachment, setAttachmentUrl] = useState({});
  const [datetime, setDatetime] = useState(new Date());
  const { newUpdate, segments } = useSelector(selectUpdates);
  const { tags, formSubmissions, subscriberLocations } =
    useSelector(selectSettings);
  const { user } = useSelector(selectUsers);
  const [dataRecipients, setDataRecipients] = useState(RECIPIENTS_TYPE);
  const [dataSubmit, setDataSubmit] = useState(null);

  // const message = Form.useWatch("message", form);
  const [message, setMessage] = useState("");

  const showMergeField =
    message &&
    !message.includes(`&lt;fname&gt;`) &&
    !message.includes(`&lt;lname&gt;`) &&
    !message.includes(`&lt;name&gt;`) &&
    !message.includes(`&lt;mobile&gt;`) &&
    !message.includes(`&lt;form&gt;`);
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

  const {
    close: closeTestMessage,
    show: showTestMessage,
    visible: visibleTestMessage,
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
      message: message,
      datetime: datetime,
      triggerType: values.triggerType,
      filter: getFilterUpdatesFeature(recipients),
      fileUrl: attachment?.url,
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
  }, [tags, segments, subscriberLocations]);

  const phoneSubmissionOptions = useMemo(() => {
    if (!formSubmissions?.length) {
      return [];
    }
    return formSubmissions.map((item, index) => {
      return {
        ...item,
        value: `###${index}###` + item?.phoneNumber?.phone,
        label: `${item?.firstName} ${item?.lastName} ${item?.phoneNumber?.phone}`,
      };
    });
  }, [formSubmissions]);

  const handleSubmitTestMessage = (phone) => {
    const params = {
      message: message,
      contactsId: phone.id,
      phoneNumber: phone.phoneNumber,
    };
    dispatch(sendTestMessageAsync(params));
    closeTestMessage();
  };

  const hanldeChangeMessage = (messageValue) => {
    setMessage(messageValue);
  };

  useEffect(() => {
    setDataRecipients(RECIPIENTS_TYPE.concat(segments || []));
  }, [segments]);

  useEffect(() => {
    dispatch(getSegmentAsync());
    dispatch(getTagsAsync());
    dispatch(getFormSubmissionsAsync());
    // dispatch(getSubscriberLocationsAsync());
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
              {attachment?.url && (
                <img src={attachment.url} className="mt-3 mb-4" />
              )}
              <div
                className="phone-image-content-message"
                dangerouslySetInnerHTML={{ __html: message }}
              ></div>
            </div>
          </div>
        </div>
        <Form
          form={form}
          initialValues={{
            triggerType: UPDATE_TRIGGER_TYPE[0].value,
          }}
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
            {showMergeField && (
              <div className="text-right text-red-600	">
                {`To increase delivery rates, the message must contain at least one merge field. Merge fields accepted are <fname>, <lname>, <name>, <mobile> and <form>.`}
              </div>
            )}
            {/* <Form.Item
              name="message"
              label="New update"
              rules={[{ required: true, max: 160 }]}
              onChange={hanldeChangeMessage}
            >
              <Input.TextArea
                style={{ height: 200 }}
                placeholder="Compose your message.."
              />
            </Form.Item> */}
            <EditableText onChange={hanldeChangeMessage} />
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
            <DropdownReactSelect
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
                timeIntervals={5}
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
                  placeholder="Select"
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
                  className="md:min-w-200"
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
        handleSendTest={showTestMessage}
        dataSubmit={dataSubmit}
      />
      <SendTestMessage
        visible={visibleTestMessage}
        handleOk={handleSubmitTestMessage}
        handleCancel={closeTestMessage}
        dataSubmit={dataSubmit}
        phoneOptions={phoneSubmissionOptions}
      />
    </LayoutComponent>
  );
};

export default AddNewUpdates;
