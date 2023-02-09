import React, { useEffect, useState } from "react";
import { Row, Col, Form, Modal, Button, Input, Tooltip } from "antd";
import { useModal } from "../../../hook/useModal";
import UploadFileModal from "../../UploadFileModal";
import EmojiPicker from "../../EmojiPicker";

import {
  AutomationActionMessageIcon,
  AutomationActionMaxMessageIcon,
  AttachmentIcon,
  EmojiIcon,
} from "../../../assets/svg";

import "react-datepicker/dist/react-datepicker.css";
import "./styles.less";

const SetMessageModal = ({ visible, handleOk, handleCancel, data, index }) => {
  const [attachment, setAttachment] = useState({});
  const [form] = Form.useForm();

  const {
    close: closeUpload,
    show: showUpload,
    visible: visibleUpload,
  } = useModal();
  const [showEmoji, setShowEmoji] = useState(false);

  const hadnleSubmitSendMessage = (values) => {
    handleOk(data, index, {
      message: values.message,
      fileAttached: attachment?.url || "",
    });
  };

  const handleUploadFile = (value) => {
    debugger;
    setAttachment(value);
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
    if (!data) {
      setAttachment({});
      form.setFieldsValue({
        message: "",
      });
    } else {
      setAttachment(data.fileAttached);
      form.setFieldsValue({
        message: data.message,
      });
    }
  }, [visible, data]);
  console.log("###data", data);
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
        <h3 className="font-bold text-center text-2xl mb-9">
          Customize Action
        </h3>
        <p className="text-center">Set up an Action to fire automatically</p>
        <div className="action-detail-wrap">
          <Form
            form={form}
            name="control-hooks"
            onFinish={hadnleSubmitSendMessage}
            className=""
          >
            <p className="mb-1">
              <strong>Note</strong>: you can send a link to your default form
              using the merge field {"<form>"} or an arbitrary link
            </p>
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
                      Carriers charge you for <b>every segment</b> they deliver
                      to your recipient
                    </>
                  }
                >
                  <Button>
                    <AutomationActionMessageIcon />
                  </Button>
                </Tooltip>
              </div>
              <Form.Item name="message" rules={[{ required: true, max: 160 }]}>
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
            {attachment?.name ? (
              <b>{attachment?.name}</b>
            ) : data?.fileAttached ? (
              <a
                href={data?.fileAttached}
                target="_blank"
                className="block underline"
              >
                {data?.fileAttached}
              </a>
            ) : null}
            <Row justify="end" className="mt-12">
              <Col>
                <Form.Item noStyle>
                  <Button
                    className="md:min-w-200 mr-5"
                    type="text"
                    size="large"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
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
                  >
                    Save
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default SetMessageModal;
