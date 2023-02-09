import React, { useEffect, useState } from "react";
import { Input, Avatar } from "antd";
import cl from "classnames";
import { formatDistanceStrict } from "date-fns";
import { UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

// import { SearchIcon } from "../../../../assets/svg";

import "./styles.less";

const SideBarMessage = ({ data, className }) => {
  const [dataShow, setDataShow] = useState(data);
  // const [searchText, setSearchText] = useState("");

  // useEffect(() => {
  //   let result = data.filter((item) =>
  //     item?.message?.content?.toLowerCase()?.includes(searchText)
  //   );
  //   setDataShow(result);
  // }, [data, searchText]);
  useEffect(() => {
    setDataShow(data);
  }, [data]);

  return (
    <div
      className={cl("SideBarMessage bg-white	p-3", className, {
        "items-center flex": !dataShow?.length,
      })}
    >
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
      {dataShow?.length ? (
        <div className="SideBarMessage-list">
          {dataShow.map((item) => {
            return (
              <NavLink
                to={`/message/${item.id}`}
                className="SideBarMessage-item"
                key={`SideBarMessage-${item.id}`}
              >
                <div className="flex">
                  <Avatar
                    src={item?.image || null}
                    size={50}
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
                      {item?.message?.content && (
                        <Input
                          disabled
                          className="SideBarMessage-message text-ellipsis overflow-hidden truncate"
                          value={
                            (item?.message?.isSubscriberMessage ? "→ " : "← ") +
                            item?.message?.content
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
      ) : (
        <div className="text-center">
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--gray-text)" }}
          >
            You don't have any contacts or conversations yet
          </h2>
          <p className="text-base mt-3">
            Create a{" "}
            <NavLink to="/settings/forms/new" className="text-primary">
              subscribers intake form
            </NavLink>{" "}
            for people to fill out and start a conversation with you
          </p>
        </div>
      )}
    </div>
  );
};

export default SideBarMessage;
