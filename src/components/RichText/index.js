import React, { useEffect, useState } from "react";
import _ from "lodash";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "./styles.less";

const RichText = ({ value, defaultValue, onChange, className, disabled }) => {
  const [valueState, setValueState] = useState("");

  const modules = {
    toolbar: {
      container: [
        [{ header: [2, 3, 4, 5, false] }],
        ["bold", "italic", "underline", "strike"],
        // ['clean'],
        // [{ color: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        // ['link', 'image'],
        ["link"],
      ],
      handlers: {
        // TODO: enable later
        // image: handleUploadImage,
      },
    },
  };

  const handleChange = (e) => {
    setValueState(e);
    onChange(e);
  };

  useEffect(() => {
    setValueState(defaultValue);
  }, [defaultValue]);

  return (
    <ReactQuill
      className={className}
      theme="snow"
      modules={modules}
      value={valueState}
      defaultValue={valueState}
      onChange={handleChange}
      // readOnly={disabled}
      placeholder="Enter text..."
    />
  );
};

export default RichText;
