
import { useState } from 'react';
import { AutomationActionRemove, AutomationAddStopIcon } from '../../assets/svg';
import { useModal } from '../../hook/useModal';
import SetMessageModal from './SetMessageModal.js/SetMessageModal';

import './styles.less';

const FirstContactForm = () => {
  const { close: closeAction, show: showAction, visible: visibleAction } = useModal();
  const [tasks, setTasks] = useState([]);
  const [selectedAction, setSelectedAction] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  const handleShowAction = (index) => {
    setSelectedAction(null);
    showAction();
    setSelectedIndex(index);
  };

  const handleShowEditAction = (item, index) => {
    setSelectedAction(item);
    setSelectedIndex(index);
    showAction();
  };

  return (
    <>
      <div className="first-contact-form timeline flex justify-center items-center flex-col md:mt-0 mt-3">
       <div className="first-contact-action-item">
          <div className="first-contact-action-item-content trigger">
            <h4 className="text-white">
              TRIGGER
            </h4>
            <span className="font-semibold">
              First Message or Call from Non-Contact
            </span>
          </div>
        </div>
        <div className="first-contact-action-item first-contact-action-stop mt-16 cursor-pointer" onClick={_ => handleShowAction(0)}>
          <div
            className="first-contact-action-item-remove cursor-pointer"
            onClick={console.log}
          >
            <AutomationActionRemove />
          </div>
          <div className="first-contact-action-item-content">
            <h4 className="text-white inline-flex items-center">
              <AutomationAddStopIcon className="mr-2" />
              ADD TASK
            </h4>
            <span className="text-white">
              Send Message
            </span>
          </div>
        </div>
        <div className="first-contact-action-item">
          <div className="first-contact-action-item-content no-action mt-16">
            <h4 className="inline-flex items-center">
              DELAY
            </h4>
            <span className="font-semibold">
              30 min
            </span>
          </div>
        </div>
        <div className="first-contact-action-item condition-item">
          <div className="first-contact-action-item-content no-action mt-16">
            <h4 className="inline-flex items-center">
              CHECK
            </h4>
            <span className="font-semibold">
              Did they become a contact?
            </span>
          </div>
        </div>
        <div className="first-contact-action-item first-contact-action-stop mt-16 cursor-pointer" onClick={_ => handleShowAction(1)}>
          <div
            className="first-contact-action-item-remove"
            onClick={console.log}
          >
            <AutomationActionRemove />
          </div>
          <div className="first-contact-action-item-content">
            <h4 className="text-white inline-flex items-center">
              <AutomationAddStopIcon className="mr-2" />
              ADD TASK
            </h4>
            <span className="text-white">
              Send Message
            </span>
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
    </>
  );
}

export default FirstContactForm;
