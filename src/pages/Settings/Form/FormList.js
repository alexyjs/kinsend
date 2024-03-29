import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { formatDistanceStrict } from "date-fns";

import { useModal } from "../../../hook/useModal";
import { AddIcon } from "../../../assets/svg";
import {
  getFormsAsync,
  selectSettings,
  getCustomFieldsAsync,
  getTagsAsync,
  updateStatusFormAsync,
} from "../../../redux/settingsReducer";
import { CopyComponent } from "../../../components";
import { FORM_SETTINGS_STATUS } from "../../../utils/constants";

import "./FormList.less";

const TagsList = () => {
  const { show } = useModal();
  const { forms } = useSelector(selectSettings);
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    {
      title: "NAME",
      dataIndex: "title",
      key: "title",
      render: (text) => <span className="font-bold">{text}</span>,
    },
    {
      title: "CREATED",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <span>
          {formatDistanceStrict(new Date(text), new Date(), {
            addSuffix: true,
          })}
        </span>
      ),
    },
    {
      title: "CONTACTS",
      render: (item) => <span>{item?.totalSubscriber || 0}</span>,
    },
    {
      title: "Actions",
      render: (item) => (
        <span className="flex items-center">
          <CopyComponent
            value={`${item.url}.${window.location.host.replace("www.", "")}/f/${
              item.id
            }`}
            title="copy link submission"
          />
          <NavLink to={`/settings/forms/edit/${item.id}`}>
            <Button
              type="primary"
              size="small"
              className="inline-flex items-center ml-4 border-0 bg-none"
              // onClick={show}
            >
              {" "}
              Edit
            </Button>
          </NavLink>
          <Button
            type="primary"
            size="small"
            className="inline-flex items-center ml-4 border-0 bg-none"
            onClick={() => handleUpdateStatusForm(item)}
          >
            {" "}
            {item.status === undefined ||
            item.status === null ||
            item.status === FORM_SETTINGS_STATUS.ENABLE
              ? "Disable"
              : "Enable"}
          </Button>
        </span>
      ),
    },
  ];

  const handleUpdateStatusForm = (itemSelected) => {
    dispatch(
      updateStatusFormAsync({
        id: itemSelected.id,
        status:
          itemSelected.status === undefined ||
          itemSelected.status === null ||
          itemSelected.status === FORM_SETTINGS_STATUS.ENABLE
            ? FORM_SETTINGS_STATUS.DISABLE
            : FORM_SETTINGS_STATUS.ENABLE,
      })
    );
  };

  const handleSelectKey = (raw, raw1) => {
    setSelectedRowKeys(raw);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectKey,
  };

  useEffect(() => {
    dispatch(getFormsAsync());
    dispatch(getCustomFieldsAsync());
    dispatch(getTagsAsync());
  }, [dispatch]);

  return (
    <div>
      <div className="flex md:flex-row flex-col justify-between items-center my-10">
        <span className="max-w-xl">
          Create public facing contact forms for new contacts to fill out their
          personal details. Share your form on social channels using each form's
          unique URL or specify a form in your widget auto responses.
          {/* TODO: show later */}
          {/* Learn more about Forms */}
        </span>
        <NavLink to="/settings/forms/new">
          <Button
            type="primary"
            size="large"
            className="inline-flex items-center px-10 md:mt-0 mt-3"
            onClick={show}
          >
            <AddIcon className="mr-2" /> New
          </Button>
        </NavLink>
      </div>
      <div>
        <Table
          className="mt-16 rounded-3xl"
          columns={columns}
          dataSource={forms}
          rowSelection={rowSelection}
          locale={{
            emptyText: (
              <span className="font-bold my-10 block">
                You don’t have any form
              </span>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default TagsList;
