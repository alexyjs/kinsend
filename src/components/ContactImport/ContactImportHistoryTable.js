import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";
import {
  getImportContactHistoryAsync,
  selectSettings,
} from "../../redux/settingsReducer";

const ContactImportHistoryTable = () => {
  const dispatch = useDispatch();
  const { contactHistory } = useSelector(selectSettings);

  useEffect(() => {
    dispatch(getImportContactHistoryAsync());
  }, [dispatch]);

  return (
    <>
      <div className="px-7 md:px-12 py-1 md:py-4 bg-white rounded-lg shadow-md">
        {contactHistory?.map((history, index) => (
          <div
            className={`flex py-4 justify-between items-center border-gray-1 ${
              index === contactHistory.length - 1 ? "" : " border-b-1 "
            }`}
            key={index}
          >
            {history.numbersContact === history.numbersContactImported ? (
              <CheckCircleOutlined className="text-3xl text-green-500" />
            ) : (
              <ExclamationCircleOutlined className="text-3xl text-amber-500" />
            )}
            <div className="flex-grow ml-5">
              <p className="font-bold text-base">
                Import:{" "}
                {format(new Date(history.createdAt), "MMM dd, hh:mm aa")}
              </p>
              <p className="font-medium">
                <span
                  className={
                    history.numbersContact === history.numbersContactImported
                      ? ""
                      : "text-amber-500"
                  }
                >
                  {history.numbersContact === history.numbersContactImported
                    ? history.numbersContact
                    : `${history.numbersContactImported} of ${history.numbersContact}`}{" "}
                  contacts,{" "}
                </span>
                {history.numbersColumnMapped} columns mapped
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ContactImportHistoryTable;
