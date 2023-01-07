import { Checkbox, Select } from "antd";

import './contact-import.less';

const FinalDetails = ({ tags, onSelect }) => {
  return (
    <div className="px-12 py-4 bg-white rounded-b-lg shadow-md">
      <div className="flex md:flex-row flex-col justify-between my-5">
        <div className="w-80">
          <h2 className="text-lg text-black font-bold mb-5">Final Details</h2>
        </div>
        <div className="flex-grow">
          <p><strong>INBOUND TAG</strong></p>
          <p>Select tag to apply to the newly imported contacts</p>
          <Select
            allowClear
            onChange={(value) => onSelect(value)}
            placeholder="Select tag..."
            className="w-full md:w-[350px] mt-5 bg-gray-1"
          >
            {
              tags?.map((option) => (
                <Select.Option
                  key={`tag-${option.id}`}
                  value={option.id}
                >
                  {option.name}
                </Select.Option>
              ))
            }
          </Select>
          <Checkbox
            className="flex mt-5"
            onChange={onSelect}
          >
            <div>
              <p className="text-base font-semibold">Override Pre-existing Contact Information</p>
              <p>Decide whether to skip import for contacts that already exist</p>
            </div>
          </Checkbox>
        </div>
      </div>
    </div>
  );
}
 
export default FinalDetails;