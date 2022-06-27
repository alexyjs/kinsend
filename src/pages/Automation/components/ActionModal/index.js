import React, { useEffect, useState } from "react";
import { Row, Col, Form, Select, Modal, Button, Input, Tooltip } from "antd";
import { useSelector } from "react-redux";
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
import "./styles.less";

const ActionModal = ({ visible, handleOk, handleCancel, data, index }) => {
  const [action, setAction] = useState({});
  const [attachment, setAttachmentUrl] = useState({});
  const [form] = Form.useForm();
  // const [message, setMessage] = useState("");
  const {
    close: closeUpload,
    show: showUpload,
    visible: visibleUpload,
  } = useModal();
  const [showEmoji, setShowEmoji] = useState(false);
  const handleSelectAction = (value) => {
    setAction({
      type: value,
    });
  };

  const handleResetAction = () => {
    setAction({});
  };

  const hadnleSubmitSendMessage = (values) => {
    console.log("###hadnleSubmitSendMessage", values);
    handleOk(data, index, {
      type: "send_message",
      messame: values.message,
      fileAttached: attachment,
    });
  };

  const handleUploadFile = (value) => {
    console.log("###handleUploadFile", value);
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

  useEffect(() => {
    setAction(data);
  }, [data]);
  console.log("###action", action);
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
        {action && action?.type === "delay" ? (
          <div className="action-detail-wrap">
            <div className="flex justify-between items-center action-detail-input">
              <span>Delay</span>
              <button
                className="text-primary px-3 py-1"
                onClick={handleResetAction}
              >
                Change
              </button>
            </div>
          </div>
        ) : action && action?.type ? (
          <div className="action-detail-wrap">
            <div className="flex justify-between items-center action-detail-input">
              <span>Send Message</span>
              <button
                className="text-primary px-3 py-1"
                onClick={handleResetAction}
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
                <div className="hint">
                  <Tooltip
                    placement="topLeft"
                    title={
                      <>
                        Messages without <b>emojis & special</b> characters are
                        sent in segments of <b>160 characters.</b>
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
                        Carriers charge you for <b>every segment</b> they
                        deliver to your recipient
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
                      onClick={handleResetAction}
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
                value="send_message"
                onClick={handleSelectAction}
              />
            </Col>
            <Col className="mx-4">
              <Action
                Icon={ContactCreatedIcon}
                label="Delay"
                value="delay"
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
