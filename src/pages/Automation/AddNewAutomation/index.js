import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";

import { LayoutComponent } from "../../../components";
import TriggerModal from "../components/TriggerModal";
import StopTriggerModal from "../components/StopTriggerModal";
import ActionModal from "../components/ActionModal";
import { useModal } from "../../../hook/useModal";
import {
  AutomationTriggerIcon,
  AutomationAddIcon,
  AutomationDelayIcon,
  AutomationActionIcon,
  AutomationAddStopIcon,
} from "../../../assets/svg";

import { getTagsAsync } from "../../../redux/settingsReducer";
import { createAutomationAsync } from "../../../redux/automationReducer";

import "./styles.less";

const AddNewAutomation = () => {
  const {
    close: closeTrigger,
    show: showTrigger,
    visible: visibleTrigger,
  } = useModal();
  const { close: closeStop, show: showStop, visible: visibleStop } = useModal();
  const {
    close: closeAction,
    show: showAction,
    visible: visibleAction,
  } = useModal();
  const [trigger, setTrigger] = useState(null);
  const [stop, setStop] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [selectedAction, setSelectedAction] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();

  const handleSelectTrigger = (value) => {
    console.log("###handleSelectTrigger:", value);
    setTrigger(value);
    closeTrigger();
  };

  const handleSelectStopTrigger = (value) => {
    console.log("###handleSelectStopTrigger:", value);
    setStop(value);
    closeStop();
  };

  const handleShowAction = (index) => {
    // setSelectedAction(selected);
    showAction();
    setSelectedIndex(index);
  };

  const emptyTask = (index) => {
    return (
      <>
        <div
          className="automation-action-add automation-action-item"
          onClick={() => handleShowAction(index)}
        >
          <div className="automation-action-item-content">
            <h4 className="inline-flex items-center">
              <AutomationAddIcon className="mr-2" />
              Add Task
            </h4>
          </div>
        </div>
      </>
    );
  };

  const handleEditAction = (item, index, updatedData) => {
    const prefixArr = tasks.slice(0, index) || [];
    const suffixArr = tasks.slice(index, tasks.length) || [];
    let newTasks = [...tasks];
    if (item?.type) {
      newTasks[index] = updatedData;
    } else {
      newTasks = [...prefixArr, updatedData, ...suffixArr];
    }
    closeAction();
    setTasks(newTasks);
  };

  const handleSubmit = () => {
    const params = {};
    dispatch(createAutomationAsync(params));
  };

  useEffect(() => {
    dispatch(getTagsAsync());
  });

  const renderTask = (item, index) => {
    if (item.type === "delay") {
      <div
        className="automation-action-delay automation-action-item"
        onClick={showTrigger}
      >
        <div className="automation-action-item-content">
          <h4 className="inline-flex items-center">
            <AutomationDelayIcon className="mr-2" />
            Delay
          </h4>
          <span>time</span>
        </div>
      </div>;
    }
    return (
      <div
        className="automation-action-task automation-action-item"
        onClick={showTrigger}
      >
        <div className="automation-action-item-content">
          <h4 className="inline-flex items-center">
            <AutomationActionIcon className="mr-2" />
            Action
          </h4>
          <span>First messenge</span>
        </div>
      </div>
    );
  };
  console.log("##automation add:", trigger, stop, tasks);
  return (
    <LayoutComponent className="create-automation-page">
      <div className="flex justify-between items-center">
        <h1>
          <span className="text-primary">New</span>&nbsp;Automation
        </h1>
        <Button
          type="primary"
          size="large"
          className="min-w-200"
          onSubmit={handleSubmit}
          disabled={!tasks?.length}
        >
          SAVE
        </Button>
      </div>
      {!trigger && (
        <div className="flex justify-center items-center flex-col add-automation-empty">
          <AutomationTriggerIcon />
          <h2>Get started with a trigger</h2>
          <span className="add-automation-empty-desc">
            Trigger are events that start your automations!
          </span>
          <Button
            onClick={showTrigger}
            type="primary"
            size="large"
            className="min-w-200 uppercase"
          >
            Choose start trigger
          </Button>
        </div>
      )}
      <div className="timeline flex justify-center items-center flex-col">
        {trigger && (
          <>
            <div
              className="automation-action-add automation-action-item"
              onClick={showTrigger}
            >
              <div className="automation-action-item-content">
                <h3 className="inline-flex items-center">
                  <AutomationTriggerIcon className="mr-2" />
                  Trigger
                </h3>
                <span>
                  {trigger?.type === "first_message"
                    ? "First messenge"
                    : trigger?.type === "contact_created"
                    ? "Contact Created"
                    : "Contact Tagged"}
                </span>
              </div>
            </div>
            <div
              className="automation-action-stop automation-action-item"
              onClick={showStop}
            >
              <div className="automation-action-item-content">
                <h4 className="text-white inline-flex items-center">
                  <AutomationAddStopIcon className="mr-2" />
                  Add stop trigger
                </h4>
                <span className="text-white">
                  {stop?.type === "first_message"
                    ? "First messenge"
                    : stop?.type === "contact_created"
                    ? "Contact Created"
                    : "Contact Tagged"}
                </span>
              </div>
            </div>
          </>
        )}
        {trigger && tasks.length
          ? tasks.map((item, index) => (
              <>
                {emptyTask(index)}
                {renderTask(item, index)}
              </>
            ))
          : null}
        {trigger && emptyTask(tasks.length + 1)}
      </div>
      {/* TODO: Update later. we will duplicate this one in the first version */}
      <TriggerModal
        visible={visibleTrigger}
        handleOk={handleSelectTrigger}
        handleCancel={closeTrigger}
      />
      <StopTriggerModal
        visible={visibleStop}
        handleOk={handleSelectStopTrigger}
        handleCancel={closeStop}
      />
      <ActionModal
        visible={visibleAction}
        handleOk={handleEditAction}
        handleCancel={closeAction}
        data={selectedAction}
        index={selectedIndex}
      />
    </LayoutComponent>
  );
};

export default AddNewAutomation;
