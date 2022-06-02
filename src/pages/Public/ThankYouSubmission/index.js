import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectPublic,
} from "../../../redux/publicReducer";

const ThankYouSubmission = () => {
  const { addedFormSubmission } =
  useSelector(selectPublic);

  return <div className="thank-you-page">
    <div className="max-w-screen-md	mx-auto mb-5 mt-14">
      <h1 className="mb-4 text-center">Thank you</h1>
      <p className="text-center">{addedFormSubmission?.form?.message}</p>
      <a className="mt-5 block" href={addedFormSubmission?.owner?.vCard?.url} download>VCard.vcf</a>
    </div>
  </div>
}

export default ThankYouSubmission;
