import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import { Button, Tooltip } from "antd";
import classnames from "classnames";

import {
  AutomationActionMessageIcon,
  AutomationActionMaxMessageIcon,
} from "../../assets/svg";

import "./styles.less";

const FIELDS = [
  {
    fieldLabel: "fname",
    text: "Contact's first name",
  },
  {
    fieldLabel: "name",
    text: "Contact's full name",
  },
  {
    fieldLabel: "mobile",
    text: "Contact's mobile name",
  },
  {
    fieldLabel: "lname",
    text: "Contact's last name",
  },
];

const EditableText = forwardRef(
  (
    { defaultValue, onChange, className, handleEnterSubmit, isDropdownTop },
    ref
  ) => {
    const [value, setValue] = useState("");
    const [fieldValue, setFieldValue] = useState("");
    const [offsetTopDropdown, setOffsetTopDropdown] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [indexSelectedField, setIndexSelectedField] = useState(0);
    const [cursor, setCursor] = useState(0);
    const editableRef = useRef();

    const memoizedFields = useMemo(
      () =>
        fieldValue
          ? FIELDS.filter(({ fieldLabel }) => fieldLabel.includes(fieldValue))
          : FIELDS,
      [fieldValue]
    );

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
          newValue = newValue
            .replace(/<fname>/gi, `&lt;fname&gt;`)
            .replace(/<lname>/gi, `&lt;lname&gt;`)
            .replace(/<name>/gi, `&lt;name&gt;`)
            .replace(/<mobile>/gi, `&lt;mobile&gt;`)
            .replace(/<form>/gi, `&lt;form&gt;`);
          //   console.log("###useImperativeHandle", indexSelectedField);
          setValue(newValue);
          editableRef.current.innerHTML = newValue;
          setShowDropdown(false);
          onChange(newValue);
        },
      }),
      [value, indexSelectedField]
    );

    const handleKeyUp = (e) => {
      if (e.keyCode === 39 || e.keyCode === 37) {
        handleUpdateSelection();
      }
    };

    const getFieldText = (index, text) => {
      const cursorIndex = index;
      const searchText = text;
      const part1 = searchText.slice(0, cursorIndex);
      const part2 = searchText.slice(cursorIndex);
      const leftArrowPositionRelToCur = part1
        .split("")
        .reverse()
        .reduce((result, letter, index) => {
          if (result === false || result !== null) {
            return result;
          }
          if (letter === ">") {
            return false;
          }
          if (letter === "<") {
            return index;
          }
          return null;
        }, null);

      if (typeof leftArrowPositionRelToCur !== "number") {
        return false;
      }

      const rightArrowPositionRelToCur = part2
        .split("")
        .reduce((result, letter, index) => {
          if (result !== null) return result;
          if (letter === ">" || letter === "<") {
            return index;
          }
          return null;
        }, null);

      const leftTextPos = part1.length - leftArrowPositionRelToCur - 1;
      const rightTextLength = rightArrowPositionRelToCur ?? part2.length;

      const rightTextPos = part1.length + rightTextLength;

      const fieldText = searchText.slice(leftTextPos + 1, rightTextPos);

      return fieldText;
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
        .replace(/(<([^>]+)>)/gi, "")
        .replace(/&nbsp;/gi, " ");

      if (newValue?.length > 160) {
        console.log("$$$", newValue, newValue?.length);
        newValue = newValue.slice(0, 160);
        editableRef.current.innerHTML = newValue;
      }
      setValue(result);
      onChange(result);
      const index = getCaretCharacterOffsetWithin();
      console.log("###handleChange", index, result);
      setIndexSelectedField(index);
    };

    const handleKeyDown = (e) => {
      switch (e.keyCode) {
        case 190: {
          if (e.shiftKey) {
            setShowDropdown(false);
            setFieldValue("");
            const typedField = memoizedFields.find(
              ({ fieldLabel }) => fieldLabel === fieldValue
            );
            if (typedField) {
              e.preventDefault();
              handleSelectField(`<${typedField.fieldLabel}>`);
              setCaretAtTheEnd();
            }
          }
          break;
        }

        case 188: {
          if (e.shiftKey) {
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
          }
          break;
        }
        case 13:
          if (!e.shiftKey && handleEnterSubmit) {
            handleEnterSubmit();
            setTimeout(() => {
              setValue("");
              onChange("");
              setIndexSelectedField(0);
              editableRef.current.innerHTML = "";
            }, 100);
          }
          if (e.keyCode === 13 && showDropdown) {
            e.preventDefault();
            handleSelectField(`<${memoizedFields[cursor].fieldLabel}>`);
            setCaretAtTheEnd();
          }
          break;

        case 40:
          if (showDropdown) {
            e.preventDefault();
            setCursor((prevState) =>
              prevState < memoizedFields.length - 1 ? prevState + 1 : prevState
            );
          }
          break;

        case 38:
          if (showDropdown) {
            e.preventDefault();
            setCursor((prevState) =>
              prevState > 0 ? prevState - 1 : prevState
            );
          }
          break;

        default:
          break;
      }
      if (e.keyCode !== 39 && e.keyCode !== 37) {
        handleUpdateSelection();
      }
    };

    const handleClick = () => {
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

    const setCaretAtTheEnd = () => {
      const element = editableRef.current;
      element.focus();
      window.getSelection().selectAllChildren(element);
      window.getSelection().collapseToEnd();
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
            .replace(/<\/?span[^>]*>/g, "")
            .replace(/<div><\/div>/, "\n")
            .replace(/<br>/g, `\n`)
            .replace(/(<([^>]+)>)/gi, "")
            .replace(/(<([^>]+)>)/gi, "")
            .replace(/&lt;/gi, "<")
            .replace(/&gt;/gi, `>`)
            .replace(/&nbsp;/gi, " ");
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
      let newValue = value
        .replace(/<\/?span[^>]*>/g, "")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&nbsp;/gi, " ");
      const endSlice = newValue.slice(indexSelectedField).startsWith(">")
        ? 1
        : 0;
      newValue =
        newValue.slice(0, indexSelectedField - fieldValue.length - 1) +
        `${fieldSelected} ` +
        newValue.slice(indexSelectedField + endSlice);

      if (newValue?.length > 160) {
        newValue = newValue.slice(0, 160);
      }

      newValue = newValue
        .replace(/</gi, "&lt;")
        .replace(/>/gi, "&gt;")
        .replace(/\s+/g, "&nbsp;");
      newValue = newValue
        .replace(
          /&lt;fname&gt;/gi,
          `<span class=mergeField contentEditable=false>&lt;fname&gt;</span>`
        )
        .replace(
          /&lt;lname&gt;/gi,
          `<span class=mergeField contentEditable=false>&lt;lname&gt;</span>`
        )
        .replace(
          /&lt;name&gt;/gi,
          `<span class=mergeField contentEditable=false>&lt;name&gt;</span>`
        )
        .replace(
          /&lt;mobile&gt;/gi,
          `<span class=mergeField contentEditable=false>&lt;mobile&gt;</span>`
        );
      setValue(newValue);
      editableRef.current.innerHTML = newValue;
      setShowDropdown(false);
      onChange(newValue);
      handleUpdateSelection();
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

    useEffect(() => {
      const fieldText = getFieldText(
        indexSelectedField,
        editableRef.current.innerText
      );

      if (fieldText === false) {
        setShowDropdown(false);
        setFieldValue("");
      } else {
        setShowDropdown(true);
        setFieldValue(fieldText);
      }
    }, [indexSelectedField]);

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
          <div
            ref={editableRef}
            id="editableRef"
            className="EditableText-content"
            title={value}
            contentEditable="true"
            onInput={handleChange}
            onChange={handleChange}
            onClick={handleClick}
            onBlur={() => {}}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
          />
          {!value && !showDropdown && (
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
              {memoizedFields.map(({ text, fieldLabel }, index) => (
                <div
                  key={fieldLabel}
                  className={classnames(
                    "EditableText-dropdown-item flex justify-between",
                    {
                      active: index === cursor,
                    }
                  )}
                  onClick={() => handleSelectField(`<${fieldLabel}>`)}
                >
                  <span className="EditableText-dropdown-item-field font-bold">{`<${fieldLabel}>`}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default EditableText;
