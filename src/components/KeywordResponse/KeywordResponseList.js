import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DraggableList from "./DraggableList";
import KeyResponseModal from "./KeyResponseModal.js/KeyResponseModal";
import { useModal } from "../../hook/useModal";

const KeywordResponseList = () => {
  const {
    close: closeAction,
    show: showAction,
    visible: visibleAction,
  } = useModal();

  const handleSaveKeywordResponse = (data) => {
    // TODO: call API to create or edit
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-5">
      <div className="flex items-center justify-between">
        <div className="">
          <p className="font-bold">Hashtag and Emoji Responses</p>
          <p>
            Select responses to send to your contacts who message you with
            specific Hashtags or Emojis
          </p>
        </div>
        <Button
          type="primary"
          size="small"
          className="inline-flex items-center"
          onClick={() => showAction()}
        >
          <PlusOutlined />
          New
        </Button>
      </div>
      <DraggableList />
      <KeyResponseModal
        data={null}
        visible={visibleAction}
        handleCancel={closeAction}
        handleOk={console.log}
      />
    </div>
  );
};

export default KeywordResponseList;
