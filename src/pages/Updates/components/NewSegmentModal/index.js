import { Button, Col, Form, Modal, Row, Input, Select, Divider } from "antd";
import React, { useEffect, useState, useMemo } from "react";
import {
  PlusOutlined,
  MinusCircleOutlined,
  DownOutlined,
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
  getFilterUpdatesFeature,
} from "../../../../utils";
import { SEGMENT_FILTER_TYPE } from "../../../../utils/segment";
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

  const segmentsOptions = useMemo(() => {
    return formatOptionsFormDatabase({
      data: segments,
      prefixLabel: "Include Segment ",
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
          data: LIVE_IN_TYPE,
          prefixLabel: "Lives In: ",
          typeOption: "isLocation",
        }),
      },
      {
        label: "Tags",
        options: tagsOptions,
      },
    ];
  }, [tagsOptions, segmentsOptions]);

  const renderItem = (item, index, indexSub) => {
    if (item.typeOption === "isTagged") {
      console.log("###renderItem tagged: ", item, tagsOptions);
      return (
        <div className="flex-auto">
          <DropdownReactSelect
            defaultValue="Is Tagged"
            data={[
              { label: "Is Tagged", value: "Is Tagged" },
              { label: "Isn't Tagged", value: "Isn't Tagged" },
            ]}
            onChange={(item) => handleChangeTagCondition(item, index, indexSub)}
          />
          <DropdownReactSelect
            defaultValue={item.value}
            data={tagsOptions}
            onChange={(item) => handleChangeTag(item, index, indexSub)}
          />
        </div>
      );
    }

    if (item.typeOption === "isLocation") {
      return <div>isLocation: {item.label}</div>;
    }

    if (item.typeOption === "isSegment") {
      return <div>isSegment: {item.label}</div>;
    }

    return <div>Contact: {item.label}</div>;
  };

  const handleChangeTagCondition = (item, index, indexSub) => {
    let newFilters = [...filters];
    newFilters[index][indexSub] = {
      ...newFilters[index][indexSub],
      conditionFilter: item.value,
    };
    setFilters(newFilters);
  }

  const handleChangeTag = (item, index, indexSub) => {
    let newFilters = [...filters];
    newFilters[index][indexSub] = {
      ...item,
      conditionFilter: newFilters[index][indexSub].conditionFilter,
    };
    setFilters(newFilters);
  }

  const onFinish = (values) => {
    if (!filters) {
      return false;
    }
    const params = {
      ...values,
      filters: filters.map((item) => {
        return item.map((itemSub) => getFilterUpdatesFeature(itemSub));
      }),
    };
    dispatch(addSegmentAsync(params));
    handleCancel();
  };

  const handleSelectFilter = (item, index) => {
    let newFilters = [...filters];
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
  console.log("###filters", tagsOptions, segmentsOptions, filters);
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

                    <MinusCircleOutlined
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
