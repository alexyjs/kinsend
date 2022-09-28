import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useNavigate } from "react-router-dom";

import {
  UploadFileModal,
  EmojiPicker,
  LayoutComponent,
  EditableText,
} from "../../../components";
import { AttachmentIcon, EmojiIcon } from "../../../assets/svg";
import { selectUsers } from "../../../redux/userReducer";
import SideBarMessage from "../components/SideBarMessage";
import SubscriberInfor from "../components/SubscriberInfor";
import MessageTimeline from "../components/MessageTimeline";
import { useModal } from "../../../hook/useModal";

import {
  selectMessage,
  getMessageAsync,
  getMessageDetailAsync,
  sendSmsAsync,
  resetSendSmsAsync,
} from "../../../redux/messageReducer";
import {
  getSubscriberByMessageIdAsync,
  selectSubscriptions,
} from "../../../redux/subscriptionReducer";
import { getTagsAsync } from "../../../redux/settingsReducer";

import "./styles.less";

const MessageDetail = () => {
  let { messageId } = useParams();
  const { user } = useSelector(selectUsers);
  const dispatch = useDispatch();
  const { message, messageDetail, smsMessage } = useSelector(selectMessage);
  const { subscriberDetail } = useSelector(selectSubscriptions);
  const [showEmoji, setShowEmoji] = useState(() => false);
  const childRef = useRef();
  const [attachment, setAttachmentUrl] = useState({});
  const [defaultValueMessage, setDefaultValueMessage] = useState("");
  const [directMessage, setDirectMessage] = useState("");

  const {
    close: closeUpload,
    show: showUpload,
    visible: visibleUpload,
  } = useModal();

  const hanldeSubmit = () => {
    if (!directMessage && !attachment?.url) {
      return false;
    }
    const params = {
      formSubmissionId: subscriberDetail.id,
      message:
        directMessage
          .replace(/<span>/gi, "")
          .replace(/<\/span>/gi, "")
          .replace(/&lt;/gi, "<")
          .replace(/&gt;/gi, ">") || "",
      fileUrl: attachment?.url || "",
    };
    dispatch(sendSmsAsync(params));
  };

  const hanldeChangeMessage = (messageValue) => {
    setDirectMessage(messageValue);
  };

  const handleChangeEmoji = (emojiObj) => {
    // let message = form.getFieldValue("message") || "";
    // form.setFieldsValue({
    //   message: message + emojiObj.native,
    // });
    childRef.current.triggerUpdateText(emojiObj.native);
    setShowEmoji(false);
  };

  const handleUploadFile = (value) => {
    setAttachmentUrl(value);
    closeUpload();
  };

  useEffect(() => {
    dispatch(getMessageAsync());
  }, [dispatch]);

  useEffect(() => {
    if (messageId) {
      dispatch(getMessageDetailAsync(messageId));
      dispatch(getSubscriberByMessageIdAsync(messageId));
      setDirectMessage("");
      setDefaultValueMessage("");
    }
  }, [messageId]);

  useEffect(() => {
    dispatch(getTagsAsync());
  }, []);

  useEffect(() => {
    if (smsMessage) {
      dispatch(getMessageDetailAsync(messageId));
      dispatch(resetSendSmsAsync());
      setAttachmentUrl({});
      setDefaultValueMessage("");
      setDirectMessage("");
    }
  }, [smsMessage]);

  console.log("###messageDetail", messageDetail);
  return (
    <LayoutComponent className="messageDetail-page">
      <div className="flex min-h-full">
        <div className="w-350">
          <SideBarMessage data={message} />
        </div>
        <div className="flex-1 flex messageDetail-body flex-col">
          <MessageTimeline data={messageDetail} className="flex-1" />
          <div className="custom-textarea-wrap messageDetail-page-send-message border-left">
            <EditableText
              defaultValue={defaultValueMessage}
              onChange={hanldeChangeMessage}
              ref={childRef}
              className=""
              handleEnterSubmit={hanldeSubmit}
              isDropdownTop
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
            <span className="messageDetail-page-attachment">
              {attachment?.url}
            </span>
          </div>
        </div>
        <div className="w-350">
          <SubscriberInfor data={subscriberDetail} />
        </div>
      </div>
    </LayoutComponent>
  );
};

export default MessageDetail;
