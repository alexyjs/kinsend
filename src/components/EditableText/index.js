import React, { useEffect, useState, useRef } from "react";
import classnames from "classnames";

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
    const newValue = (e.target.innerText || "")
      .replace(`<fname>`, `&lt;fname&gt;`)
      .replace(`<lname>`, `&lt;lname&gt;`)
      .replace(`<name>`, `&lt;name&gt;`)
      .replace(`<mobile>`, `&lt;mobile&gt;`)
      .replace(`<form>`, `&lt;form&gt;`);
    setValue(newValue);
    onChange(newValue);
  };

  const handleFocus = () => {};

  const handleSelectField = (fieldSelected) => {
    const newValue =
      (value[value.lengthvalue] === "<" ? value.slice(0, -1) : value)
        .replace(`<fname>`, `&lt;fname&gt;`)
        .replace(`<lname>`, `&lt;lname&gt;`)
        .replace(`<name>`, `&lt;name&gt;`)
        .replace(`<mobile>`, `&lt;mobile&gt;`)
        .replace(`<form>`, `&lt;form&gt;`)
        .replace(`&lt;fname&gt;`, `<span>&lt;fname&gt;</span>`)
        .replace(`&lt;lname&gt;`, `<span>&lt;lname&gt;</span>`)
        .replace(`&lt;name&gt;`, `<span>&lt;name&gt;</span>`)
        .replace(`&lt;mobile&gt;`, `<span>&lt;mobile&gt;</span>`)
        .replace(`&lt;form&gt;`, `<span>&lt;form&gt;</span>`) +
      `<span>${fieldSelected}</span>`;
    setValue(newValue);
    editableRef.current.innerHTML = newValue;
    setShowDropdown(false);
    onChange(newValue);
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
              <span>Contact's first name</span>
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
