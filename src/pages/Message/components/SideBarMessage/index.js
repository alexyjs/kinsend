import React, { useEffect, useState } from "react";
import { Input, Divider, Avatar } from "antd";
import { formatDistance } from "date-fns";
import { UserOutlined } from "@ant-design/icons";

import { SearchIcon } from "../../../../assets/svg";

import "./styles.less";

const SideBarMessage = ({ data }) => {
  const [dataShow, setDataShow] = useState(data);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let result = data.filter((item) =>
      item.name.toLowerCase().includes(searchText)
    );
    setDataShow(result);
  }, [data, searchText]);

  return (
    <div className="SideBarMessage bg-white	p-3">
      <div className="flex justify-between items-center bg-gray-1">
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
      <Divider className="mt-3 mb-5" />
      <div className="SideBarMessage-list">
        {dataShow?.length
          ? dataShow.map((item) => (
              <div
                className="SideBarMessage-item"
                key={`sidebar-update-item-${item}`}
              >
                <div className="flex">
                  <Avatar
                    src={item.image || ""}
                    size={68}
                    icon={<UserOutlined />}
                  />
                  <div className="flex-1 ml-3">
                    <div className="flex">
                      <h3
                        className="text-ellipsis overflow-hidden truncate"
                        dangerouslySetInnerHTML={{ __html: item.name }}
                      ></h3>
                      <div className="flex-1 flex flex-row-reverse">
                        <h5 className="text-primary">
                          {formatDistance(new Date(item.lastTime), new Date(), {
                            addSuffix: true,
                          })}
                        </h5>
                      </div>
                    </div>
                    <div className="SideBarMessage-message">
                      <Input
                        disabled
                        className="SideBarMessage-message"
                        value={item.message}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default SideBarMessage;
