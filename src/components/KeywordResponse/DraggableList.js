import { useState } from "react";
import { Button, Table } from "antd";
import { sortableContainer, sortableElement, sortableHandle } from "react-sortable-hoc";
import { MenuOutlined } from "@ant-design/icons";

import "./style.less";
import { useEffect } from "react";

const DragHandle = sortableHandle(({ active }) => (
  <MenuOutlined style={{ cursor: "grab", color: active ? "blue" : "#999" }} />
));

const SortableItem = sortableElement((props) => <tr className="sortable-item" style={{ zIndex: 1 }} {...props} />);
const SortableContainer = sortableContainer((props) => <tbody {...props} />);

function DraggableList({ list, onSorted }) {
  const [dataSource, setDataSource] = useState(list);

  const getColumns = () => {
    return [
      {
        dataIndex: "",
        width: 30,
        className: "col-drag-handler",
        render: (d, dd, i) => (
          <>
            <DragHandle />
          </>
        )
      },
      {
        dataIndex: "pattern",
        className: "col-pattern"
      },
      {
        dataIndex: ["response", "message"],
        className: "col-message"
      },
      {
        dataIndex: "",
        width: 30,
        className: "col-action",
        render: (d, dd, i) => (
          <div className="flex space-x-2">
            <Button
              type="primary"
              size="small"
              className="inline-flex items-center"
              onClick={() => console.log}
            >
              Edit
            </Button>
            <Button
              type="primary"
              size="small"
              className="inline-flex items-center"
              onClick={() => console.log}
            >
              Delete
            </Button>
          </div>
        )
      },
    ];
  };

  const merge = (a, b, i = 0) => {
    let aa = [...a];
    return [...a.slice(0, i), ...b, ...aa.slice(i, aa.length)];
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    let tempDataSource = dataSource;

    if (oldIndex !== newIndex) {
      let movingItem = tempDataSource[oldIndex];
      tempDataSource.splice(oldIndex, 1);
      tempDataSource = merge(tempDataSource, [movingItem], newIndex);
      setDataSource(tempDataSource);
      onSorted({...movingItem, index: newIndex});
    }
  };

  const DraggableContainer = (props) => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(
      (x) => x.index === restProps["data-row-key"]
    );
    return (
      <SortableItem
        index={index}
        {...restProps}
      />
    );
  };

  useEffect(() => {
    setDataSource(list);
  }, [list]);

  return (
    <Table
      pagination={false}
      dataSource={dataSource}
      columns={getColumns()}
      rowKey="index"
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow
        }
      }}
      showHeader={false}
      className="mt-4 border-t-1 border-gray-1"
    />
  );
}

export default DraggableList;
