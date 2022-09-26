import React, { useEffect, useState } from "react";
import { Input, Divider, Avatar } from "antd";
import { formatDistanceStrict } from "date-fns";
import { UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

import { SearchIcon } from "../../../../assets/svg";

import "./styles.less";

const SideBarMessage = ({ data }) => {
  const [dataShow, setDataShow] = useState(data);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let result = data.filter((item) =>
      item?.message?.content?.toLowerCase()?.includes(searchText)
    );
    setDataShow(result);
  }, [data, searchText]);
  console.log("###dataShow", data, dataShow);
  return (
    <div className="SideBarMessage bg-white	p-3 min-h-full	">
      {/* <div className="flex justify-between items-center bg-gray-1">
        <div className=" h-14 flex flex-auto justify-between items-center pr-2 bg-gray-1 border-2	border-gray-1 border-1 border-solid	rounded-lg	">
          <Input
            className="hover:shadow-none focus:shadow-none border-none"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value.toLowerCase())}
          />
          <SearchIcon className="cursor-pointer" />
        </div>
      </div>
      <Divider className="mt-3 mb-5" /> */}
      <div className="SideBarMessage-list">
        {dataShow?.length
          ? dataShow.map((item) => {
              return (
                <NavLink
                  to={`/message/${item.id}`}
                  className="SideBarMessage-item"
                  key={`SideBarMessage-${item.id}`}
                >
                  <div className="flex">
                    <Avatar
                      src={item?.image || null}
                      size={68}
                      icon={<UserOutlined />}
                    />
                    <div className="flex-1 ml-3">
                      <div className="flex justify-between items-center">
                        <h3
                          className="text-ellipsis overflow-hidden truncate"
                          // dangerouslySetInnerHTML={{ __html: item.firstName }}
                        >
                          {item?.firstName} {item?.lastName}
                        </h3>
                        <div className="flex-row-reverse">
                          <h5 className="text-primary text-xs	inline-flex">
                            {formatDistanceStrict(
                              new Date(item?.message?.createdAt),
                              new Date(),
                              {
                                addSuffix: true,
                              }
                            )}
                          </h5>
                        </div>
                      </div>
                      <div className="SideBarMessage-message">
                        <Input
                          disabled
                          className="SideBarMessage-message text-ellipsis overflow-hidden truncate"
                          value={
                            (item?.message?.isSubscriberMessage ? "→ " : "← ") +
                            item?.message?.content
                          }
                        />
                      </div>
                    </div>
                  </div>
                </NavLink>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default SideBarMessage;
