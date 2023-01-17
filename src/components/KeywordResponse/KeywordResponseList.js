import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DraggableList from "./DraggableList";

const KeywordResponseList = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-5">
      <div className="flex items-center justify-between">
        <div className="">
          <p className="font-bold">
            Hashtag and Emoji Responses
          </p>
          <p>
          Select responses to send to your contacts who message you with specific Hashtags or Emojis
          </p>
        </div>
        <Button
          type="primary"
          size="small"
          className="inline-flex items-center"
          onClick={() => console.log}
        >
          <PlusOutlined />
          New
        </Button>
      </div>
      <DraggableList />
    </div>
  );
}
 
export default KeywordResponseList;
