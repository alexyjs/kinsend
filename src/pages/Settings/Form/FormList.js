import React, { useEffect, useState } from "react";
import { Button, Table, Tag, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { useModal } from "../../../hook/useModal";
import AddNewForm from "./AddNewForm";
import { AddIcon } from "../../../assets/svg";
import {
  getFormsAsync,
  selectSettings,
  getCustomFieldsAsync,
  getTagsAsync,
} from "../../../redux/settingsReducer";
import { selectUsers } from "../../../redux/userReducer";
import { CopyComponent } from "../../../components";

const TagsList = () => {
  const { close, show, visible } = useModal();
  const { forms, tags, customFields } = useSelector(selectSettings);
  const { user } = useSelector(selectUsers);
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
      render: (text) => <span>{text}</span>,
    },
    {
      title: "CONTACTS",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "Actions",
      render: (item) => (
        <CopyComponent
          value={`${user?.cname?.title}.${user?.cname?.domain}/f/${item.id}`}
          title="copy link submission"
        />
      ),
    },
  ];

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
  }, [useDispatch]);

  return (
    <div>
      <div className="flex justify-between items-center my-10">
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
            className="inline-flex items-center px-10"
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
