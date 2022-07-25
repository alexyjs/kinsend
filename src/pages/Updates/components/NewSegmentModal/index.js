import { Button, Col, Form, Modal, Row, Input, Select, Divider } from "antd";
import React, { useEffect, useState } from "react";
import {
  PlusOutlined,
  MinusCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import {
  getSegmentAsync,
  addSegmentAsync,
} from "../../../../redux/updatesReducer";
import { DropdownReactSelect } from "../../../../components";

import { getFilterUpdatesFeature } from "../../../../utils";

import "./styles.less";

const NewSegmentModal = ({ visible, handleOk, handleCancel, dataSelect }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [filters, setFilters] = useState([]);

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
    console.log("###handleSelectFilter", item);
    let newFilters = [...filters];
    if (!newFilters[index]) {
      newFilters.push([item]);
    } else {
      newFilters[index].push(item);
    }
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
                {itemFilter.map((itemFilterSub, index) => (
                  <div
                    key={`filter-dropdown-itemFilterSub-${index}`}
                    className="segment-filter-item"
                  >
                    {itemFilterSub.label}
                  </div>
                ))}
                <DropdownReactSelect
                  defaultValue={null}
                  data={dataSelect}
                  onChange={(item) => handleSelectFilter(item, index)}
                />
                <Divider>
                  <span className="text-primary or-diveder">or</span>
                </Divider>
              </React.Fragment>
            ))}
            <DropdownReactSelect
              data={dataSelect}
              defaultValue={null}
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
