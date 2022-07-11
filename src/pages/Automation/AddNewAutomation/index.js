import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { get as _get, truncate } from "lodash";

import { LayoutComponent } from "../../../components";
import TriggerModal from "../components/TriggerModal";
import StopTriggerModal from "../components/StopTriggerModal";
import ActionModal from "../components/ActionModal";
import TitleModal from "../components/TitleModal";
import { useModal } from "../../../hook/useModal";
import { formatArray, clearEmptyField } from "../../../utils";
import {
  AutomationTriggerIcon,
  AutomationAddIcon,
  AutomationDelayIcon,
  AutomationActionIcon,
  AutomationAddStopIcon,
  AutomationActionRemove,
} from "../../../assets/svg";

import { getTagsAsync } from "../../../redux/settingsReducer";
import { handleCallAPI } from "../../../redux/helpers";
import {
  createAutomationAsync,
  selectAutomation,
  resetAutomationAsync,
  updateAutomationAsync,
} from "../../../redux/automationReducer";

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
  const {
    close: closeTitle,
    show: showTitle,
    visible: visibleTitle,
  } = useModal();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [trigger, setTrigger] = useState(null);
  const [stop, setStop] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [selectedAction, setSelectedAction] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { newAutomation } = useSelector(selectAutomation);

  const handleChangeTitle = (value) => {
    setTitle(value);
    closeTitle();
  };

  const handleSelectTrigger = (value) => {
    setTrigger(value);
    closeTrigger();
  };

  const handleSelectStopTrigger = (value) => {
    setStop(value);
    closeStop();
  };

  const handleShowAction = (index) => {
    setSelectedAction(null);
    showAction();
    setSelectedIndex(index);
  };

  const handleRemoveStop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setStop(null);
  };

  const hadnleRemoveTask = (e, index) => {
    e.preventDefault();
    e.stopPropagation();

    const newTask = [...tasks];
    newTask.splice(index, 1);
    setTasks(newTask);
  };

  const hadnleShowEditAction = (item, index) => {
    setSelectedAction(item);
    setSelectedIndex(index);
    showAction();
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

  const renderTask = (item, index) => {
    if (item.type === "DELAY") {
      return (
        <div
          className="automation-action-delay automation-action-item"
          onClick={() => hadnleShowEditAction(item, index)}
        >
          <div
            className="automation-action-item-remove"
            onClick={(e) => hadnleRemoveTask(e, index)}
          >
            <AutomationActionRemove />
          </div>
          <div className="automation-action-item-content">
            <h4 className="inline-flex items-center text-white">
              <AutomationDelayIcon className="mr-2" />
              Delay
            </h4>
          </div>
        </div>
      );
    }
    return (
      <div
        className="automation-action-task automation-action-item"
        onClick={() => hadnleShowEditAction(item, index)}
      >
        <div
          className="automation-action-item-remove"
          onClick={(e) => hadnleRemoveTask(e, index)}
        >
          <AutomationActionRemove />
        </div>
        <div className="automation-action-item-content">
          <h4 className="inline-flex items-center">
            <AutomationActionIcon className="mr-2" />
            Action
          </h4>
          <span>
            {truncate(item?.message, {
              length: 30,
              omission: "...",
            })}
          </span>
        </div>
      </div>
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

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const params = clearEmptyField({
      title: title,
      triggerType: trigger.type,
      taggedTagIds: formatArray(trigger?.taggedTagIds || []),
      stopTriggerType: stop?.type || null,
      stopTaggedTagIds: formatArray(stop?.taggedTagIds || []),
      tasks: tasks.map((item) => {
        return {
          type: item.type,
          message: item.message,
          fileAttached: item?.fileAttached?.url || null,
          delay: clearEmptyField(item.delay),
        };
      }),
    });

    if (id) {
      dispatch(
        updateAutomationAsync({
          dataUpdate: params,
          id: id,
        })
      );
    } else {
      dispatch(createAutomationAsync(params));
    }
  };

  useEffect(() => {
    dispatch(getTagsAsync());
  }, []);

  useEffect(() => {
    if (newAutomation) {
      navigate("/automation/active");
      dispatch(resetAutomationAsync());
    }
  }, [navigate, newAutomation]);

  const resetData = useCallback(() => {
    setTitle("New automation");
    setTrigger(null);
    setStop(null);
    setTasks([]);
    setSelectedAction({});
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    if (id) {
      const payload = {
        method: "GET",
        url: `${process.env.REACT_APP_API_BASE_URL}/automations/${id}`,
      };
      handleCallAPI(payload).then((res) => {
        const data = _get(res, "response", {});
        setTitle(data.title);
        setTrigger(
          data.triggerType
            ? {
                type: data.triggerType,
                // taggedTagIds: data.taggedTagIds,
                taggedTagIds: (data.taggedTags || []).map((item) => item.id),
              }
            : {}
        );
        setStop(
          data.stopTriggerType
            ? {
                type: data.stopTriggerType,
                // taggedTagIds: data.stopTaggedTagIds,
                taggedTagIds: (data.stopTaggedTags || []).map(
                  (item) => item.id
                ),
              }
            : {}
        );
        setTasks(
          data?.tasks.map((item) => {
            return {
              message: item.message,
              fileAttached: item?.fileAttached
                ? {
                    url: item?.fileAttached,
                    name: item?.fileAttached,
                  }
                : null,
              type: item.type,
              delay: item?.delay || {},
            };
          })
        );
        setSelectedAction({});
        setSelectedIndex(0);
      });
    } else {
      resetData();
    }
  }, [id]);

  return (
    <LayoutComponent className="create-automation-page">
      <div className="flex justify-between items-center">
        <h1>
          {!id && title === "New automation" ? (
            <>
              <span className="text-primary">New</span>
              &nbsp;Automation
            </>
          ) : (
            title
          )}
        </h1>
        <Button
          type="primary"
          size="large"
          className="min-w-200"
          onClick={handleSubmit}
          disabled={!tasks?.length}
        >
          SAVE
        </Button>
      </div>
      <Button type="primary" className="min-w-200 mt-3" onClick={showTitle}>
        Change title
      </Button>
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
                  {trigger?.type === "FIRST_MESSAGE"
                    ? "First messenge"
                    : trigger?.type === "CONTACT_CREATED"
                    ? "Contact Created"
                    : "Contact Tagged"}
                </span>
              </div>
            </div>
            <div
              className="automation-action-stop automation-action-item"
              onClick={showStop}
            >
              {stop?.type && (
                <div
                  className="automation-action-item-remove"
                  onClick={handleRemoveStop}
                >
                  <AutomationActionRemove />
                </div>
              )}
              <div className="automation-action-item-content">
                <h4 className="text-white inline-flex items-center">
                  <AutomationAddStopIcon className="mr-2" />
                  Add stop trigger
                </h4>
                <span className="text-white">
                  {stop?.type === "FIRST_MESSAGE"
                    ? "First messenge"
                    : stop?.type === "CONTACT_CREATED"
                    ? "Contact Created"
                    : stop?.type === "CONTACT_TAGGED"
                    ? "Contact Tagged"
                    : ""}
                </span>
              </div>
            </div>
          </>
        )}
        {trigger && tasks.length
          ? tasks.map((item, index) => (
              <React.Fragment key={`automation-task-${index}`}>
                {emptyTask(index)}
                {renderTask(item, index)}
              </React.Fragment>
            ))
          : null}
        {trigger && emptyTask(tasks.length + 1)}
      </div>
      {/* TODO: Update later. we will duplicate this one in the first version */}
      <TriggerModal
        visible={visibleTrigger}
        handleOk={handleSelectTrigger}
        handleCancel={closeTrigger}
        data={trigger}
      />
      <StopTriggerModal
        visible={visibleStop}
        handleOk={handleSelectStopTrigger}
        handleCancel={closeStop}
        data={stop}
      />
      <ActionModal
        visible={visibleAction}
        handleOk={handleEditAction}
        handleCancel={closeAction}
        data={selectedAction}
        index={selectedIndex}
      />
      <TitleModal
        visible={visibleTitle}
        handleOk={handleChangeTitle}
        handleCancel={closeTitle}
        title={title}
      />
    </LayoutComponent>
  );
};

export default AddNewAutomation;
