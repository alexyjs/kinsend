import React, { useEffect, useState } from "react";
import { Button, Dropdown, Space, Menu, Row, Col, Divider } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import {
  editSubscriberAsync,
  sendVCardAsync,
} from "../../../../redux/subscriptionReducer";
import { AvatarComponent } from "../../../../components";

import "./styles.less";

const SubscriberInfor = ({ data }) => {
  const dispatch = useDispatch();
  console.log("###SubscriberInfor", data);

  const handleAddVip = () => {
    dispatch(
      editSubscriberAsync({
        id: data.id,
        dataUpdate: {
          isVip: true,
        },
      })
    );
  };

  const handleArchived = () => {
    dispatch(
      editSubscriberAsync({
        id: data.id,
        dataUpdate: {
          isConversationArchived: true,
        },
      })
    );
  };

  const handleHidden = () => {
    dispatch(
      editSubscriberAsync({
        id: data.id,
        dataUpdate: {
          isConversationHidden: true,
        },
      })
    );
  };

  const handleSendVCard = () => {
    dispatch(sendVCardAsync(data.id));
  };

  const menu = (item) => {
    return (
      <Menu onSelect={(e) => console.log(e)}>
        <Menu.Item className="capitalize" onClick={() => handleAddVip()}>
          <span className="inline-flex items-center">Add VIP</span>
        </Menu.Item>
        <Menu.Item className="capitalize" onClick={() => handleSendVCard()}>
          <span className="inline-flex items-center">Send vCard</span>
        </Menu.Item>
        <Menu.Item className="capitalize" onClick={() => handleHidden()}>
          <span className="inline-flex items-center">Hide </span>
        </Menu.Item>
        <Menu.Item className="capitalize" onClick={() => handleArchived()}>
          <span className="inline-flex items-center">Archive</span>
        </Menu.Item>
      </Menu>
    );
  };
  return (
    <div className="SubscriberInfor bg-white p-3 min-h-full	">
      <div className="flex justify-between items-center">
        <div></div>
        <Dropdown overlay={menu} className="upcomming-actions">
          <Button
            className="capitalize border-0 underline shadow-none"
            // type="primary"
          >
            <Space>
              <EllipsisOutlined className="text-2xl	text-primary" />
            </Space>
          </Button>
        </Dropdown>
      </div>
      <div className="flex justify-center flex-col items-center">
        <AvatarComponent imgSrc={data?.image} />
        <h2 className="text-2xl	font-bold mt-4">
          {data?.firstName} {data?.lastName}
        </h2>
        {/* </div>
      <div> */}
        <div className="inline-flex	">
          {["data?.tags", "1"].map((item) => (
            <p className="text-gray-tag bg-bg-gray-tag p-2 mx-2">Tags</p>
          ))}
        </div>
      </div>
      <div className="p-3">
        {/* infor */}
        <div>
          {data?.email && (
            <>
              <Divider />
              <div className="flex">
                <div className="w-1/3">Email</div>
                <div className="flex-1 text-primary">{data?.email}</div>
              </div>
            </>
          )}
          {data?.phoneNumber && (
            <>
              <Divider />
              <div className="flex">
                <div className="w-1/3">Mobile</div>
                <div className="flex-1 text-primary">
                  +{data?.phoneNumber.code} {data?.phoneNumber.phone}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriberInfor;
