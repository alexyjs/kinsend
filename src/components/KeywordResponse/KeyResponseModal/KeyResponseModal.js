import React, { useEffect, useState, useRef } from "react";
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
import { EditableText } from "../../../components";

import "./styles.less";

const emojiRegex =
  /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])$/;

const KeyResponseModal = ({ visible, handleOk, handleCancel, data, type }) => {
  const { tags } = useSelector(selectSettings);
  const [attachment, setAttachment] = useState({});
  const [form] = Form.useForm();
  const [keyword, setKeyword] = useState("");
  const [defaultValueMessage, setDefaultValueMessage] = useState("");
  const [message, setMessage] = useState("");
  const childRef = useRef();

  const {
    close: closeUpload,
    show: showUpload,
    visible: visibleUpload,
  } = useModal();
  const [showEmoji, setShowEmoji] = useState(false);
  const [showInputEmoji, setShowInputEmoji] = useState(false);

  const hanldeChangeMessage = (messageValue) => {
    setMessage(messageValue);
  };

  const handleSubmitSendMessage = (values) => {
    handleOk(type, {
      message: message
        .replace(/<span>/gi, "")
        .replace(/<\/span>/gi, "")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">"),
      keyword: values.keyword,
      tagId: values.tagId,
      fileAttached: attachment?.url || "",
      id: data?.id,
      index: data?.index,
    });
  };

  const handleUploadFile = (value) => {
    setAttachment(value);
    closeUpload();
  };

  const handleChangeIputEmoji = (emojiObj) => {
    setShowInputEmoji(false);
    let keyword = form.getFieldValue("keyword") || "";

    if (
      keyword &&
      (/^[a-zA-Z0-9]*$/.test(keyword) || emojiRegex.test(keyword))
    ) {
      return;
    }

    setKeyword(emojiObj.native);
    form.setFieldsValue({
      keyword: emojiObj.native,
    });
  };

  const handleChangeEmoji = (emojiObj) => {
    childRef.current.triggerUpdateText(emojiObj.native);
    setShowEmoji(false);
  };

  const handleChangeKeyword = (e) => {
    if (type === "REGEX") {
      form.setFieldsValue({
        keyword: e.target.value,
      });
      setKeyword(e.target.value);
      return;
    }

    const trimmedValue = e.target.value.replace(/ /g, "");
    if (/^[a-zA-Z0-9]*$/.test(trimmedValue) || emojiRegex.test(trimmedValue)) {
      form.setFieldsValue({
        keyword: trimmedValue,
      });
      setKeyword(trimmedValue);
    } else {
      form.setFieldsValue({
        keyword: keyword,
      });
      setKeyword(keyword);
    }
  };

  useEffect(() => {
    if (!data) {
      setAttachment({});
      form.setFieldsValue({
        message: "",
        keyword: "",
        tagId: "",
      });
    } else {
      setAttachment(data.fileAttached);
      form.setFieldsValue({
        // message: data.response.message,
        keyword: data.keyword,
        tagId: data.tagId || "",
      });
      setDefaultValueMessage(data.response.message);
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
        className="automation-trigger-modal key-response-modal"
      >
        <h3 className="font-bold text-center text-2xl mb-9">
          {!!data ? "Edit" : "New"} Response
        </h3>
        <p className="text-center">
          {type === "REGEX"
            ? "Enter a Regular Expression Rule. For matching incoming messages choose an auto response and/or tag to apply."
            : "Enter a Hashtag or Emoji Rule. For matching incoming messages choose an auto response and/or tag to apply."}
        </p>
        <div className="action-detail-wrap">
          <Form
            form={form}
            name="control-hooks"
            onFinish={handleSubmitSendMessage}
            className=""
          >
            <div className="relative">
              <label className="font-semibold" htmlFor="keyword">
                {type === "REGEX" ? "REGEX RULE" : "HASHTAG OR EMOJI RULE"}
              </label>
              <Form.Item name="keyword" rules={[{ required: true }]}>
                <Input
                  placeholder={
                    type === "REGEX" ? "Aabc[\\d]D" : "#Hashtag or 👍"
                  }
                  onChange={handleChangeKeyword}
                  suffix={
                    <>
                      {type === "HASHTAG_OR_EMOJI" && (
                        <EmojiIcon
                          className="cursor-pointer"
                          onClick={() => setShowInputEmoji(true)}
                        />
                      )}
                    </>
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
              <label className="font-semibold" htmlFor="message">
                AUTO RESPONSE
              </label>
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
            </div>
            <div className="mt-5">
              <label className="font-semibold" htmlFor="tagId">
                APPLY TAG
              </label>
              <Form.Item name="tagId" rules={[{ required: true }]}>
                <Select
                  allowClear
                  placeholder="Select tag..."
                  className="w-full md:w-[350px] bg-gray-1"
                >
                  {tags?.map((option) => (
                    <Select.Option key={`tag-${option.id}`} value={option.id}>
                      {option.name}
                    </Select.Option>
                  ))}
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
