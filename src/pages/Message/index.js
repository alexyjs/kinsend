import React, { useEffect } from "react";
import { Divider, Card, Row, Col, Button, Checkbox } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { SelectNumberModal, LayoutComponent } from "../../components";
import { useModal } from "../../hook/useModal";
import { selectUsers } from "../../redux/userReducer";
import { AutomationRobotIcon, NotificationSVG } from "../../assets/svg";
import SideBarMessage from "./components/SideBarMessage";
import {
  selectMessage,
  getMessageAsync,
  getMessageStatisticsAsync,
} from "../../redux/messageReducer";
import { getFormsAsync, selectSettings } from "../../redux/settingsReducer";
import { getVCardAsync, selectVCard } from "../../redux/vcardReducer";
import WorkFlow from "./WorkFlow";
import "./styles.less";

const Message = () => {
  const { user } = useSelector(selectUsers);
  const {
    close: closePhoneNumber,
    show: showPhoneNumber,
    visible: phoneNumberModalVisible,
  } = useModal();
  const dispatch = useDispatch();
  const { message, messageStatistics } = useSelector(selectMessage);
  const { vcardData } = useSelector(selectVCard);
  const { forms } = useSelector(selectSettings);

  const handleOkPhoneModal = () => {};

  const handleCancelPhoneModal = () => {
    closePhoneNumber();
  };

  const getSessionOfDay = () => {
    const time = new Date();
    const hours = time.getHours();
    // const minutes = time.getMinutes();

    if (hours >= 6 && hours < 12) {
      return "Good Morning";
    } else if (hours >= 12 && hours < 17) {
      return "Good Afternoon";
    } else if (hours >= 17 && hours < 21) {
      return "Good Evening";
    }
    return "Hello";
  };

  useEffect(() => {
    if (user && !user?.phoneSystem?.length) {
      showPhoneNumber();
    }
  }, user);

  useEffect(() => {
    dispatch(getMessageAsync());
    dispatch(getMessageStatisticsAsync());

    //
    dispatch(getFormsAsync());
    dispatch(getVCardAsync());
  }, [dispatch]);

  return (
    <LayoutComponent className="Message-page" title="Conversations">
      <Row gutter={16}>
        <Col span={8} lg={8} xs={24} className="md:w-full">
          <SideBarMessage
            data={message}
            className="Message-page-SideBarMessage"
          />
          <div className="md:hidden block ">
            <>
              <Divider className="mt-3 mb-5" />
              <WorkFlow vcardData={vcardData} forms={forms} />
            </>
          </div>
        </Col>
        <Col span={16} className="md:block hidden">
          <div className="flex justify-between items-center">
            <h1 className="mt-5">
              {getSessionOfDay()}, {user && user.firstName}
            </h1>
          </div>
          {forms && (!vcardData?.id || !forms?.length) && (
            <>
              <Divider className="mt-3 mb-5" />
              <WorkFlow vcardData={vcardData} forms={forms} />
            </>
          )}
          <Divider className="mt-3 mb-5" />
          <Card bordered={true} className="rounded-3xl mb-5">
            <Row gutter={16}>
              <Col span={8} className="mb-4">
                <div className="flex flex-col justify-between items-center">
                  <div>
                    <h1 className="text-primary">
                      {messageStatistics?.totalFormSubmission || 0}
                    </h1>
                  </div>
                  <div>
                    <span>CONTACTS</span>
                  </div>
                </div>
              </Col>
              <Col span={8} className="mb-4">
                <div className="flex flex-col justify-between items-center">
                  <div>
                    <h1>{messageStatistics?.totalUpdate || 0}</h1>
                  </div>
                  <div>
                    <span>UPDATES SENT</span>
                  </div>
                </div>
              </Col>
              <Col span={8} className="mb-4">
                <div className="flex flex-col justify-between items-center ml-10">
                  <div>
                    <h1>{messageStatistics?.clickedPercent || 0}%</h1>
                  </div>
                  <div>
                    <span>CLICK THROUGH</span>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
          <Row gutter={16}>
            <Col span={12} className="mb-4">
              <Card bordered={true} className="rounded-3xl h-60 pt-3 pl-2 pr-2">
                <NotificationSVG />
                <h2 className="font-bold text-xl mt-5">Send an Update</h2>
                <span>
                  Broadcast a message to all of your subscribers or select a
                  filtered segment
                </span>
                <div className="">
                  <NavLink to="/updates/scheduled/new">
                    <Button type="primary" size="small" className="mt-3">
                      Send
                    </Button>
                  </NavLink>
                </div>
              </Card>
            </Col>
            <Col span={12} className="mb-4">
              <Card bordered={true} className="rounded-3xl h-60 pl-2 pr-2">
                <AutomationRobotIcon />
                <h2 className="font-bold text-xl">Create an Automation</h2>
                <span>
                  Create powerful drip campaigns & auto-responses based on a
                  variety of triggers
                </span>
                <div className="">
                  <NavLink to="/automation/new">
                    <Button type="primary" size="small" className="mt-3">
                      Set Up
                    </Button>
                  </NavLink>
                </div>
              </Card>
            </Col>
          </Row>
          {vcardData?.id && forms?.length && (
            <WorkFlow vcardData={vcardData} forms={forms} />
          )}
        </Col>
      </Row>
      <SelectNumberModal
        handleCancel={handleCancelPhoneModal}
        handleClose={closePhoneNumber}
        handleOk={handleOkPhoneModal}
        visible={phoneNumberModalVisible}
      />
    </LayoutComponent>
  );
};

export default Message;
