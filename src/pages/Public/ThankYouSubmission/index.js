import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { LogoIcon } from "../../../assets/svg";

import { selectPublic } from "../../../redux/publicReducer";
import "./styles.less";

const ThankYouSubmission = () => {
  const { addedFormSubmission } = useSelector(selectPublic);
  return (
    <div className="thank-you-page">
      <div className="thank-you-box text-center">
        <p className="text-center mb-4 text-2xl font-bold">
          {addedFormSubmission?.form?.message ||
            "Thank you for adding yourself to my phone book!"}
        </p>
        <LogoIcon />
        <p className="note inline-flex">
          Want your own?{" "}
          <a
            href={`${window.origin}/ref=${addedFormSubmission?.owner?.id}`}
            className="block font-bold ml-2 hover:underline"
          >
            Click here
          </a>
        </p>
        {/* <a
          className="mt-3 block font-bold"
          href={addedFormSubmission?.owner?.vCard?.url}
          download
          title={`${addedFormSubmission?.owner?.firstName}-${addedFormSubmission?.owner?.lastName}`}
        >
          Download: VCard.vcf
        </a> */}
      </div>
    </div>
  );
};

export default ThankYouSubmission;
