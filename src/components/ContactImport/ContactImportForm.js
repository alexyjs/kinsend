import { Button, Checkbox, notification, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CsvParser from "papaparse";
import { read, utils } from "xlsx";
import {
  fieldMapped,
  getCustomFieldsAsync,
  getTagsAsync,
  importContactsAsync,
  resetMappedFields,
  selectSettings,
} from "../../redux/settingsReducer";
import ContactImportMapper from "./ContactImportMapper";
import { mapContacts, mapFieldsFromRawContacts } from "./helpers";
import { useMemo } from "react";
import { REQUIRED_FIELDS } from "../../utils/constants";
import ImportContactSuccessModal from "./ImportContactSuccessModal";

const steps = {
  UPLOAD_FILE: 0,
  MAP_FILEDS: 1,
  FINAL_DETAILS: 2,
};

const ContactImportForm = () => {
  const dispatch = useDispatch();
  const fileRef = useRef();
  const [step, setStep] = useState(steps.UPLOAD_FILE);
  const { customFields, tags, mappedFields, importContactStatus } =
    useSelector(selectSettings);
  const [file, setFile] = useState();
  const [tag, setTag] = useState("");
  const [shouldOverride, setShouldOverride] = useState(false);
  const [rawContacts, setRawContacts] = useState([]);

  const isRequiredFieldsMapped = useMemo(() => {
    return REQUIRED_FIELDS.every((requiredField) =>
      mappedFields.find((mappedField) => mappedField.to === requiredField)
    );
  }, [mappedFields]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (
      file.type !== "text/csv" &&
      file.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      notification.error({
        title: "Action failed",
        message: `File must be csv or xlsx!`,
      });

      return;
    }

    const onParseCompleted = (rawData) => {
      if (rawData.data.length < 2) {
        notification.error({
          title: "Action failed",
          message: `File must have header and at least one contact!`,
        });
        return;
      }

      dispatch(resetMappedFields());

      const onFieldMatched = (from, to) => {
        dispatch(fieldMapped({ from, to }));
      };

      mapFieldsFromRawContacts(rawData.data, onFieldMatched, customFields);
      setRawContacts(rawData.data);
      setStep(steps.MAP_FILEDS);
    };

    const onParseFailed = () => {
      notification.error({
        title: "Action failed",
        message: `Invalid file!`,
      });
    };

    if (file.type === "text/csv") {
      CsvParser.parse(file, {
        complete: onParseCompleted,
        error: onParseFailed,
      });
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const csvString = utils.sheet_to_csv(worksheet);

        CsvParser.parse(csvString, {
          complete: onParseCompleted,
          error: onParseFailed,
        });
      };

      reader.readAsArrayBuffer(file);
    }

    setFile(file);
  };

  const handleNext = async () => {
    if (step === steps.MAP_FILEDS) {
      setStep(steps.FINAL_DETAILS);
    } else {
      bulkImportContacts();
    }
  };

  const bulkImportContacts = () => {
    const contacts = mapContacts(rawContacts, mappedFields);
    const data = {
      contacts,
      row: contacts.length,
      numbersContactImported: contacts.length,
      numbersColumnMapped: mappedFields.length,
      tagId: tag,
      isOverride: shouldOverride,
    };
    dispatch(importContactsAsync(data));
  };

  useEffect(() => {
    dispatch(getCustomFieldsAsync());
    dispatch(getTagsAsync());
  }, [dispatch]);

  return (
    <div className="contact-import-form">
      <div className="px-7 md:px-12 py-1 md:py-4 bg-white rounded-t-lg shadow-md">
        <div className="flex md:flex-row flex-col justify-between items-center my-5">
          <div className="max-w-2xl">
            <h2 className="text-lg text-black font-bold">Upload your CSV or XLSX File</h2>
            {
              step === steps.UPLOAD_FILE && (
                <p className="block mt-5 md:max-w-md lg:max-w-full">
                  Ensure that your table includes columns for First Name and Phone Number or Email.
                  <br />
                  Download sample CSV template file{' '}
                  <a className="text-primary hover:underline" href="https://kinsend-public.s3.amazonaws.com/ks_contacts_sample.csv" download="ks_contacts_sample.csv">here</a>
                </p>
              )
            }
          </div>
          {file ? (
            <p className="flex items-center space-x-2 bg-gray-1 py-4 px-6 mt-5 md:mt-0">
              <span>{file.name}</span>
              <CloseOutlined className="cursor-pointer" onClick={() => {
                setFile(null);
                setStep(steps.UPLOAD_FILE);
              }} />
            </p>
          ) : (
            <Button
              type="primary"
              size="large"
              className="inline-flex items-center px-10 mt-5 md:mt-0"
              onClick={() => fileRef.current.click()}
            >
              Browse
            </Button>
          )}
          <input
            id="upload"
            name="upload"
            type="file"
            ref={fileRef}
            hidden
            onChange={handleFileChange}
            accept=".csv,.xlsx"
          />
        </div>
      </div>
      {rawContacts.length > 0 && step > steps.UPLOAD_FILE && (
        <ContactImportMapper
          rawContacts={rawContacts}
          isCurrentStep={step === steps.MAP_FILEDS}
          onEdit={() => setStep(steps.MAP_FILEDS)}
        />
      )}
      {step === steps.FINAL_DETAILS && (
        <div className="px-7 md:px-12 py-1 md:py-4 bg-white rounded-b-lg shadow-md">
          <div className="flex md:flex-row flex-col justify-between my-5">
            <div className="w-80">
              <h2 className="text-lg text-black font-bold mb-5">
                Final Details
              </h2>
            </div>
            <div className="flex-grow">
              <p>
                <strong>INBOUND TAG</strong>
              </p>
              <p>Select tag to apply to the newly imported contacts</p>
              <Select
                allowClear
                onChange={(value) => setTag(value)}
                placeholder="Select tag..."
                className="w-full md:w-[350px] mt-5 bg-gray-1"
              >
                {tags?.map((option) => (
                  <Select.Option key={`tag-${option.id}`} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
              <Checkbox
                className="flex mt-5"
                onChange={(e) => setShouldOverride(e.target.checked)}
              >
                <div>
                  <p className="text-base font-semibold">
                    Override Pre-existing Contact Information
                  </p>
                  <p>
                    Decide whether to skip import for contacts that already
                    exist
                  </p>
                </div>
              </Checkbox>
            </div>
          </div>
        </div>
      )}

      {step > steps.UPLOAD_FILE && (
        <div className="mt-5 flex justify-center">
          <Button
            type="primary"
            size="large"
            className={`next-btn inline-flex items-center px-12 mt-3 md:mt-0 ${!isRequiredFieldsMapped
                ? "opacity-30"
                : "opacity-80 hover:opacity-100"
              }`}
            onClick={handleNext}
            disabled={!isRequiredFieldsMapped}
            loading={importContactStatus === "loading"}
          >
            Next
          </Button>
        </div>
      )}

      {importContactStatus === "success" && <ImportContactSuccessModal />}
    </div>
  );
};

export default ContactImportForm;
