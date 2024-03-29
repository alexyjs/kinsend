import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { format, differenceInMinutes, addMinutes, getMinutes } from "date-fns";
import { NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  selectUpdates,
  getSegmentAsync,
  addUpdatesAsync,
  resetUpdatesAsync,
  sendTestMessageAsync,
  getUpdatesDetailAsync,
  editUpdatesAsync,
} from "../../../redux/updatesReducer";
import {
  selectSettings,
  getTagsAsync,
  getFormSubmissionsAsync,
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
import { AttachmentIcon, EmojiIcon, DatetimeIcon } from "../../../assets/svg";

import {
  RECIPIENTS_TYPE,
  UPDATE_TRIGGER_TYPE,
  LIVE_IN_TYPE,
} from "../../../utils/update";
import {
  formatOptionsFormDatabase,
  getFilterUpdatesFeature,
  formatOptions,
  getFilterUpdatesSelected,
  getMessagePreview,
} from "../../../utils";
import NewSegmentModal from "../components/NewSegmentModal";
import ConfirmScheduleModal from "../components/ConfirmScheduleModal";
import SendTestMessage from "../components/SendTestMessage";

import { MERGE_FIELDS } from "../../../utils/constants";

import "./styles.less";

const AddNewUpdates = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [recipients, setRecipients] = useState(null);
  const [attachment, setAttachmentUrl] = useState({});
  const [datetime, setDatetime] = useState(new Date());
  const { newUpdate, segments, updatesDetail } = useSelector(selectUpdates);
  const { tags, formSubmissions } = useSelector(selectSettings);
  const { user } = useSelector(selectUsers);
  const [dataSubmit, setDataSubmit] = useState(null);
  const childRef = useRef();
  let { updatesId } = useParams();

  // const message = Form.useWatch("message", form);
  const [message, setMessage] = useState("");
  const [defaultValueMessage, setDefaultValueMessage] = useState("");
  const [messagePreview, setMessagePreview] = useState("");

  const userPreviewFields = useMemo(() => {
    return {
      fname: user?.firstName,
      lname: user?.lastName,
      name: `${user?.firstName} ${user?.lastName}`,
      mobile: `${user?.phoneNumber[0].code}${user?.phoneNumber[0].phone}`,
    };
  }, [user]);

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
    // let message = form.getFieldValue("message") || "";
    // form.setFieldsValue({
    //   message: message + emojiObj.native,
    // });
    childRef.current.triggerUpdateText(emojiObj.native);
    setShowEmoji(false);
  };

  const handleRecipients = (item) => {
    setRecipients(item);
  };

  const hadnleSubmit = (values) => {
    if (!recipients) {
      return;
    }
    const params = {
      message: message
        .replace(/<\/?span[^>]*>/g, "")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&nbsp;/gi, " "),
      datetime: datetime,
      triggerType: values.triggerType,
      filter: getFilterUpdatesFeature(recipients),
      fileUrl: attachment?.url,
    };

    setDataSubmit(params);
    showConfirm();
  };

  const handleConfirm = () => {
    if (updatesDetail?.id) {
      dispatch(
        editUpdatesAsync({ dataUpdate: dataSubmit, id: updatesDetail.id })
      );
    } else {
      dispatch(addUpdatesAsync(dataSubmit));
    }
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
          data: formatOptions(LIVE_IN_TYPE),
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

  const handleSubmitTestMessage = ({ phone, fname, lname, name, mobile }) => {
    const params = {
      message: message
        .replace(/<span>/gi, "")
        .replace(/<\/span>/gi, "")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">"),
      contactsId: phone.id,
      phoneNumber: phone.phoneNumber,
      fname,
      lname,
      name,
      mobile,
    };
    console.log("###handleSubmitTestMessage", params);
    dispatch(sendTestMessageAsync(params));
    closeTestMessage();
  };

  const hanldeChangeMessage = (messageValue) => {
    const messagePreview = getMessagePreview(messageValue, userPreviewFields);
    setMessage(messageValue);
    setMessagePreview(messagePreview);
  };

  useEffect(() => {
    dispatch(getSegmentAsync());
    dispatch(getTagsAsync());
    dispatch(getFormSubmissionsAsync());
    // dispatch(getSubscriberLocationsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (newUpdate) {
      navigate("/updates");
      dispatch(resetUpdatesAsync());
    }
  }, [navigate, newUpdate, dispatch]);

  // Reload datetime and update time schedule

  const handleReloadtime = () => {
    if (
      differenceInMinutes(datetime, new Date()) <= 0 &&
      getMinutes(datetime) <= getMinutes(new Date())
    ) {
      const newDate = addMinutes(new Date(), 1);
      setDatetime(newDate);
    }
  };

  const clearData = useCallback(() => {
    form.setFieldsValue({
      triggerType: UPDATE_TRIGGER_TYPE[0].value,
    });

    setDefaultValueMessage("");
    setMessage("");
    setDatetime(new Date());
    setRecipients(null);
    setAttachmentUrl({});
  }, [form]);

  useEffect(() => {
    handleReloadtime();
    const timer = setInterval(() => {
      handleReloadtime();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [datetime, handleReloadtime]);

  useEffect(() => {
    if (updatesId && recipientsOptions) {
      dispatch(getUpdatesDetailAsync(updatesId));
    }
  }, [updatesId, recipientsOptions, dispatch]);

  useEffect(() => {
    if (updatesId && updatesDetail) {
      form.setFieldsValue({
        triggerType: updatesDetail.triggerType,
      });
      const messagePreview = getMessagePreview(
        updatesDetail?.message,
        userPreviewFields
      );
      setMessagePreview(messagePreview);
      console.log(updatesDetail?.message);
      setDefaultValueMessage(updatesDetail?.message);
      setMessage(updatesDetail?.message);
      setDatetime(new Date(updatesDetail?.datetime));
      const recipientsSelected = getFilterUpdatesSelected(
        updatesDetail.filter,
        recipientsOptions
      );
      setRecipients(recipientsSelected);
      setAttachmentUrl({
        url: updatesDetail?.fileUrl,
      });
    } else {
      clearData();
    }
  }, [updatesDetail, recipientsOptions, updatesId]);

  //   console.log("###updatesDetail:", updatesDetail);

  console.log(message);

  return (
    <LayoutComponent className="add-updates-page">
      <div className="flex items-center md:p-0 p-3">
        <div className="phone-image-frame md:flex hidden">
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
                dangerouslySetInnerHTML={{ __html: messagePreview }}
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
            {showMergeField && (
              <div className="text-left text-red-600	">
                {`To increase delivery rates, the message must contain at least one merge field. Merge fields accepted are <fname>, <lname>, <name> and <mobile>.`}
              </div>
            )}
            <EditableText
              defaultValue={defaultValueMessage}
              onChange={hanldeChangeMessage}
              ref={childRef}
            />
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
              value={recipients}
              data={recipientsOptions}
              onChange={handleRecipients}
            />
          </div>
          <div className="flex flex-col">
            SCHEDULE TIME/INTERVAL
            <div className="datetime-wrap inline-flex md:items-center items-start mt-3 md:flex-row flex-col">
              <div className="flex items-center">
                <DatetimeIcon />
                <DatePicker
                  minDate={new Date()}
                  minTime={new Date().getTime()}
                  maxTime={new Date().setHours(23, 59, 59, 999)}
                  showTimeSelect
                  timeIntervals={5}
                  selected={datetime}
                  onChange={(date) => setDatetime(date)}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="bg-transparent"
                  wrapperClassName="w-auto mx-3"
                />
              </div>
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
          <Row justify="end" className="mt-5">
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
