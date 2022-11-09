import React, { useEffect, useState, useRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  UploadFileModal,
  EmojiPicker,
  LayoutComponent,
  EditableText,
} from "../../../components";
import { AttachmentIcon, EmojiIcon } from "../../../assets/svg";
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
  const dispatch = useDispatch();
  const { message, messageDetail, smsMessage } = useSelector(selectMessage);
  const { subscriberDetail } = useSelector(selectSubscriptions);
  const [showEmoji, setShowEmoji] = useState(() => false);
  const childRef = useRef();
  const [attachment, setAttachmentUrl] = useState({});
  const [defaultValueMessage, setDefaultValueMessage] = useState("");
  const [directMessage, setDirectMessage] = useState("");
  const navigate = useNavigate();

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

  const handleBackToList = () => {
    navigate("/message");
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

    const timer = setInterval(() => {
      dispatch(getSubscriberByMessageIdAsync(messageId));
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [messageId, dispatch]);

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
  }, [smsMessage, dispatch]);

  // console.log("###messageDetail", messageDetail);
  return (
    <LayoutComponent
      className="messageDetail-page"
      title={`${subscriberDetail?.firstName || ""} ${
        subscriberDetail?.lastName || ""
      }`}
    >
      <div className="flex min-h-full">
        <div className="w-350 md:block hidden">
          <SideBarMessage data={message} />
        </div>
        <div className="flex-1 flex messageDetail-body flex-col">
          <div
            className="md:hidden flex items-center back-button px-4 py-2"
            onClick={handleBackToList}
          >
            <ArrowLeftOutlined />
            <span className="ml-3 py-3 font-bold	">View Message List</span>
          </div>
          <MessageTimeline data={messageDetail} className="flex-1" />
          <div className="custom-textarea-wrap messageDetail-page-send-message border-left">
            <EditableText
              defaultValue={defaultValueMessage}
              onChange={hanldeChangeMessage}
              ref={childRef}
              className="messageDetail-EditableText"
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
        <div className="w-350 md:block hidden">
          <SubscriberInfor data={subscriberDetail} />
        </div>
      </div>
    </LayoutComponent>
  );
};

export default memo(MessageDetail);
