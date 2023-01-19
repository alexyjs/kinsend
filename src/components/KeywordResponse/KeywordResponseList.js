import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DraggableList from "./DraggableList";
import KeyResponseModal from "./KeyResponseModal.js/KeyResponseModal";
import { useModal } from "../../hook/useModal";
import { useDispatch, useSelector } from "react-redux";
import { createKeyResponsesSettingsAsync, selectAutomatedResponses } from "../../redux/automatedResponsesReducer";

const KeywordResponseList = () => {
  const dispatch = useDispatch();
  const { hashTagOrEmojiResponsesSettings, regexResponsesSettings } = useSelector(selectAutomatedResponses);
  const {
    close: closeAction,
    show: showAction,
    visible: visibleAction,
  } = useModal();

  const handleSaveKeywordResponse = (data) => {
    const payload = {
      response: {
        type: "SEND_MESSAGE",
        message: data.message,
        fileAttached: data.fileAttached
      },
      pattern: data.hashTagOrEmoji,
      hashTagOrEmoji: data.hashTagOrEmoji,
      tagId: data.tagId,
      type: "HASHTAG_OR_EMOJI",
      index: data.index
    }

    if (data.id) {
      
    } else {
      dispatch(createKeyResponsesSettingsAsync(payload));
    }
    closeAction();
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
      <DraggableList list={hashTagOrEmojiResponsesSettings} onSorted={console.log} />
      <KeyResponseModal
        data={null}
        visible={visibleAction}
        handleCancel={closeAction}
        handleOk={handleSaveKeywordResponse}
      />
    </div>
  );
};

export default KeywordResponseList;
