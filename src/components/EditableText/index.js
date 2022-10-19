import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Button, Tooltip } from "antd";
import classnames from "classnames";

import {
  AutomationActionMessageIcon,
  AutomationActionMaxMessageIcon,
} from "../../assets/svg";

import "./styles.less";

const EditableText = forwardRef(
  (
    { defaultValue, onChange, className, handleEnterSubmit, isDropdownTop },
    ref
  ) => {
    const [value, setValue] = useState("");
    const [offsetTopDropdown, setOffsetTopDropdown] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [indexSelectedField, setIndexSelectedField] = useState(0);
    const editableRef = useRef();

    useImperativeHandle(
      ref,
      () => ({
        triggerUpdateText: (valueTrigger) => {
          if (!value) {
            return;
          }
          let newValue = value.replace(/&lt;/gi, "<").replace(/&gt;/gi, `>`);
          newValue =
            newValue.slice(0, indexSelectedField) +
            `${valueTrigger}` +
            newValue.slice(indexSelectedField);
          console.log("###useImperativeHandle", indexSelectedField);
          newValue = newValue
            .replace(/<fname>/gi, `&lt;fname&gt;`)
            .replace(/<lname>/gi, `&lt;lname&gt;`)
            .replace(/<name>/gi, `&lt;name&gt;`)
            .replace(/<mobile>/gi, `&lt;mobile&gt;`)
            .replace(/<form>/gi, `&lt;form&gt;`);
          setValue(newValue);
          editableRef.current.innerHTML = newValue;
          setShowDropdown(false);
          onChange(newValue);
        },
      }),
      [value, indexSelectedField]
    );

    const handleKeyUp = (e) => {
      console.log("###handleKeyUp");
    };

    const handleChange = (e) => {
      let newValue = e.target.innerHTML || "";
      let result = newValue
        .replace(`<fname>`, `&lt;fname&gt;`)
        .replace(`<lname>`, `&lt;lname&gt;`)
        .replace(`<name>`, `&lt;name&gt;`)
        .replace(`<mobile>`, `&lt;mobile&gt;`)
        .replace(`<form>`, `&lt;form&gt;`)
        .replace(/<div><\/div>/, `\n`)
        .replace(/<br>/g, `\n`)
        .replace(/(<([^>]+)>)/gi, "")
        .replace(/(<([^>]+)>)/gi, "");
      if (newValue?.length > 160) {
        console.log("$$$", newValue, newValue?.length);
        newValue = newValue.slice(0, 160);
        editableRef.current.innerHTML = newValue;
      }
      setValue(result);
      onChange(result);
      const index = getCaretCharacterOffsetWithin();
      console.log("###handleChange", index);
      setIndexSelectedField(index);
    };

    const handleKeyDown = (e) => {
      if (e.keyCode === 188) {
        setShowDropdown(true);
        const offsetTop =
          window.getSelection().getRangeAt(0).endContainer.offsetTop ||
          window.getSelection().getRangeAt(0).endContainer.parentElement
            .offsetTop;
        !isDropdownTop && setOffsetTopDropdown(offsetTop);
        console.log(
          "###offsetTop",
          window.getSelection().getRangeAt(0),
          offsetTop
        );
      } else {
        setShowDropdown(false);
      }
      if (e.keyCode == 13 && !e.shiftKey && handleEnterSubmit) {
        handleEnterSubmit();
        console.log("#####Clear data handleKeyDown", e);
        setValue("");
        setTimeout(() => {
          editableRef.current.innerHTML = "";
        }, 100);
      } else {
        handleChange(e);
      }
      handleUpdateSelection();
      console.log("###handleKeyDown");
    };

    const handleClick = () => {
      setShowDropdown(false);
      handleUpdateSelection();
      const offsetTop = window.getSelection().getRangeAt(0)
        .endContainer.offsetTop;
      const parentElementoffsetTop = window.getSelection().getRangeAt(0)
        .endContainer.parentElement.offsetTop;
      console.log("###offsetTop", offsetTop, parentElementoffsetTop);
    };
    const handleUpdateSelection = () => {
      const index = getCaretCharacterOffsetWithin();
      console.log("###handleUpdateSelection", index);
      setIndexSelectedField(index);
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
          document
            .getElementById("shadowEditableRef")
            .append(preCaretRange.cloneContents());
          let selection =
            document.getElementById("shadowEditableRef").innerHTML;
          selection = selection
            .replace(/<div><\/div>/, "\n")
            .replace(/<br>/g, `\n`)
            .replace(/(<([^>]+)>)/gi, "")
            .replace(/(<([^>]+)>)/gi, "")
            .replace(/&lt;/gi, "<")
            .replace(/&gt;/gi, `>`);
          // caretOffset = preCaretTextRange.text.length;
          caretOffset = selection.length;
          document.getElementById("shadowEditableRef").innerHTML = "";
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

    const handleSelectField = (fieldSelected) => {
      let newValue = value.replace(/&lt;/gi, "<").replace(/&gt;/gi, `>`);
      newValue =
        newValue.slice(0, indexSelectedField) +
        `${fieldSelected} ` +
        newValue.slice(indexSelectedField);
      newValue = newValue
        .replace(/<fname>/gi, `&lt;fname&gt;`)
        .replace(/<lname>/gi, `&lt;lname&gt;`)
        .replace(/<name>/gi, `&lt;name&gt;`)
        .replace(/<mobile>/gi, `&lt;mobile&gt;`);
      if (newValue?.length > 160) {
        newValue = newValue.slice(0, 160);
      }
      setValue(newValue);
      editableRef.current.innerHTML = newValue;
      setShowDropdown(false);
      onChange(newValue);
    };

    useEffect(() => {
      const initValue = defaultValue
        .replace(/<fname>/gi, `&lt;fname&gt;`)
        .replace(/<lname>/gi, `&lt;lname&gt;`)
        .replace(/<name>/gi, `&lt;name&gt;`)
        .replace(/<mobile>/gi, `&lt;mobile&gt;`);
      console.log("#####Clear data");
      setValue(initValue);
      editableRef.current.innerHTML = initValue;
    }, [defaultValue]);

    return (
      <div className={classnames("EditableText", className)}>
        <div className="hint">
          <Tooltip
            placement="topLeft"
            title={
              <>
                Messages without <b>emojis & special</b> characters are sent in
                segments of <b>160 characters.</b>
              </>
            }
          >
            <Button>
              <AutomationActionMaxMessageIcon />| 160
            </Button>
          </Tooltip>
          <Tooltip
            placement="top"
            title={
              <>
                Carriers charge you for <b>every segment</b> they deliver to
                your recipient
              </>
            }
          >
            <Button>
              <AutomationActionMessageIcon />
            </Button>
          </Tooltip>
        </div>
        <div className="EditableText-body">
          <pre
            ref={editableRef}
            id="editableRef"
            className="EditableText-content"
            title={value}
            contentEditable="true"
            // onInput={handleChange}
            // onChange={handleChange}
            onClick={handleClick}
            onBlur={() => {}}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
          />
          {!value && (
            <span className="EditableText-placeholder">
              Compose your message..
            </span>
          )}
          <div id="shadowEditableRef"></div>
          {showDropdown && (
            <div
              className={classnames("EditableText-dropdown", {
                "EditableText-dropdown-top": isDropdownTop,
              })}
              style={{ top: isDropdownTop ? "auto" : offsetTopDropdown + 30 }}
            >
              <div
                className="EditableText-dropdown-item flex justify-between"
                onClick={() => handleSelectField(`<fname>`)}
              >
                <span className="EditableText-dropdown-item-field font-bold">{`<fname>`}</span>
                <span>Contact's first name</span>
              </div>
              <div
                className="EditableText-dropdown-item flex justify-between"
                onClick={() => handleSelectField(`<name>`)}
              >
                <span className="EditableText-dropdown-item-field font-bold">{`<name>`}</span>
                <span>Contact's full name</span>
              </div>
              <div
                className="EditableText-dropdown-item flex justify-between"
                onClick={() => handleSelectField(`<mobile>`)}
              >
                <span className="EditableText-dropdown-item-field font-bold">{`<mobile>`}</span>
                <span>Contact's mobile name</span>
              </div>
              <div
                className="EditableText-dropdown-item flex justify-between"
                onClick={() => handleSelectField(`<lname>`)}
              >
                <span className="EditableText-dropdown-item-field font-bold">{`<lname>`}</span>
                <span>Contact's last name</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default EditableText;
