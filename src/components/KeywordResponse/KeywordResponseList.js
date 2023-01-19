import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DraggableList from "./DraggableList";
import KeyResponseModal from "./KeyResponseModal.js/KeyResponseModal";
import { useModal } from "../../hook/useModal";
import { useDispatch, useSelector } from "react-redux";
import { createKeyResponsesSettingsAsync, selectAutomatedResponses, updateKeyResponsesSettingsAsync } from "../../redux/automatedResponsesReducer";
import { useState } from "react";

const KeywordResponseList = () => {
  const dispatch = useDispatch();
  const [selectedKeywordResponse, setSelectedKeywordResponse] = useState(null);
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
      id: data.id
    };

    if (data.id) {
      payload.index = data.index;
      dispatch(updateKeyResponsesSettingsAsync(payload));
    } else {
      payload.index = 0;
      dispatch(createKeyResponsesSettingsAsync(payload));
    }
    closeAction();
  };

  const handleSort = (data) => {
    data.hashTagOrEmoji = data.pattern;
    dispatch(updateKeyResponsesSettingsAsync(data));
  }

  const handleOpenCreate = () => {
    setSelectedKeywordResponse(null);
    showAction();
  }

  const handleOpenEdit = (item) => {
    setSelectedKeywordResponse(item);
    showAction();
  }

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
          onClick={() => handleOpenCreate()}
        >
          <PlusOutlined />
          New
        </Button>
      </div>
      <DraggableList list={hashTagOrEmojiResponsesSettings} onSorted={handleSort} handleOpenEdit={handleOpenEdit} handleDelete={console.log} />
      <KeyResponseModal
        data={selectedKeywordResponse}
        visible={visibleAction}
        handleCancel={closeAction}
        handleOk={handleSaveKeywordResponse}
      />
    </div>
  );
};

export default KeywordResponseList;
