import React, { useEffect, useState } from "react";
import { Button, Dropdown, Space, Menu, Row, Col, Divider, Select } from "antd";
import {
  EllipsisOutlined,
  SettingOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { AvatarComponent } from "../../../../components";
import {
  editSubscriberAsync,
  sendVCardAsync,
} from "../../../../redux/subscriptionReducer";
import { selectSettings } from "../../../../redux/settingsReducer";

import "./styles.less";

const SubscriberInfor = ({ data }) => {
  const dispatch = useDispatch();
  const { tags } = useSelector(selectSettings);
  const [taggedTagIds, setTagIds] = useState([]);
  const [isShowTag, setShowTag] = useState(false);
  console.log("###SubscriberInfor", data);

  const handleRemoveTag = (id) => {
    const newTaggedTagIds = [...taggedTagIds];
    const index = taggedTagIds.findIndex((item) => item.id === id);
    newTaggedTagIds.splice(index, 1);
    setTagIds(newTaggedTagIds);
  };

  const handleSubmitTag = () => {
    dispatch(
      editSubscriberAsync({
        id: data.id,
        dataUpdate: {
          tagIds: taggedTagIds.map(item => item.id),
        },
      })
    );
  };
  const handleShowTag = () => {
    setShowTag(true);
  };

  const handleCloseTag = () => {
    setTagIds(data.tags);
    setShowTag(false);
  };

  const onTagChange = (id) => {
    const newTagIds = [...taggedTagIds];
    const obj = tags.find((item) => item.id === id);
    newTagIds.push(obj);
    setTagIds(newTagIds);
  };

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

  useEffect(() => {
    if (data) {
      // setTagIds(tags?.map((item) => item.id) || []);
      setTagIds(data.tags);
    }
  }, [data]);

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
          {taggedTagIds.map((item) => (
            <p
              className="text-gray-tag bg-bg-gray-tag p-2 mx-2 items-center inline-flex"
              key={`tag-show-${item.id}`}
            >
              {item?.name}{" "}
              {isShowTag && (
                <CloseOutlined
                  className="ml-4 cursor-pointer"
                  onClick={() => handleRemoveTag(item.id)}
                />
              )}
            </p>
          ))}
        </div>
        <div>
          {!isShowTag ? (
            <SettingOutlined onClick={handleShowTag} className="text-3xl	" />
          ) : (
            <div className="mt-2 items-center inline-flex flex-col">
              <Select
                className="border-gray border-1 h-9"
                onChange={onTagChange}
                placeholder="Choose tag..."
                // value={taggedTagIds}
                value={null}
              >
                {tags &&
                  tags.map((option) => {
                    // const isExist = taggedTagIds?.length && taggedTagIds.findIndex(item => item.id === option.id);
                    // console.log('###taggedTagIds', option.id, isExist)
                    return (<Select.Option
                        key={`option-new-form-${option.id}`}
                        value={option.id}
                      >
                        {option.name}
                      </Select.Option>
                    );
                  })}
              </Select>
              <div className="mt-3">
                <Button
                  className="border-gray"
                  type="text"
                  onClick={handleCloseTag}
                >
                  Cancel
                </Button>
                <Button
                  className="text-primary border-gray ml-3"
                  type="text"
                  onClick={handleSubmitTag}
                >
                  Save
                </Button>
              </div>
            </div>
          )}
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
