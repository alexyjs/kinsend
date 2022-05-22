import React, { Component, useState, useRef } from "react";
import _ from "lodash";
import ReactQuill from 'react-quill';
import QuillDelta from "quill-delta";

import { handleUploadImageCallAPI } from "../redux/helpers";

import 'react-quill/dist/quill.snow.css';
import "./RichText.less";

const RichText = ({ value, onChange, className, disabled }) => {
  const [submitting, setSubmitting] = useState(false);
  const quillRef = useRef(null);

  const handleUploadImage = () => {
    const editor = quillRef.current.getEditor();
    var range = editor.getSelection();
    // Show popup to select image and upload to server
    let fInput = document.createElement("input");
    fInput.setAttribute("type", "file");
    fInput.setAttribute("accept", "image/*");
    fInput.classList.add("ql-image");
    fInput.addEventListener("change", async () => {
      if (fInput.files != null && fInput.files[0] != null) {
        let formData = new FormData();
        formData.append("file", fInput.files[0]);
        setSubmitting(true);
        handleUploadImageCallAPI(formData, false)
          .then((res) => {
            // insert content with attributes
            console.log('###check', quillRef, editor);
            // editor.updateContents(
            //   new QuillDelta()
            //     .retain(range.index)
            //     .insert(
            //       { image: res },
            //       { alt: "image" }
            //     )
            // );
            // move cusor
            // editor.setSelection(range.index + 1);
            // editor.setEditorContents(range.index, 'image', res);
            // const range = editor.getEditorSelection();
            // editor.insertEmbed(range.index, 'image', res);
            // quillRef.current.setSelection(range.index + 1);
            console.log('###done')


            // const range = quillRef.current.getEditorSelection();
            // quillRef.current.setEditorContents(range.index, 'image', res);
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
        // ['link', 'image'],
        ['link'],
      ],
      handlers: {
        // TODO: enable later
        // image: handleUploadImage,
      },
    }
  }

  return <ReactQuill
    blur={(value) => {console.log('###blur', value)}}
    className={className}
    theme="snow"
    modules={modules}
    defaultValue={value}
    onChange={onChange}
    readOnly={disabled}
    placeholder="Enter text..."
    ref={quillRef}
  />
}

export default RichText;
