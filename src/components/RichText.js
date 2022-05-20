import React, { Component, useState } from "react";
import _ from "lodash";
import ReactQuill from 'react-quill';
import QuillDelta from "quill-delta";


// import { uploadPhoto } from "";

import 'react-quill/dist/quill.snow.css';
import "./RichText.less";

const uploadPhoto = () => {};
const RichText = ({ value, onChange, className, disabled }) => {
  const [submitting, setSubmitting] = useState(false);

  const handleUploadImage = () => {
    const editor = this.quillRef.getEditor();
    var range = editor.getSelection();
    // Show popup to select image and upload to server
    let fInput = document.createElement("input");
    fInput.setAttribute("type", "file");
    fInput.setAttribute("accept", "image/*");
    fInput.classList.add("ql-image");
    fInput.addEventListener("change", async () => {
      if (fInput.files != null && fInput.files[0] != null) {
        let formData = new FormData();
        formData.append("photo", fInput.files[0]);
        setSubmitting(true);
        uploadPhoto(formData, false)
          .then((res) => {
            // insert content with attributes
            editor.updateContents(
              new QuillDelta()
                .retain(range.index)
                .insert(
                  { image: _.get(res, "data.original") },
                  { alt: "image" }
                )
            );
            // move cusor
            editor.setSelection(range.index + 1);
            setSubmitting(false);
          })
          .catch(() => setSubmitting(false));
      }
    });
    fInput.click();
  }

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
        ['link', 'image'],
      ],
      handlers: {
        image: handleUploadImage,
      },
    }
  }

  return <ReactQuill
    className={className}
    theme="snow"
    modules={modules}
    defaultValue={value}
    value={value}
    onChange={onChange}
    readOnly={disabled}
    placeholder="Enter text..."
    // ref={(el) => {
    //   this.quillRef = el;
    // }}
  />
}

export default RichText;
