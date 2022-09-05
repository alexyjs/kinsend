import React, { useEffect, useMemo } from "react";
import _ from "lodash";
import { Switch, Button, Dropdown, Space, Menu, Row, Col } from "antd";
import { format, formatDistanceToNow } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { EllipsisOutlined } from "@ant-design/icons";
import SideBarUpdate from "./components/SideBarUpdate";

import {
  selectUpdates,
  getUpdatesAsync,
  deleteUpdatesAsync,
  resetUpdatesAsync,
} from "../../redux/updatesReducer";
import LayoutComponent from "../../components/Layout";
import { UpdateDashboardEmptyIcon } from "../../assets/svg";

import "./styles.less";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Profile = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { updates, updatesDetail, isDeleted } = useSelector(selectUpdates);
  const upcomingUpdate = useMemo(() => {
    if (updates && updates[0] && updates[0].progress === "Scheduled") {
      return updates[0];
    }
    return null;
  }, [updates]);

  const handleDeleteUpdate = (id) => {
    dispatch(deleteUpdatesAsync(id));
  };

  useEffect(() => {
    if (isDeleted) {
      dispatch(resetUpdatesAsync());
      navigate("/updates");
    }
  }, [navigate, isDeleted]);

  const menu = (item) => {
    return (
      <Menu onSelect={(e) => console.log(e)}>
        <Menu.Item className="capitalize">
          <NavLink
            to={`/updates/scheduled/${item.id}`}
            className="inline-flex items-center"
          >
            Edit/View
          </NavLink>
        </Menu.Item>
        <Menu.Item
          className="capitalize"
          onClick={() => handleDeleteUpdate(item.id)}
        >
          <span className="inline-flex items-center">Delete</span>
        </Menu.Item>
      </Menu>
    );
  };

  useEffect(() => {
    dispatch(getUpdatesAsync());
  }, []);

  return (
    <LayoutComponent className="updates-detail-page">
      <div className="flex-auto flex flex-col	">
        {upcomingUpdate && (
          <Row className="flex-end justify-end">
            <Col className="flex flex-end">
              <div className="m-3">
                <NavLink to="/updates/scheduled/new">
                  <Button type="primary" size="large" className="w-48	">
                    New Update
                  </Button>
                </NavLink>
              </div>
            </Col>
          </Row>
        )}
        <Row>
          <div className="flex items-center flex-col updates-page-content py-52 mx-auto">
            {!upcomingUpdate ? (
              <>
                <UpdateDashboardEmptyIcon />
                <p className="py-3"> You have no upcoming updates</p>
                <NavLink to="/updates/scheduled/new">
                  <Button type="primary">New Update</Button>
                </NavLink>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <h2 className="text-4xl font-bold	">
                  Your next Update goes out in
                  <span className="text-gray-500	">&nbsp;{formatDistanceToNow(new Date(upcomingUpdate.datetime))}</span>
                </h2>
                <div className="upcomming-block p-4 pr-8 w-110	">
                  <h3
                    className="text-ellipsis overflow-hidden truncate text-xl	"
                    dangerouslySetInnerHTML={{
                      __html: upcomingUpdate?.message
                        .replace(/<fname>/gi, `&lt;fname&gt;`)
                        .replace(/<lname>/gi, `&lt;lname&gt;`)
                        .replace(/<name>/gi, `&lt;name&gt;`)
                        .replace(/<mobile>/gi, `&lt;mobile&gt;`)
                        .replace(/<form>/gi, `&lt;form&gt;`),
                    }}
                  ></h3>
                  <span className="text-xs	">
                    {upcomingUpdate.progress === "Scheduled"
                      ? "Schedule"
                      : "Sent"}{" "}
                    {format(
                      new Date(upcomingUpdate?.datetime),
                      "MM/dd/yyyy hh:mm aa"
                    )}
                    . to {upcomingUpdate?.triggerType}
                  </span>
                  <Dropdown
                    overlay={menu(upcomingUpdate)}
                    className="upcomming-actions"
                  >
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
              </div>
            )}
          </div>
        </Row>
      </div>
      <SideBarUpdate data={updates} />
    </LayoutComponent>
  );
};

export default Profile;
