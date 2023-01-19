import React, { useEffect, useState } from "react";
import { Row, Col, Form, Modal, Button, Input, Tooltip, Select } from "antd";
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
import { useSelector } from "react-redux";
import { selectSettings } from "../../../redux/settingsReducer";

const emojiRegex =
  /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])$/;

const KeyResponseModal = ({ visible, handleOk, handleCancel, data, index }) => {
  const { tags } = useSelector(selectSettings);
  const [attachment, setAttachmentUrl] = useState({});
  const [form] = Form.useForm();
  const [hashTagOrEmoji, setHashTagOrEmoji] = useState("");

  const {
    close: closeUpload,
    show: showUpload,
    visible: visibleUpload,
  } = useModal();
  const [showEmoji, setShowEmoji] = useState(false);
  const [showInputEmoji, setShowInputEmoji] = useState(false);

  const handleSubmitSendMessage = (values) => {
    handleOk({
      message: values.message,
      hashTagOrEmoji: values.hashTagOrEmoji,
      tagId: values.tagId,
      fileAttached: attachment,
    });
  };

  const handleUploadFile = (value) => {
    setAttachmentUrl(value);
    closeUpload();
  };

  const handleChangeIputEmoji = (emojiObj) => {
    setShowInputEmoji(false);
    let hashTagOrEmoji = form.getFieldValue("hashTagOrEmoji") || "";

    if (
      hashTagOrEmoji &&
      (/^[a-zA-Z0-9]*$/.test(hashTagOrEmoji) || emojiRegex.test(hashTagOrEmoji))
    ) {
      return;
    }

    setHashTagOrEmoji(emojiObj.native);
    form.setFieldsValue({
      hashTagOrEmoji: emojiObj.native,
    });
  };

  const handleChangeEmoji = (emojiObj) => {
    let message = form.getFieldValue("message") || "";
    form.setFieldsValue({
      message: message + emojiObj.native,
    });
    setShowEmoji(false);
  };

  const handleChangeHashTagOrEmoji = (e) => {
    const trimmedValue = e.target.value.replace(/ /g, "");
    if (/^[a-zA-Z0-9]*$/.test(trimmedValue) || emojiRegex.test(trimmedValue)) {
      form.setFieldsValue({
        hashTagOrEmoji: trimmedValue,
      });
      setHashTagOrEmoji(trimmedValue);
    } else {
      form.setFieldsValue({
        hashTagOrEmoji: hashTagOrEmoji,
      });
      setHashTagOrEmoji(hashTagOrEmoji);
    }
  };

  useEffect(() => {
    if (!data) {
      setAttachmentUrl({});
      form.setFieldsValue({
        message: "",
      });
    } else {
      setAttachmentUrl(data.fileAttached);
      form.setFieldsValue({
        message: data.message,
      });
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
        <h3 className="font-bold text-center text-2xl mb-9">New Response</h3>
        <p className="text-center">
          Enter a Hashtag or Emoji Rule. For matching incoming messages choose
          an auto response and/or tag to apply
        </p>
        <div className="action-detail-wrap">
          <Form
            form={form}
            name="control-hooks"
            onFinish={handleSubmitSendMessage}
            className=""
          >
            <div className="relative">
              <label className="font-semibold" htmlFor="hashTagOrEmoji">HASHTAG OR EMOJI RULE</label>
              <Form.Item name="hashTagOrEmoji" rules={[{ required: true }]}>
                <Input
                  placeholder="#Hashtag or 👍"
                  onChange={handleChangeHashTagOrEmoji}
                  suffix={
                    <EmojiIcon
                      className="cursor-pointer"
                      onClick={() => setShowInputEmoji(true)}
                    />
                  }
                />
              </Form.Item>
              {showInputEmoji && (
                <EmojiPicker
                  className="absolute top-14 right-0 z-10"
                  onEmojiSelect={handleChangeIputEmoji}
                />
              )}
            </div>
            <div>
              <label className="font-semibold" htmlFor="message">AUTO RESPONSE</label>
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
            </div>
            <div className="mt-5">
              <label className="font-semibold" htmlFor="tagId">APPLY TAG</label>
              <Form.Item name="tagId">
                <Select
                  allowClear
                  placeholder="Select tag..."
                  className="w-full md:w-[350px] bg-gray-1"
                >
                  {
                    tags?.map((option) => (
                      <Select.Option
                        key={`tag-${option.id}`}
                        value={option.id}
                      >
                        {option.name}
                      </Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </div>
            {attachment?.name && <b>{attachment?.name}</b>}
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

export default KeyResponseModal;
