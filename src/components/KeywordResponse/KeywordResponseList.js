import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DraggableList from "./DraggableList";
import KeyResponseModal from "./KeyResponseModal.js/KeyResponseModal";
import { useModal } from "../../hook/useModal";
import { useDispatch, useSelector } from "react-redux";
import { createKeyResponsesSettingsAsync, deleteKeyResponsesSettingsAsync, selectAutomatedResponses, updateKeyResponsesSettingsAsync } from "../../redux/automatedResponsesReducer";
import { useState } from "react";

const KeywordResponseList = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [selectedKeywordResponse, setSelectedKeywordResponse] = useState(null);
  const { hashTagOrEmojiResponsesSettings, regexResponsesSettings } = useSelector(selectAutomatedResponses);
  const {
    close: closeAction,
    show: showAction,
    visible: visibleAction,
  } = useModal();

  const handleSaveKeywordResponse = (keywordType, data) => {
    const payload = {
      response: {
        type: "SEND_MESSAGE",
        message: data.message,
        fileAttached: data.fileAttached
      },
      tagId: data.tagId,
      type: keywordType,
      id: data.id
    };

    if (keywordType === "HASHTAG_OR_EMOJI") {
      payload.hashTagOrEmoji = data.keyword
    } else {
      payload.pattern = data.keyword
    }

    if (data.id) {
      payload.index = data.index;
      dispatch(updateKeyResponsesSettingsAsync(payload));
    } else {
      payload.index = hashTagOrEmojiResponsesSettings.length;
      dispatch(createKeyResponsesSettingsAsync(payload));
    }
    closeAction();
  };

  const handleSort = (data) => {
    console.log(data);
    dispatch(updateKeyResponsesSettingsAsync(data));
  }

  const handleOpenCreate = (createType) => {
    setSelectedKeywordResponse(null);
    setType(createType);
    showAction();
  }

  const handleOpenEdit = (keywordType, item) => {
    setType(keywordType);
    setSelectedKeywordResponse(item);
    showAction();
  }

  const handleDelete = (id) => {
    dispatch(deleteKeyResponsesSettingsAsync(id))
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
          onClick={() => handleOpenCreate("HASHTAG_OR_EMOJI")}
        >
          <PlusOutlined />
          New
        </Button>
      </div>
      <DraggableList type={type} list={hashTagOrEmojiResponsesSettings} onSorted={handleSort} handleOpenEdit={handleOpenEdit} handleDelete={handleDelete} />
      <KeyResponseModal
        data={selectedKeywordResponse}
        visible={visibleAction}
        handleCancel={closeAction}
        handleOk={handleSaveKeywordResponse}
        type={type}
      />
    </div>
  );
};

export default KeywordResponseList;
