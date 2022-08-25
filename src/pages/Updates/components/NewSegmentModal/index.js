import {
  Button,
  Col,
  Form,
  Modal,
  Row,
  Input,
  Select,
  Divider,
  Menu,
  Dropdown,
} from "antd";
import React, { useEffect, useState, useMemo } from "react";
import {
  PlusOutlined,
  MinusCircleOutlined,
  DownOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import {
  selectUpdates,
  addSegmentAsync,
} from "../../../../redux/updatesReducer";
import { selectSettings } from "../../../../redux/settingsReducer";
import { DropdownReactSelect } from "../../../../components";

import {
  formatOptionsFormDatabase,
  getSegmentFilterPayload,
  formatOptions,
} from "../../../../utils";
import {
  SEGMENT_FILTER_TYPE,
  INDUSTRY_SEGMENT_FILTER_CONDITION,
  LOCATION_SEGMENT_FILTER_CONDITION,
  TAG_SEGMENT_FILTER_CONDITION,
  SEGMENT_SEGMENT_FILTER_CONDITION,
  AGE_SEGMENT_FILTER_CONDITION,
} from "../../../../utils/segment";
import { MONTH_TYPE, INDUSTRY } from "../../../../utils/constants";
import { LIVE_IN_TYPE } from "../../../../utils/update";

import "./styles.less";

const NewSegmentModal = ({ visible, handleOk, handleCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [filters, setFilters] = useState([]);
  const { newUpdate, segments } = useSelector(selectUpdates);
  const { tags, formSubmissions } = useSelector(selectSettings);
  const tagsOptions = useMemo(() => {
    return formatOptionsFormDatabase({
      data: tags,
      prefixLabel: "Is Tagged: ",
      typeOption: "isTagged",
    });
  }, [tags]);

  const tagsItemOptions = useMemo(() => {
    return formatOptionsFormDatabase({
      data: tags,
      typeOption: "isTagged",
    });
  }, [tags]);

  const segmentsOptions = useMemo(() => {
    return formatOptionsFormDatabase({
      data: segments,
      prefixLabel: "Include Segment ",
      typeOption: "isSegment",
    });
  }, [segments]);

  const segmentsItemOptions = useMemo(() => {
    return formatOptionsFormDatabase({
      data: segments,
      typeOption: "isSegment",
    });
  }, [segments]);

  const filterssOptions = useMemo(() => {
    return [
      {
        label: "Contacts",
        options: SEGMENT_FILTER_TYPE,
      },
      {
        label: "Segments",
        options: segmentsOptions,
      },
      {
        label: "Location",
        options: formatOptionsFormDatabase({
          data: formatOptions(LIVE_IN_TYPE),
          prefixLabel: "Lives In: ",
          typeOption: "isLocation",
          disablePrefixValue: true,
        }),
      },
      {
        label: "Tags",
        options: tagsOptions,
      },
    ];
  }, [tagsOptions, segmentsOptions]);

  const handleMenuAgeClick = (index, indexSub, key) => {
    let newFilters = [...filters];
    const newItem = { ...newFilters[index][indexSub] };
    newItem["condition"] = key;
    newFilters[index][indexSub] = newItem;
    setFilters(newFilters);
  };

  const handleChangeCustomFilter = (index, indexSub, key, value) => {
    let newFilters = [...filters];
    const newItem = { ...newFilters[index][indexSub] };
    newItem[key] = value;
    newFilters[index][indexSub] = newItem;
    setFilters(newFilters);
  };

  const getAgeLabel = (key) => {
    const itme = AGE_SEGMENT_FILTER_CONDITION.find((e) => e.key === key);
    return itme ? itme.label : "Is";
  };
  const menuAge = (index, indexSub) => (
    <Menu
      onClick={({ key }) => handleMenuAgeClick(index, indexSub, key)}
      items={AGE_SEGMENT_FILTER_CONDITION}
    />
  );

  const renderItem = (item, index, indexSub) => {
    if (item?.typeOption === "isTagged") {
      return (
        <div className="flex w-full justify-between items-center">
          <Select
            className="w-40 flex items-center"
            value={item.key}
            placeholder="Select ..."
            onChange={(valueSelected) =>
              handleChangeCustomFilter(index, indexSub, "key", valueSelected)
            }
          >
            {TAG_SEGMENT_FILTER_CONDITION.map((itemOption) => (
              <Select.Option value={itemOption.value}>
                {itemOption.label}
              </Select.Option>
            ))}
          </Select>
          <Divider type="vertical" className="h-full m-0" />
          <Select
            className="w-40 flex items-center"
            value={item.value}
            placeholder="Select Tag"
            onChange={(valueSelected) =>
              handleChangeCustomFilter(index, indexSub, "value", valueSelected)
            }
          >
            {tagsItemOptions.map((itemOption) => (
              <Select.Option value={itemOption.id}>
                {itemOption.label}
              </Select.Option>
            ))}
          </Select>
        </div>
      );
    }

    if (item?.typeOption === "isLocation") {
      return (
        <div className="flex w-full justify-between items-center">
          <Select
            className="w-40 flex items-center"
            value={item.key}
            placeholder="Select ..."
            onChange={(valueSelected) =>
              handleChangeCustomFilter(index, indexSub, "key", valueSelected)
            }
          >
            {LOCATION_SEGMENT_FILTER_CONDITION.map((itemOption) => (
              <Select.Option value={itemOption.value}>
                {itemOption.label}
              </Select.Option>
            ))}
          </Select>
          <Divider type="vertical" className="h-full m-0" />
          <Select
            className="w-40 flex items-center"
            value={item.value}
            placeholder="Select location"
            onChange={(valueSelected) =>
              handleChangeCustomFilter(index, indexSub, "value", valueSelected)
            }
          >
            {formatOptions(LIVE_IN_TYPE).map((itemOption) => (
              <Select.Option value={itemOption.value}>
                {itemOption.label}
              </Select.Option>
            ))}
          </Select>
        </div>
      );
    }

    if (item?.typeOption === "isSegment") {
      return (
        <div className="flex w-full justify-between items-center">
          <Select
            className="w-40 flex items-center"
            value={item.key}
            placeholder="Select ..."
            onChange={(valueSelected) =>
              handleChangeCustomFilter(index, indexSub, "key", valueSelected)
            }
          >
            {SEGMENT_SEGMENT_FILTER_CONDITION.map((itemOption) => (
              <Select.Option value={itemOption.value}>
                {itemOption.label}
              </Select.Option>
            ))}
          </Select>
          <Divider type="vertical" className="h-full m-0" />
          <Select
            className="w-40 flex items-center"
            value={item.value}
            placeholder="Select Segment"
            onChange={(valueSelected) =>
              handleChangeCustomFilter(index, indexSub, "value", valueSelected)
            }
          >
            {segmentsItemOptions.map((itemOption) => (
              <Select.Option value={itemOption.id}>
                {itemOption.label}
              </Select.Option>
            ))}
          </Select>
        </div>
      );
    }

    if (item.label.toLowerCase() === "birthday") {
      return (
        <div className="flex w-full justify-between items-center">
          <div className="mr-2 whitespace-nowrap	">{item.label} is</div>
          <Divider type="vertical" className="h-full m-0" />
          <Select
            className="w-40 flex items-center"
            value={item.month}
            placeholder="Select month"
            onChange={(valueSelected) =>
              handleChangeCustomFilter(index, indexSub, "month", valueSelected)
            }
          >
            {MONTH_TYPE.map((item) => (
              <Select.Option value={item.value}>{item.label}</Select.Option>
            ))}
          </Select>
          <Divider type="vertical" className="h-full m-0" />
          <Input
            max={31}
            min={1}
            type="number"
            className="h-10 border-none bg-inherit"
            placeholder="Enter a day"
            onChange={(event) =>
              handleChangeCustomFilter(
                index,
                indexSub,
                "day",
                event.target.value
              )
            }
            value={item.day}
          />
        </div>
      );
    }

    if (item.label.toLowerCase() === "industry") {
      return (
        <div className="flex w-full justify-between items-center">
          <div className="mr-2 whitespace-nowrap	">{item.label}</div>
          <Divider type="vertical" className="h-full m-0" />
          <Select
            className=" flex items-center"
            value={item.month}
            placeholder="Select ..."
            onChange={(valueSelected) =>
              handleChangeCustomFilter(
                index,
                indexSub,
                "condition",
                valueSelected
              )
            }
          >
            {INDUSTRY_SEGMENT_FILTER_CONDITION.map((itemOption) => (
              <Select.Option value={itemOption.value}>
                {itemOption.label}
              </Select.Option>
            ))}
          </Select>
          {item.condition &&
            item.condition !== "Exist" &&
            item.condition !== "Doesn't exist" && (
              <>
                <Divider type="vertical" className="h-full m-0" />
                <Input
                  type="text"
                  className="h-10 border-none bg-inherit"
                  placeholder="Enter text..."
                  onChange={(event) =>
                    handleChangeCustomFilter(
                      index,
                      indexSub,
                      "value",
                      event.target.value
                    )
                  }
                  value={item.day}
                />
              </>
            )}
        </div>
      );
    }

    if (item.label.toLowerCase().includes("age")) {
      return (
        <div className="flex w-full justify-between items-center">
          <div className="mr-2">{item.label}</div>
          <Divider type="vertical" className="h-full m-0" />
          <Dropdown overlay={menuAge(index, indexSub)} className="ml-2 mr-2">
            <a onClick={(e) => e.preventDefault()}>
              <div className="flex items-center">
                {getAgeLabel(item.condition)}
                <DownOutlined className="ml-2" />
              </div>
            </a>
          </Dropdown>
          <Divider type="vertical" className="h-full m-0" />
          <Input
            type="number"
            className="flex-1 h-10 border-none bg-inherit"
            placeholder="Enter an age"
            onChange={(event) =>
              handleChangeCustomFilter(
                index,
                indexSub,
                "value",
                event.target.value
              )
            }
            value={item.numbers}
          />
        </div>
      );
    }

    return <div>Contact: {item.label}</div>;
  };

  const onFinish = (values) => {
    if (!filters) {
      return false;
    }
    const params = {
      ...values,
      // filters,
      filters: filters.map((item) => {
        return item.map((itemSub) => getSegmentFilterPayload(itemSub));
      }),
    };
    dispatch(addSegmentAsync(params));
    handleCancel();
  };

  const handleSelectFilter = (item, index) => {
    let newFilters = [...filters];
    if (item.typeOption === "isLocation") {
      item = {
        ...item,
        key: LOCATION_SEGMENT_FILTER_CONDITION[0].value,
      };
    } else if (item.typeOption === "isTagged") {
      item = {
        ...item,
        key: TAG_SEGMENT_FILTER_CONDITION[0].value,
        value: item.name,
      };
    } else if (item.typeOption === "isSegment") {
      item = {
        ...item,
        key: SEGMENT_SEGMENT_FILTER_CONDITION[0].value,
        value: item.name,
      };
    } else {
      item = {
        ...item,
        key: item.label,
      };
    }
    if (!newFilters[index]) {
      newFilters.push([item]);
    } else {
      newFilters[index].push(item);
    }
    setFilters(newFilters);
  };

  const handleRemoveFilterItem = (index, indexSub) => {
    let newFilters = [...filters];
    delete newFilters[index][indexSub];
    setFilters(newFilters);
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    onReset();
  }, []);

  return (
    <Modal
      key="NewSegmentModal"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      destroyOnClose={true}
      centered
      className="NewSegmentModal"
    >
      <h3 className="font-bold text-center text-2xl mb-9">New Segment</h3>
      <p className="text-center pb-5">
        Combitine a set of filters to create a targeted segment
      </p>
      <Form
        onFinish={onFinish}
        form={form}
        initialValues={{}}
        name="control-hooks"
      >
        <Row gutter={16} className="w-full">
          <Col span={24}>
            <Form.Item
              name="name"
              label="Segment name"
              rules={[{ required: true }]}
            >
              <Input placeholder="My New Segment" />
            </Form.Item>
            {filters.map((itemFilter, index) => (
              <React.Fragment key={`filter-dropdown-segment-${index}`}>
                {itemFilter.map((itemFilterSub, indexSub) => (
                  <div
                    key={`filter-dropdown-itemFilterSub-${indexSub}`}
                    className="segment-filter-item"
                  >
                    {renderItem(itemFilterSub, index, indexSub)}

                    <CloseOutlined
                      className="dynamic-delete-button text-primary"
                      onClick={() => handleRemoveFilterItem(index, indexSub)}
                    />
                  </div>
                ))}
                <DropdownReactSelect
                  value={null}
                  data={filterssOptions}
                  onChange={(item) => handleSelectFilter(item, index)}
                />
                <Divider>
                  <span className="text-primary or-diveder">or</span>
                </Divider>
              </React.Fragment>
            ))}
            <DropdownReactSelect
              value={null}
              data={filterssOptions}
              onChange={(item) => handleSelectFilter(item)}
            />
          </Col>
        </Row>
        <Row justify="space-around" className="mt-12">
          <Col>
            <Form.Item noStyle>
              <Button
                className="md:min-w-200"
                type="primary"
                size="large"
                onClick={handleCancel}
                block
              >
                Cancel
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item noStyle shouldUpdate>
              <Button
                className="md:min-w-200"
                type="primary"
                size="large"
                block
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewSegmentModal;
