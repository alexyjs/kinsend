import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { LogoIcon } from "../../../assets/svg";
import { getMainDomain } from "../../../utils";

import { selectPublic } from "../../../redux/publicReducer";
import "./styles.less";

const ThankYouSubmission = () => {
  const { addedFormSubmission } = useSelector(selectPublic);
  const mainDomain = getMainDomain();
  return (
    <div className="thank-you-page">
      <div className="thank-you-box text-center">
        <p className="text-center mb-4 text-2xl font-bold">
          {addedFormSubmission?.form?.message ||
            "Thank you for adding yourself to my phone book!"} {
              addedFormSubmission?.form?.redirectUrl && <a className="text-primary" href={addedFormSubmission?.form?.redirectUrl} target="_blank">{addedFormSubmission?.form?.redirectUrl}</a>
            }
        </p>
        <LogoIcon />
        <p className="note inline-flex">
          Want your own?{" "}
          <a
            href={`${mainDomain}/ref=${addedFormSubmission?.owner?.id}`}
            className="block font-bold ml-2 hover:underline"
          >
            Click here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ThankYouSubmission;
