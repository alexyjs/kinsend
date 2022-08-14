import React, { useEffect, useState, useRef } from "react";
import classnames from "classnames";
import { LeafBlot } from "parchment";

import "./styles.less";

const EditableText = ({ defaultValue, onChange, className }) => {
  const [value, setValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [focus, setFocus] = useState(false);
  const editableRef = useRef();

  const handleChange = (e) => {};

  const handleKeyDown = (e) => {
    if (e.keyCode === 188) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
    // const newValue = (e.target.outerText || "")
    const newValue = (e.target.innerHTML || "")
      .replace(`<fname>`, `&lt;fname&gt;`)
      .replace(`<lname>`, `&lt;lname&gt;`)
      .replace(`<name>`, `&lt;name&gt;`)
      .replace(`<mobile>`, `&lt;mobile&gt;`)
      .replace(`<form>`, `&lt;form&gt;`);
    console.log("###handleKeyDown", document.getSelection());
    console.log("###handleKeyDown updated", newValue);
    setValue(newValue);
    onChange(newValue);
  };

  const handleFocus = () => {};

  const handleSelectField = (fieldSelected) => {
    // let newValue = value;
    let newValue = value
      .replace(`<fname>`, `&lt;fname&gt;`)
      .replace(`<lname>`, `&lt;lname&gt;`)
      .replace(`<name>`, `&lt;name&gt;`)
      .replace(`<mobile>`, `&lt;mobile&gt;`)
      .replace(`<form>`, `&lt;form&gt;`);
    // .replace(`&lt;fname&gt;`, `<span>&lt;fname&gt;</span>`)
    // .replace(`&lt;lname&gt;`, `<span>&lt;lname&gt;</span>`)
    // .replace(`&lt;name&gt;`, `<span>&lt;name&gt;</span>`)
    // .replace(`&lt;mobile&gt;`, `<span>&lt;mobile&gt;</span>`)
    // .replace(`&lt;form&gt;`, `<span>&lt;form&gt;</span>`);
    // console.log('###getNativeRange:', getNativeRange());
    const length = newValue.length;
    const index = window.getSelection().baseOffset;
    // console.log(document.getElementById('editableRef').selectedIndex);

    console.log(
      "###index",
      window.getSelection(),
      document.getSelection(),
      getCaretCharacterOffsetWithin()
    );
    console.log(
      "###newValue",
      newValue,
      fieldSelected,
      newValue.slice(0, index - 2),
      newValue.slice(index - 2)
    );
    newValue =
      newValue.slice(0, index - 2) +
      `${fieldSelected}` +
      newValue.slice(index - 2);
    console.log("###newValue updated:", newValue);
    setValue(newValue);
    editableRef.current.innerHTML = newValue;
    setShowDropdown(false);
    onChange(newValue);
  };

  const getCaretCharacterOffsetWithin = () => {
    const element = editableRef.current;
    let caretOffset = 0;
    let doc = element.ownerDocument || element.document;
    let win = doc.defaultView || doc.parentWindow;
    let sel;
    if (typeof win.getSelection != "undefined") {
      sel = win.getSelection();
      if (sel.rangeCount > 0) {
        let range = win.getSelection().getRangeAt(0);
        let preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
      }
    } else if ((sel = doc.selection) && sel.type != "Control") {
      let textRange = sel.createRange();
      let preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
  };

  useEffect(() => {
    setValue(defaultValue?.replace("\n", "<br>") || "");
  }, [defaultValue]);

  return (
    <div
      className={classnames("EditableText", className)}
      onClick={handleFocus}
    >
      <div className="EditableText-body">
        <div
          ref={editableRef}
          id="editableRef"
          className="EditableText-content"
          title={value}
          // dangerouslySetInnerHTML={{ __html: value }}
          contenteditable="true"
          onInput={handleChange}
          onBlur={() => {}}
          onKeyDown={handleKeyDown}
        ></div>
        {showDropdown && (
          <div className="EditableText-dropdown">
            <div
              className="EditableText-dropdown-item flex justify-between"
              onClick={() => handleSelectField(`&lt;fname&gt;`)}
            >
              <span className="EditableText-dropdown-item-field font-bold">{`<fname>`}</span>
              <span>Contact's first name</span>
            </div>
            <div
              className="EditableText-dropdown-item flex justify-between"
              onClick={() => handleSelectField(`&lt;name&gt;`)}
            >
              <span className="EditableText-dropdown-item-field font-bold">{`<name>`}</span>
              <span>Contact's full name</span>
            </div>
            <div
              className="EditableText-dropdown-item flex justify-between"
              onClick={() => handleSelectField(`&lt;mobile&gt;`)}
            >
              <span className="EditableText-dropdown-item-field font-bold">{`<mobile>`}</span>
              <span>Contact's mobile name</span>
            </div>
            <div
              className="EditableText-dropdown-item flex justify-between"
              onClick={() => handleSelectField(`&lt;form&gt;`)}
            >
              <span className="EditableText-dropdown-item-field font-bold">{`<form>`}</span>
              <span>
                Send a link to your default form or{" "}
                <span className="text-primary">Select a form</span>
              </span>
            </div>
            <div
              className="EditableText-dropdown-item flex justify-between"
              onClick={() => handleSelectField(`&lt;lname&gt;`)}
            >
              <span className="EditableText-dropdown-item-field font-bold">{`<lname>`}</span>
              <span>Contact's last name</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableText;
