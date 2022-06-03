import React from "react";
import { CopyOutlined } from "@ant-design/icons";

import "./styles.less";

const Copy = ({ value, title }) => {
  const handleCopy = () => {
    var copyText = document.createElement("textarea");
    copyText.value = value;
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    // navigator.clipboard.writeText(copyText.value);
    navigator.clipboard.writeText(copyText.value);
  };

  return (
    <span className="copy-component">
      <CopyOutlined
        onClick={handleCopy}
        // title={title}
      />
      <span className="tooltiptext" id="myTooltip">
        {title || "Copy to clipboard"}
      </span>
    </span>
  );
};

export default Copy;
