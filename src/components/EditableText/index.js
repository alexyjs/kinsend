import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import classnames from "classnames";

import "./styles.less";

const EditableText = forwardRef(
  ({ defaultValue, onChange, className }, ref) => {
    const [value, setValue] = useState("");
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
            newValue.slice(0, indexSelectedField - 1) +
            `${valueTrigger}` +
            newValue.slice(indexSelectedField);
          newValue = newValue
            .replace(/<fname>/gi, `&lt;fname&gt;`)
            .replace(/<lname>/gi, `&lt;lname&gt;`)
            .replace(/<name>/gi, `&lt;name&gt;`)
            .replace(/<mobile>/gi, `&lt;mobile&gt;`)
            .replace(/<form>/gi, `&lt;form&gt;`)
            .replace(/&lt;fname&gt;/gi, `<span>&lt;fname&gt;</span>`)
            .replace(/&lt;lname&gt;/gi, `<span>&lt;lname&gt;</span>`)
            .replace(/&lt;name&gt;/gi, `<span>&lt;name&gt;</span>`)
            .replace(/&lt;mobile&gt;/gi, `<span>&lt;mobile&gt;</span>`)
            .replace(/&lt;form&gt;/gi, `<span>&lt;form&gt;</span> `)
            .replace(/<span><span>/gi, `<span>`)
            .replace(/<\/span><\/span>/gi, `<\/span><\/span>`)
            .replace(/<\/span><\/span>/gi, `</span> `);
          setValue(newValue);
          editableRef.current.innerHTML = newValue;
          setShowDropdown(false);
          onChange(newValue);
        },
      }),
      [value]
    );

    const handleKeyUp = (e) => {};

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
      setValue(result);
      onChange(result);
      const index = getCaretCharacterOffsetWithin();
      setIndexSelectedField(index);
    };
    const handleKeyDown = (e) => {
      let newValue = e.target.innerText || "";
      if (e.keyCode === 188) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
      if (e.keyCode === 13) {
        // const index = getCaretCharacterOffsetWithin();
        // let newValue = e.target.innerHTML || "";
        // let result = newValue
        //   .replace(`<fname>`, `&lt;fname&gt;`)
        //   .replace(`<lname>`, `&lt;lname&gt;`)
        //   .replace(`<name>`, `&lt;name&gt;`)
        //   .replace(`<mobile>`, `&lt;mobile&gt;`)
        //   .replace(`<form>`, `&lt;form&gt;`)
        //   .replace(/<div><\/div>/, `\n`)
        //   .replace(/<br>/g, `\n`)
        //   .replace(/(<([^>]+)>)/gi, "")
        //   .replace(/(<([^>]+)>)/gi, "");
      }
      handleUpdateSelection();
    };

    const handleFocus = () => {};
    const handleUpdateSelection = () => {
      const index = getCaretCharacterOffsetWithin();
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
          // const selection = document.getElementById('shadowEditableRef').innerText;
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
        newValue.slice(0, indexSelectedField - 1) +
        `<span>${fieldSelected}</span>` +
        newValue.slice(indexSelectedField);
      newValue = newValue
        .replace(/<fname>/gi, `&lt;fname&gt;`)
        .replace(/<lname>/gi, `&lt;lname&gt;`)
        .replace(/<name>/gi, `&lt;name&gt;`)
        .replace(/<mobile>/gi, `&lt;mobile&gt;`)
        .replace(/<form>/gi, `&lt;form&gt;`)
        .replace(/&lt;fname&gt;/gi, `<span>&lt;fname&gt;</span>`)
        .replace(/&lt;lname&gt;/gi, `<span>&lt;lname&gt;</span>`)
        .replace(/&lt;name&gt;/gi, `<span>&lt;name&gt;</span>`)
        .replace(/&lt;mobile&gt;/gi, `<span>&lt;mobile&gt;</span>`)
        .replace(/&lt;form&gt;/gi, `<span>&lt;form&gt;</span> `)
        .replace(/<span><span>/gi, `<span>`)
        .replace(/<\/span><\/span>/gi, `<\/span><\/span>`)
        .replace(/<\/span><\/span>/gi, `</span> `);
      setValue(newValue);
      editableRef.current.innerHTML = newValue;
      setShowDropdown(false);
      onChange(newValue);
    };

    useEffect(() => {
      // setValue(defaultValue?.replace("\n", "<br>") || "");
      setValue(defaultValue);
    }, [defaultValue]);

    return (
      <div
        className={classnames("EditableText", className)}
        onClick={handleFocus}
      >
        <div className="EditableText-body">
          <pre
            ref={editableRef}
            id="editableRef"
            className="EditableText-content"
            title={value}
            contenteditable="true"
            onInput={handleChange}
            onChange={handleChange}
            onMouseDown={handleUpdateSelection}
            // onMouseUp={handleUpdateSelection}
            onBlur={() => {}}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
          />
          <div id="shadowEditableRef"></div>
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
              {/* <div
                className="EditableText-dropdown-item flex justify-between"
                onClick={() => handleSelectField(`&lt;form&gt;`)}
              >
                <span className="EditableText-dropdown-item-field font-bold">{`<form>`}</span>
                <span>
                  Send a link to your default form or{" "}
                  <span className="text-primary">Select a form</span>
                </span>
              </div> */}
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
  }
);

export default EditableText;
