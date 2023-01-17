import { Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectAutomatedResponses, toggleKeyResponsesAsync } from "../../redux/automatedResponsesReducer";
import KeywordResponseList from "./KeywordResponseList";

const KeywordResponseForm = () => {
  const { keyResponsesSettings } = useSelector(selectAutomatedResponses);
  const dispatch = useDispatch();

  console.log(keyResponsesSettings);

  return (
    <div>
      <div>
        <div className="flex items-center justify-between md:justify-start">
          <h1 className="text-3xl md:text-4xl">
            Keyword Responses
          </h1>
          <Switch className="ml-5" defaultChecked onChange={(checked) => dispatch(toggleKeyResponsesAsync(checked))} />
        </div>
        <div className="max-w-4xl mt-2 md:mt-4">
          Create automated responses by checking incoming messages for hashtags, emojis, or Regex rules. Reorder the responses to determine which responses takes priority if a message contains more than one of the chosen hashtags, emojis or rules.
        </div>
      </div>
      <KeywordResponseList />
    </div>
  );
}

export default KeywordResponseForm;
