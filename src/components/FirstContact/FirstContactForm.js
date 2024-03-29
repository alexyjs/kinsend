import { useState } from "react";
import { Button, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AutomationActionIcon, AutomationAddStopIcon } from "../../assets/svg";
import { useModal } from "../../hook/useModal";
import SetMessageModal from "./SetMessageModal.js/SetMessageModal";
import {
  saveFirstContactSettingsAsync,
  selectAutomatedResponses,
  toggleFirstContactAsync,
} from "../../redux/automatedResponsesReducer";
import { getMessagePreview } from "../../utils";
import "./styles.less";
import { useMemo } from "react";
import { useEffect } from "react";
import { selectUsers } from "../../redux/userReducer";

const shortenMessage = (message) => {
  return message.length < 50 ? message : message.substring(0, 50) + "...";
};

const isTasksValid = (tasks) => {
  return tasks.length === 2 && tasks.every((task) => !!task.message);
};

const FirstContactForm = ({ initValue }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { firstContactSettings } = useSelector(selectAutomatedResponses);
  const {
    close: closeAction,
    show: showAction,
    visible: visibleAction,
  } = useModal();
  const [tasks, setTasks] = useState(initValue?.tasks || []);
  const [selectedAction, setSelectedAction] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { user } = useSelector(selectUsers);

  const userPreviewFields = useMemo(() => {
    return {
      fname: user?.firstName,
      lname: user?.lastName,
      name: `${user?.firstName} ${user?.lastName}`,
      mobile: `${user?.phoneNumber[0].code}${user?.phoneNumber[0].phone}`,
    };
  }, [user]);

  const enableSaveBtn = useMemo(() => {
    return isTasksValid(tasks) && tasks.some((task) => task.isUpdated);
  }, [tasks]);

  const handleEditAction = (item, index, updatedData) => {
    let newTasks = [...tasks];
    newTasks[index] = { ...updatedData, isUpdated: true };
    closeAction();
    setTasks(newTasks);
  };

  const handleClickTask = (index) => {
    if (tasks[index]?.message) {
      setSelectedAction(tasks[index]);
    } else {
      setSelectedAction({
        message: "<form>",
      });
    }

    setSelectedIndex(index);
    showAction();
  };

  const handleSaveFirstContact = () => {
    const transformedTasks = tasks.map((task) => {
      return {
        type: "SEND_MESSAGE",
        message: task.message,
        fileAttached: task.fileAttached,
      };
    });
    const data = {
      firstTask: transformedTasks[0],
      reminderTask: transformedTasks[1],
    };
    dispatch(saveFirstContactSettingsAsync(data));
  };

  useEffect(() => {
    setTasks(initValue?.tasks || []);
  }, [initValue]);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <div className="flex items-center justify-between md:justify-start">
            <h1 className="text-3xl md:text-4xl">First Contact</h1>
            <Switch
              className="ml-5"
              onChange={(checked) => dispatch(toggleFirstContactAsync(checked))}
              checked={firstContactSettings.isEnabled}
              loading={firstContactSettings.isTogglingFirstContact}
            />
          </div>
          <div className="max-w-4xl mt-2 md:mt-4">
            Customize the automatic response that attempts to send
            non-subscribers to your subscriber intake form when they text you
            for the first time. There will be a 2 min human-emulated delay
            before your automated response is selected. If they don't complete
            the form after 30 min, you can trigger an additional reminder
            message. We don’t allow more than 2 messages to be sent to
            non-subscribers.
          </div>
        </div>
        <div className="flex">
          <Button
            type="primary"
            size="large"
            className="inline-flex items-center px-10 mt-5 md:mt-0 m-auto"
            onClick={handleSaveFirstContact}
            disabled={!enableSaveBtn}
          >
            Save
          </Button>
        </div>
      </div>
      <hr className="text-gray-2 my-8" />
      <div className="mb-8">
        <div className="first-contact-form timeline flex justify-center items-center flex-col md:mt-0 mt-3">
          <div className="first-contact-action-item">
            <div className="first-contact-action-item-content trigger">
              <h4 className="text-white">TRIGGER</h4>
              <span className="font-semibold">
                First Message or Call from Non-Contact
              </span>
            </div>
          </div>
          <div className="first-contact-action-item first-contact-action-stop mt-16">
            <div
              className={`first-contact-action-item-content cursor-pointer ${
                tasks[0]?.message ? "updated" : ""
              }`}
              onClick={(_) => handleClickTask(0)}
            >
              <h4 className="text-white inline-flex items-center">
                {tasks[0]?.message ? (
                  <AutomationActionIcon className="mr-2" />
                ) : (
                  <AutomationAddStopIcon className="mr-2" />
                )}
                ADD TASK
              </h4>
              <p
                className="text-white short-message text-ellipsis overflow-hidden truncate w-full"
                dangerouslySetInnerHTML={{
                  __html: tasks[0]?.message
                    ? getMessagePreview(tasks[0]?.message, userPreviewFields)
                        .replace(/<fname>/gi, `&lt;fname&gt;`)
                        .replace(/<lname>/gi, `&lt;lname&gt;`)
                        .replace(/<name>/gi, `&lt;name&gt;`)
                        .replace(/<mobile>/gi, `&lt;mobile&gt;`)
                        .replace(/<form>/gi, `&lt;form&gt;`)
                    : "Send Message",
                }}
              ></p>
            </div>
          </div>
          <div className="first-contact-action-item">
            <div className="first-contact-action-item-content no-action mt-16">
              <h4 className="inline-flex items-center">DELAY</h4>
              <span className="font-semibold">30 min</span>
            </div>
          </div>
          <div className="first-contact-action-item condition-item">
            <div className="first-contact-action-item-content no-action mt-16">
              <h4 className="inline-flex items-center">CHECK</h4>
              <span className="font-semibold">Did they become a contact?</span>
            </div>
          </div>
          <div className="first-contact-action-item first-contact-action-stop mt-16">
            <div
              className={`first-contact-action-item-content cursor-pointer ${
                tasks[1]?.message ? "updated" : ""
              }`}
              onClick={(_) => handleClickTask(1)}
            >
              <h4 className="text-white inline-flex items-center">
                {tasks[1]?.message ? (
                  <AutomationActionIcon className="mr-2" />
                ) : (
                  <AutomationAddStopIcon className="mr-2" />
                )}
                ADD TASK
              </h4>
              <p
                className="text-white short-message text-ellipsis overflow-hidden truncate w-full"
                dangerouslySetInnerHTML={{
                  __html: tasks[1]?.message
                    ? getMessagePreview(tasks[0]?.message, userPreviewFields)
                        .replace(/<fname>/gi, `&lt;fname&gt;`)
                        .replace(/<lname>/gi, `&lt;lname&gt;`)
                        .replace(/<name>/gi, `&lt;name&gt;`)
                        .replace(/<mobile>/gi, `&lt;mobile&gt;`)
                        .replace(/<form>/gi, `&lt;form&gt;`)
                    : "Send Message",
                }}
              ></p>
            </div>
          </div>
          <SetMessageModal
            visible={visibleAction}
            handleOk={handleEditAction}
            handleCancel={closeAction}
            data={selectedAction}
            index={selectedIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default FirstContactForm;
