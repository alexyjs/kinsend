import { Row, Col, Form, Select, Modal, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  FirstMessageIcon,
  ContactCreatedIcon,
  ContactTagged,
} from "../../../../assets/svg";
import { selectSettings } from "../../../../redux/settingsReducer";

import Action from "../Action";
import "./styles.less";

const StopTriggerModal = ({ visible, handleOk, handleCancel, data }) => {
  const [trigger, setTrigger] = useState("");
  const [taggedTagIds, setTagged] = useState([]);
  const { tags } = useSelector(selectSettings);
  const handleSelectTrigger = (value) => {
    setTrigger(value);
    if (value !== "CONTACT_TAGGED") {
      handleOk({
        type: value,
      });
    }
  };

  const handleResetTrigger = () => {
    setTrigger();
  };

  const onTagChange = (value) => {
    setTagged(value);
  };

  const handleSelectTagged = (value) => {
    handleOk({
      type: trigger,
      taggedTagIds: taggedTagIds,
    });
  };

  useEffect(() => {
    setTrigger(data?.type || "");
    setTagged(data?.taggedTagIds || []);
  }, [data]);

  return (
    <>
      <Modal
        key="StopTriggerModal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closable={true}
        destroyOnClose={true}
        centered
        className="automation-trigger-modal"
      >
        <h3 className="font-bold text-center text-2xl mb-9">Stop Trigger</h3>
        <p className="text-center">
          Triggers are events that start your automation{" "}
        </p>
        {trigger && trigger === "CONTACT_TAGGED" ? (
          <div className="action-detail-wrap">
            <div className="flex justify-between items-center action-detail-input">
              <span>Contact Tagged</span>
              <button
                className="text-primary px-3 py-1"
                onClick={handleResetTrigger}
              >
                Change
              </button>
            </div>
            <Select
              allowClear
              onChange={onTagChange}
              placeholder="Choose tag..."
              valu={taggedTagIds}
            >
              {tags &&
                tags.map((option) => (
                  <Select.Option
                    key={`option-new-form-${option.id}`}
                    value={option.id}
                  >
                    {option.name}
                  </Select.Option>
                ))}
            </Select>
            <div className="flex justify-center mt-4">
              <Button
                className="px-5"
                size="large"
                type="primary"
                onClick={handleSelectTagged}
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          <Row justify="space-around" className="mt-12">
            <Col>
              <Action
                Icon={FirstMessageIcon}
                label="FIRST MESSAGE"
                description="This trigger fires after a subscriber sends you a message for the first time."
                value="FIRST_MESSAGE"
                onClick={handleSelectTrigger}
              />
            </Col>
            <Col>
              <Action
                Icon={ContactCreatedIcon}
                label="CONTACT CREATED"
                description="This trigger fires after a new subscriber is created."
                value="CONTACT_CREATED"
                onClick={handleSelectTrigger}
              />
            </Col>
            <Col>
              <Action
                Icon={ContactTagged}
                label="CONTACT TAGGED"
                description="This trigger fires after a subscriber is tagged with your desired custom tag."
                value="CONTACT_TAGGED"
                onClick={handleSelectTrigger}
              />
            </Col>
          </Row>
        )}
      </Modal>
    </>
  );
};

export default StopTriggerModal;
