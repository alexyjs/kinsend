import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Form, Select, Modal, Button, Input, Tooltip } from "antd";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimezoneSelect from "react-timezone-select";

import { useModal } from "../../../../hook/useModal";
import {
  FirstMessageIcon,
  ContactCreatedIcon,
  AutomationActionMessageIcon,
  AutomationActionMaxMessageIcon,
  AttachmentIcon,
  EmojiIcon,
} from "../../../../assets/svg";
import { UploadFileModal, EmojiPicker } from "./../../../../components";
import Action from "../Action";
import {
  DELAY_TYPE,
  DURATION_TYPE,
  DAY_OF_WEEK_TYPE,
  MONTH_TYPE,
} from "../../../../utils/constants";
import { EditableText } from "../../../../components";

import { clearEmptyField } from "../../../../utils";

import "./styles.less";

const ActionModal = ({ visible, handleOk, handleCancel, data, index }) => {
  const [actionType, setActionType] = useState("");
  const [attachment, setAttachmentUrl] = useState({});
  const [form] = Form.useForm();

  // TODO: move to form
  const [duration, setDuration] = useState(DELAY_TYPE[0].value);
  const [datetime, setDatetime] = useState(new Date());

  const [dayOfMonth, setDayOfMonth] = useState(1);
  const [month, setMonthState] = useState(MONTH_TYPE[0].value);

  const [dayOfWeek, setDayOfWeek] = useState(DAY_OF_WEEK_TYPE[0].value);

  const [time, setTime] = useState(setHours(setMinutes(new Date(), 30), 16));

  const [days, setDaysState] = useState(0);
  const [hours, setHoursState] = useState(0);
  const [minutes, setMinutesState] = useState(0);
  const [seconds, setSecondsState] = useState(0);
  const [defaultValueMessage, setDefaultValueMessage] = useState("");
  const [message, setMessage] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const childRef = useRef();

  const {
    close: closeUpload,
    show: showUpload,
    visible: visibleUpload,
  } = useModal();
  const [showEmoji, setShowEmoji] = useState(false);
  const handleSelectAction = (value) => {
    setActionType(value);
  };

  const hanldeChangeMessage = (messageValue) => {
    setMessage(messageValue);
  };

  const handleResetActionType = () => {
    setActionType("");
  };

  const hadnleSubmitSendMessage = (values) => {
    handleOk(data, index, {
      type: actionType,
      message: message,
      fileAttached: attachment,
      delay: null,
    });
  };

  const handleSubmitDelay = () => {
    let delay = {};
    if (duration === DURATION_TYPE.TIME_FROM_TRIGGER) {
      delay = {
        days: parseInt(days) || null,
        hours: parseInt(hours) || null,
        minutes: parseInt(minutes) || null,
        seconds: parseInt(seconds) || null,
      };
    } else if (duration === DURATION_TYPE.UNTIL_NEXT_DAY) {
      delay = {
        time: time || null,
        timezone: selectedTimezone || null,
      };
    } else if (duration === DURATION_TYPE.UNTIL_NEXT_DAY_OF_WEEK) {
      delay = {
        dayOfWeek: dayOfWeek || null,
        time: time || null,
        timezone: selectedTimezone || null,
      };
    } else if (duration === DURATION_TYPE.UNTIL_NEXT_DAY_OF_MONTH) {
      delay = {
        dayOfMonth: dayOfMonth || null,
        month: month || null,
        time: time || null,
        timezone: selectedTimezone || null,
      };
    } else if (duration === DURATION_TYPE.UNTIL_DATE) {
      delay = {
        datetime: datetime || null,
      };
    }
    const newData = {
      type: actionType,
      delay: clearEmptyField({
        duration: duration,
        ...delay,
      }),
    };
    console.log("###handleOk", data, index, newData);
    handleOk(data, index, newData);
  };

  const handleUploadFile = (value) => {
    setAttachmentUrl(value);
    closeUpload();
  };

  const handleChangeEmoji = (emojiObj) => {
    childRef.current.triggerUpdateText(emojiObj.native);
    setShowEmoji(false);
  };

  const handleSelectTimeZome = (e) => {
    setSelectedTimezone(e);
  };

  useEffect(() => {
    setDefaultValueMessage(data?.message);
  }, [data]);

  const renderDelayContent = () => {
    if (duration === DURATION_TYPE.TIME_FROM_TRIGGER) {
      return (
        <Row gutter={24}>
          <Col sm={12}>
            <label>Days</label>
            <Input
              value={days}
              onChange={(e) => {
                setDaysState(e.target.value);
              }}
              type="number"
              min={0}
              max={31}
            />
          </Col>
          <Col sm={12}>
            <label>Hours</label>
            <Input
              value={hours}
              onChange={(e) => {
                setHoursState(e.target.value);
              }}
              type="number"
              min={0}
              max={23}
            />
          </Col>
          <Col sm={12}>
            <label>Minutes</label>
            <Input
              value={minutes}
              onChange={(e) => {
                setMinutesState(e.target.value);
              }}
              type="number"
              min={0}
              max={59}
            />
          </Col>
          <Col sm={12}>
            <label>Seconds</label>
            <Input
              value={seconds}
              onChange={(e) => {
                setSecondsState(e.target.value);
              }}
              type="number"
              min={0}
              max={59}
            />
          </Col>
        </Row>
      );
    }
    if (duration === DURATION_TYPE.UNTIL_NEXT_DAY) {
      return (
        <>
          <div>
            <label>TIME</label>
            <DatePicker
              selected={time}
              onChange={(date) => setTime(date)}
              // dateFormat="MMMM d, yyyy h:mm aa"
              timeFormat="HH:mm aa"
              timeIntervals={15}
              dateFormat="h:mm aa"
              showTimeSelectOnly
              showTimeSelect
            />
          </div>
          <div>
            <label>TIMEZONE</label>
            <TimezoneSelect
              value={selectedTimezone}
              onChange={handleSelectTimeZome}
            />
          </div>
        </>
      );
    }
    if (duration === DURATION_TYPE.UNTIL_NEXT_DAY_OF_WEEK) {
      return (
        <>
          <div>
            <label>Day Of Week</label>
            <Select value={dayOfWeek} onChange={setDayOfWeek}>
              {DAY_OF_WEEK_TYPE.map((item) => (
                <Select.Option value={item.value}>{item.label}</Select.Option>
              ))}
            </Select>
          </div>
          <div>
            <label>TIME</label>
            <DatePicker
              selected={time}
              onChange={(date) => setTime(date)}
              // dateFormat="MMMM d, yyyy h:mm aa"
              timeFormat="HH:mm aa"
              timeIntervals={15}
              dateFormat="h:mm aa"
              showTimeSelectOnly
              showTimeSelect
            />
          </div>
          <div>
            <label>TIMEZONE</label>
            <TimezoneSelect
              value={selectedTimezone}
              onChange={setSelectedTimezone}
            />
          </div>
        </>
      );
    }
    if (duration === DURATION_TYPE.UNTIL_NEXT_DAY_OF_MONTH) {
      return (
        <>
          <Row>
            <Col>
              <label>Day Of Month</label>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col sm={12}>
              {/* TODO: refactor this one */}
              <Input
                max={31}
                min={1}
                value={dayOfMonth}
                onChange={(e) => {
                  setDayOfMonth(e.target.value);
                }}
              />
            </Col>
            <Col sm={12}>
              <label></label>
              <Select value={month} onChange={setMonthState}>
                {MONTH_TYPE.map((item) => (
                  <Select.Option value={item.value}>{item.label}</Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          <div>
            <label>TIME</label>
            <DatePicker
              selected={time}
              onChange={(date) => setTime(date)}
              // dateFormat="MMMM d, yyyy h:mm aa"
              timeFormat="HH:mm aa"
              timeIntervals={15}
              dateFormat="h:mm aa"
              showTimeSelectOnly
              showTimeSelect
            />
          </div>
          <div>
            <label>TIMEZONE</label>
            <TimezoneSelect
              value={selectedTimezone}
              onChange={setSelectedTimezone}
            />
          </div>
        </>
      );
    }
    // UNTIL_DATE
    return (
      <div>
        <label>DATE / TIME</label>
        <DatePicker
          showTimeSelect
          timeIntervals={5}
          selected={datetime}
          onChange={(date) => setDatetime(date)}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>
    );
  };

  useEffect(() => {
    if (!data) {
      setActionType("");
      setAttachmentUrl({});
      form.setFieldsValue({
        message: "",
      });
      setDuration(DELAY_TYPE[0].value);
      setDatetime(new Date());
      setDayOfMonth(1);
      setMonthState(MONTH_TYPE[0].value);
      setDayOfWeek(DAY_OF_WEEK_TYPE[0].value);
      setTime(setHours(setMinutes(new Date(), 30), 16));
      setDaysState("");
      setHoursState("");
      setMinutesState("");
      setSecondsState("");

      setSelectedTimezone({});
    } else {
      setActionType(data.type);
      setAttachmentUrl(data.fileAttached);
      form.setFieldsValue({
        message: data.message,
      });

      if (data.type === "DELAY") {
        console.log("###data.delay", data.delay);
        setDuration(data.delay?.duration || DELAY_TYPE[0].value);
        setDatetime(
          data.delay?.datetime ? new Date(data.delay?.datetime) : new Date()
        );
        setDayOfMonth(data.delay?.dayOfMonth || 1);
        setMonthState(data.delay?.month || MONTH_TYPE[0].value);
        setDayOfWeek(data.delay?.dayOfWeek || DAY_OF_WEEK_TYPE[0].value);
        setTime(
          data.delay?.time
            ? new Date(data.delay?.time)
            : setHours(setMinutes(new Date(), 30), 16)
        );
        setDaysState(data.delay?.days || "");
        setHoursState(data.delay?.hours || "");
        setMinutesState(data.delay?.minutes || "");
        setSecondsState(data.delay?.seconds || "");
        setSelectedTimezone(data.delay?.timezone || data.delay?.timeZone || {});
      }
    }
  }, [visible, data]);

  return (
    <>
      <Modal
        key="TriggerModal"
        visible={visible}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closable={true}
        destroyOnClose={true}
        centered
        className="automation-trigger-modal"
      >
        <h3 className="font-bold text-center text-2xl mb-9">Select Action</h3>
        <p className="text-center">
          Actions are the building blocks of your automation
        </p>
        {actionType === "DELAY" ? (
          <div className="action-detail-wrap delay-wrap">
            <div className="flex justify-between items-center action-detail-input">
              <span>Delay</span>
              <button
                className="text-primary px-3 py-1"
                onClick={handleResetActionType}
              >
                Change
              </button>
            </div>
            <label>Duration</label>
            <Select value={duration} onChange={setDuration}>
              {DELAY_TYPE.map((item) => (
                <Select.Option value={item.value}>{item.label}</Select.Option>
              ))}
            </Select>
            <div className="delay-content-wrap">{renderDelayContent()}</div>
            <Row justify="space-around" className="mt-12">
              <Col>
                <Button
                  className="md:min-w-200 ml-5"
                  type="primary"
                  size="large"
                  onClick={handleCancel}
                  block
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button
                  className="md:min-w-200 ml-5"
                  type="primary"
                  size="large"
                  onClick={handleSubmitDelay}
                  block
                >
                  Save
                </Button>
              </Col>
            </Row>
          </div>
        ) : actionType ? (
          <div className="action-detail-wrap">
            <div className="flex justify-between items-center action-detail-input">
              <span>Send Message</span>
              <button
                className="text-primary px-3 py-1 automation-trigger-modal-"
                onClick={handleResetActionType}
              >
                Change
              </button>
            </div>
            <Form
              form={form}
              name="control-hooks"
              onFinish={hadnleSubmitSendMessage}
              className=""
            >
              <div className="sendmessage-textarea-wrap">
                <EditableText
                  defaultValue={defaultValueMessage}
                  onChange={hanldeChangeMessage}
                  ref={childRef}
                  isFormEnable
                />
                <div className="textarea-actions">
                  <AttachmentIcon onClick={showUpload} />
                  <EmojiIcon onClick={() => setShowEmoji(true)} />
                  {showEmoji && (
                    <EmojiPicker onEmojiSelect={handleChangeEmoji} />
                  )}
                  <UploadFileModal
                    visible={visibleUpload}
                    handleOk={handleUploadFile}
                    handleCancel={closeUpload}
                  />
                </div>
              </div>
              {attachment?.name && <b>{attachment?.name}</b>}
              <Row justify="end" className="mt-12">
                <Col>
                  <Form.Item noStyle>
                    <Button
                      className="md:min-w-200"
                      type="text"
                      size="large"
                      onClick={handleResetActionType}
                    >
                      Cancel
                    </Button>
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
                    >
                      Save
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        ) : (
          <Row justify="center" className="mt-12" gutters={16}>
            <Col className="mx-4">
              <Action
                Icon={FirstMessageIcon}
                label="Send Message"
                value="ACTION"
                onClick={handleSelectAction}
              />
            </Col>
            <Col className="mx-4">
              <Action
                Icon={ContactCreatedIcon}
                label="Delay"
                value="DELAY"
                onClick={handleSelectAction}
              />
            </Col>
          </Row>
        )}
      </Modal>
    </>
  );
};

export default ActionModal;
