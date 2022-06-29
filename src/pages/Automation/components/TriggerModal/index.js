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

const TriggerModal = ({ visible, handleOk, handleCancel }) => {
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

  return (
    <>
      <Modal
        key="TriggerModal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closable={true}
        destroyOnClose={true}
        centered
        className="automation-trigger-modal"
      >
        <h3 className="font-bold text-center text-2xl mb-9">Start Trigger</h3>
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
                label="First Message"
                value="FIRST_MESSAGE"
                onClick={handleSelectTrigger}
              />
            </Col>
            <Col>
              <Action
                Icon={ContactCreatedIcon}
                label="contact created"
                value="CONTACT_CREATED"
                onClick={handleSelectTrigger}
              />
            </Col>
            <Col>
              <Action
                Icon={ContactTagged}
                label="Contact Tagged"
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

export default TriggerModal;
