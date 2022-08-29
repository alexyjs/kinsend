import React, { useEffect, useState } from "react";
import { format, isBefore, isAfter } from "date-fns";
import { Input, Divider, Dropdown, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";

import { EditIcon, SearchIcon } from "../../../../assets/svg";

import "./styles.less";

const SideBarUpdate = ({ data }) => {
  const [dataShow, setDataShow] = useState(data);
  const [filter, setFilter] = useState("All Updates");
  const [searchText, setSearchText] = useState("");
  const handleClick = ({ key }) => {
    setFilter(key);
  };

  const menu = (
    <Menu
      onClick={handleClick}
      items={[
        {
          label: "All Updates",
          key: "All Updates",
        },
        {
          label: "Sent Updates",
          key: "Sent Updates",
        },
        {
          label: "Scheduled Updates",
          key: "Scheduled Update",
        },
      ]}
    />
  );

  useEffect(() => {
    let result = data.filter((item) => item.message.includes(searchText));
    if (filter === "Sent Updates") {
      result = result.filter((item) => {
        return (
          item.triggerType === "Once" &&
          isBefore(new Date(item.datetime), new Date())
        );
      });
    } else if (filter === "Scheduled Update") {
      result = result.filter((item) => {
        return (
          item.triggerType !== "Once" ||
          (item.triggerType === "Once" &&
            isAfter(new Date(item.datetime), new Date()))
        );
      });
    }
    setDataShow(result);
  }, [data, searchText, filter]);

  return (
    <div className="SideBarUpdate">
      <div className="flex justify-between items-center">
        <div className="SideBarUpdate-input flex flex-auto justify-between items-center pr-2">
          <Input
            className="SideBarUpdate-input"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <SearchIcon className="cursor-pointer" />
        </div>
        <NavLink
          to="/updates/scheduled/new"
          className="ml-3 SideBarUpdate-edit-btn"
        >
          <EditIcon />
        </NavLink>
      </div>
      <div className="flex justify-between items-center mt-5">
        <span>{dataShow?.length} UPDATES</span>
        <Dropdown overlay={menu}>
          <a onClick={(e) => e.preventDefault()}>
            <div className="text-primary flex items-center">
              View {filter}
              <DownOutlined className="ml-2" />
            </div>
          </a>
        </Dropdown>
      </div>
      <Divider className="mt-3 mb-5" />
      <div className="SideBarUpdate-list">
        {dataShow?.length
          ? dataShow.map((item) => (
              <NavLink
                to={`/updates/detail/${item.id}`}
                className="SideBarUpdate-item"
                key={`sidebar-update-item-${item}`}
              >
                <h3
                  className="text-ellipsis overflow-hidden truncate"
                  dangerouslySetInnerHTML={{
                    __html: item.message
                      .replace(/<fname>/gi, `&lt;fname&gt;`)
                      .replace(/<lname>/gi, `&lt;lname&gt;`)
                      .replace(/<name>/gi, `&lt;name&gt;`)
                      .replace(/<mobile>/gi, `&lt;mobile&gt;`)
                      .replace(/<form>/gi, `&lt;form&gt;`),
                  }}
                >
                  {/* {truncate(item.message, {
                    length: 30,
                    omission: "...",
                  })} */}
                </h3>
                <span>
                  Sent {format(new Date(item.datetime), "MM/dd/yyyy hh:mm aa")}.
                  to {item.triggerType}
                </span>
              </NavLink>
            ))
          : null}
      </div>
    </div>
  );
};

export default SideBarUpdate;
