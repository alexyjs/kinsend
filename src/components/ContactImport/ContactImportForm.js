import { Button, Checkbox, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CsvParser from "papaparse";
import { fieldMapped, getCustomFieldsAsync, getTagsAsync, importContactsAsync, resetMappedFields, selectSettings } from "../../redux/settingsReducer";
import ContactImportMapper from "./ContactImportMapper";
import { mapContacts, mapFieldsFromRawContacts } from "./helpers";

const steps = {
  UPLOAD_CSV: 0,
  MAP_FILEDS: 1,
  FINAL_DETAILS: 2
};

const ContactImportForm = () => {
  const dispatch = useDispatch();
  const fileRef = useRef();
  const [step, setStep] = useState(steps.UPLOAD_CSV);
  const { customFields, tags, mappedFields } = useSelector(selectSettings);
  const [file, setFile] = useState();
  const [tag, setTag] = useState('');
  const [shouldOverride, setShouldOverride] = useState(false);
  const [rawContacts, setRawContacts] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    CsvParser.parse(event.target.files[0], {
      complete: (rawData) => {
        if (rawData.data.length < 2) {
          alert('Invalid file!');
          return;
        }

        dispatch(resetMappedFields());

        const onFieldMatched = (from, to) => {
          dispatch(fieldMapped({ from, to }));
        }

        mapFieldsFromRawContacts(rawData.data, onFieldMatched, customFields);
        setRawContacts(rawData.data);
        setStep(steps.MAP_FILEDS);
      }
    });
  };

  const handleNext = async () => {
    if (step === steps.MAP_FILEDS) {
      setStep(steps.FINAL_DETAILS);
    } else {
      bulkImportContacts();
    }
  }

  const bulkImportContacts = () => {
    const contacts = mapContacts(rawContacts, mappedFields);
    const data = {
      contacts,
      row: contacts.length,
      numbersContactImported: contacts.length,
      numbersColumnMapped: mappedFields.length,
      tagId: tag,
      isOverride: shouldOverride
    };
    dispatch(importContactsAsync(data));
  }

  useEffect(() => {
    dispatch(getCustomFieldsAsync());
    dispatch(getTagsAsync());
  }, [dispatch]);

  return (
    <div className="contact-import-form">
      <div className="px-12 py-4 bg-white rounded-t-lg shadow-md">
        <div className="flex md:flex-row flex-col justify-between items-center my-5">
          <div className="max-w-xl">
            <h2 className="text-lg text-black font-bold">Upload your CSV File</h2>
            {
              step === steps.UPLOAD_CSV && (
                <span className="block mt-5">
                  Ensure that your table includes columns for First Name and Phone Number or Email. To learn more about what data to include and get the most value out of Kinsend
                  {/* TODO: add FAQ link */}
                </span>
              )
            }
          </div>
          {file ? (
            <p className="flex items-center space-x-2 bg-gray-1 py-4 px-6">
              <span>{ file.name }</span>
              <CloseOutlined className="cursor-pointer" onClick={() => {
                setFile(null);
                setStep(steps.UPLOAD_CSV);
              }} />
            </p>
          ) : (
            <Button
              type="primary"
              size="large"
              className="inline-flex items-center px-10 mt-3 md:mt-0"
              onClick={() => fileRef.current.click()}
            >
              Browser
            </Button>
          )}
          <input id="upload" name="upload" type="file" ref={fileRef} hidden onChange={handleFileChange} />
        </div>
      </div>
      {
        rawContacts.length > 0 && step > steps.UPLOAD_CSV && (
          <ContactImportMapper rawContacts={rawContacts} isCurrentStep={step === steps.MAP_FILEDS} onEdit={() => setStep(steps.MAP_FILEDS)} />
        )
      }
      {step === steps.FINAL_DETAILS && (
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
                onChange={(value) => setTag(value)}
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
                onChange={(e) => setShouldOverride(e.target.checked)}
              >
                <div>
                  <p className="text-base font-semibold">Override Pre-existing Contact Information</p>
                  <p>Decide whether to skip import for contacts that already exist</p>
                </div>
              </Checkbox>
            </div>
          </div>
        </div>
      )}

      {step > steps.UPLOAD_CSV && (
        <div className="mt-5 flex justify-center">
          <Button
            type="primary"
            size="large"
            className="next-btn inline-flex items-center px-12 mt-3 md:mt-0"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
 
export default ContactImportForm;
