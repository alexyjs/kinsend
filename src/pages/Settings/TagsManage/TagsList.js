import React, { useEffect, useState } from "react";
import { Button, Table, Tag, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { useModal } from "../../../hook/useModal";
import AddNewTag from "./AddNewTag";
import { AddIcon } from "../../../assets/svg";
import { getTagsAsync, selectSettings } from "../../../redux/settingsReducer";

const columns = [
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
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
    dataIndex: "contacts",
    key: "contacts",
  },
  {
    title: "UNKNOWN",
    dataIndex: "unknown",
    key: "unknown",
  },
];

const TagsList = () => {
  const { close, show, visible } = useModal();
  const { tags, addedNewTag } = useSelector(selectSettings);
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleSelectKey = (raw, raw1) => {
    setSelectedRowKeys(raw);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectKey,
  };

  useEffect(() => {
    dispatch(getTagsAsync());
  }, [useDispatch]);

  useEffect(() => {
    if (addedNewTag) {
      close();
    }
  }, [addedNewTag, close]);

  return (
    <div>
      <div className="flex justify-between items-center my-10">
        <span>{selectedRowKeys.length} selected</span>
        <Button
          type="primary"
          size="large"
          className="inline-flex items-center px-10"
          onClick={show}
        >
          <AddIcon className="mr-2" /> New
        </Button>
      </div>
      <Table
        className="mt-16 rounded-3xl"
        columns={columns}
        dataSource={tags}
        rowSelection={rowSelection}
        locale={{
          emptyText: (
            <span className="font-bold my-10 block">
              You don’t have any tags
            </span>
          ),
        }}
      />
      <AddNewTag handleCancel={close} handleOk={close} visible={visible} />
    </div>
  );
};

export default TagsList;
