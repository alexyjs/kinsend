import { Button } from "antd";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { importContactsAsync } from "../../redux/settingsReducer";

const ContactImportForm = () => {
  const dispatch = useDispatch();
  const fileRef = useRef();
  let [file, setFile] = useState();

  const handleChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();

    setFile(file);
    formData.append("file", file, file.name);

    dispatch(importContactsAsync(formData));
  };
  
  return (
    <div className="px-12 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex md:flex-row flex-col justify-between items-center my-5">
        <div className="max-w-xl">
          <h2 className="text-lg text-black font-bold mb-5">Upload your CSV File</h2>
          <span>
            Ensure that your table includes columns for First Name and Phone Number or Email. To learn more about what data to include and get the most value out of SuperPhone
            {/* TODO: add FAQ link */}
          </span>
        </div>
        <Button
          type="primary"
          size="large"
          className="inline-flex items-center px-10 mt-3 md:mt-0"
          onClick={() => fileRef.current.click()}
        >
          Browser
        </Button>
        <input id="upload" name="upload" type="file" ref={fileRef} hidden onChange={handleChange} />
      </div>
    </div>
  );
}
 
export default ContactImportForm;
