import React, { useEffect } from "react";
import { Row, Col, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useNavigate } from "react-router-dom";

import { LayoutComponent } from "../../../components";
import { selectUsers } from "../../../redux/userReducer";
import SideBarMessage from "../components/SideBarMessage";
import SubscriberInfor from "../components/SubscriberInfor";
import MessageTimeline from "../components/MessageTimeline";
import {
  selectMessage,
  getMessageAsync,
  getMessageDetailAsync,
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
  const { message, messageDetail } = useSelector(selectMessage);
  const { subscriberDetail } = useSelector(selectSubscriptions);

  useEffect(() => {
    dispatch(getMessageAsync());
  }, [dispatch]);

  useEffect(() => {
    if (messageId) {
      dispatch(getMessageDetailAsync(messageId));
      dispatch(getSubscriberByMessageIdAsync(messageId));
    }
  }, [messageId]);

  // useEffect(() => {
  //   if (messageDetail && messageDetail[0]?.formSubmission?.id) {
  //     dispatch(getSubscriberByMessageIdAsync(messageDetail[0]?.formSubmission?.id));
  //   }
  // }, [messageDetail]);
  useEffect(() => {
    dispatch(getTagsAsync());
  }, []);

  console.log("###messageDetail", messageDetail);
  return (
    <LayoutComponent className="messageDetail-page">
      <div className="flex min-h-full">
        <div className="mb-4 w-350">
          <SideBarMessage data={message} />
        </div>
        <div className="mb-8 flex-1">
          <MessageTimeline data={messageDetail} />
        </div>
        <div className="mb-4 w-350">
          <SubscriberInfor data={subscriberDetail} />
        </div>
      </div>
    </LayoutComponent>
  );
};

export default MessageDetail;
