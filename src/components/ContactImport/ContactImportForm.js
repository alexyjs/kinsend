import { Button } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CsvParser from "papaparse";
import { fieldMapped, getCustomFieldsAsync, getTagsAsync, importContactsAsync, selectSettings } from "../../redux/settingsReducer";
import { useMemo } from "react";
import ContactImportMapper from "./ContactImportMapper";
import { mapFieldsFromRawContacts } from "./helpers";
import FinalDetails from "./FinalDetails";

const contacts = JSON.parse('[["First Name","Last Name","Phone","Email","Job Title","Company","Address1","Address2","City","State/Province","Country Code","Zip Code","Tags","Birthday","Instagram","Twitter","Amount Spent"],["John","Doe","12025550169","j@shopify.com","Software Developer","Disruptive Multimedia","123 Fake Street","210 Another Fake Address","Ottawa","ON","CA","a1b2c3","customer;friend","10/21/1994","@instagram","@twitter","16.1"],["John","Doe","12025550169","j@shopify.com","Software Developer","Disruptive Multimedia","123 Fake Street","210 Another Fake Address","Ottawa","ON","CA","a1b2c3","customer;friend","10/21/1994","@instagram","@twitter","16.1"]]');

const ContactImportForm = () => {
  const dispatch = useDispatch();
  const fileRef = useRef();
  const { customFields, tags } = useSelector(selectSettings);
  const [file, setFile] = useState();
  const [tag, setTag] = useState('');
  const [rawContacts, setRawContacts] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    CsvParser.parse(event.target.files[0], {
      complete: (rawData) => {
        if (rawData.data.length < 2) {
          alert('Invalid file!');
          return;
        }

        const onFieldMatched = (from, to) => {
          dispatch(fieldMapped({ from, to }));
        }

        mapFieldsFromRawContacts(rawData.data, onFieldMatched, customFields);
        setRawContacts(rawData.data);
      }
    });
  };

  useEffect(() => {
    dispatch(getCustomFieldsAsync());
    dispatch(getTagsAsync());
  }, [dispatch]);

  return (
    <>
      <div className="px-12 py-4 bg-white rounded-t-lg shadow-md">
        <div className="flex md:flex-row flex-col justify-between items-center my-5">
          <div className="max-w-xl">
            <h2 className="text-lg text-black font-bold mb-5">Upload your CSV File</h2>
            <span>
              Ensure that your table includes columns for First Name and Phone Number or Email. To learn more about what data to include and get the most value out of Kinsend
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
          <input id="upload" name="upload" type="file" ref={fileRef} hidden onChange={handleFileChange} />
        </div>
      </div>
      {
        rawContacts.length > 0 && (
          <ContactImportMapper rawContacts={rawContacts} />
        )
      }
      <FinalDetails tags={tags} onSelect={setTag} />
    </>
  );
}
 
export default ContactImportForm;
