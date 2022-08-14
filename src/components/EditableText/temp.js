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

  function contains(parent, descendant) {
    try {
      // eslint-disable-next-line no-unused-expressions
      descendant.parentNode;
    } catch (e) {
      return false;
    }
    return parent.contains(descendant);
  }

  const normalizedToRange = (range) => {
    const positions = [[range.start.node, range.start.offset]];
    if (!range.native.collapsed) {
      positions.push([range.end.node, range.end.offset]);
    }
    const indexes = positions.map((position) => {
      const [node, offset] = position;
      const blot = this.scroll.find(node, true);
      const index = blot.offset(this.scroll);
      if (offset === 0) {
        return index;
      }
      if (blot instanceof LeafBlot) {
        return index + blot.index(node, offset);
      }
      return index + blot.length();
    });
    const end = Math.min(Math.max(...indexes), this.scroll.length() - 1);
    const start = Math.min(end, ...indexes);
    return new Range(start, end - start);
  };

  const normalizeNative = (nativeRange) => {
    // if (
    //   !contains(this.root, nativeRange.startContainer) ||
    //   (!nativeRange.collapsed && !contains(this.root, nativeRange.endContainer))
    // ) {
    //   return null;
    // }
    const element = document.getElementById("editableRef");
    if (
      !contains(element, nativeRange.startContainer) ||
      (!nativeRange.collapsed && !contains(element, nativeRange.endContainer))
    ) {
      return null;
    }
    const range = {
      start: {
        node: nativeRange.startContainer,
        offset: nativeRange.startOffset,
      },
      end: { node: nativeRange.endContainer, offset: nativeRange.endOffset },
      native: nativeRange,
    };
    [range.start, range.end].forEach((position) => {
      let { node, offset } = position;
      while (!(node instanceof Text) && node.childNodes.length > 0) {
        if (node.childNodes.length > offset) {
          node = node.childNodes[offset];
          offset = 0;
        } else if (node.childNodes.length === offset) {
          node = node.lastChild;
          if (node instanceof Text) {
            offset = node.data.length;
          } else if (node.childNodes.length > 0) {
            // Container case
            offset = node.childNodes.length;
          } else {
            // Embed case
            offset = node.childNodes.length + 1;
          }
        } else {
          break;
        }
      }
      position.node = node;
      position.offset = offset;
    });
    return range;
  };

  const getNativeRange = () => {
    const selection = document.getSelection();
    if (selection == null || selection.rangeCount <= 0) return null;
    const nativeRange = selection.getRangeAt(0);
    if (nativeRange == null) return null;
    const range = normalizeNative(nativeRange);
    return range;
  };

  const getRange = () => {
    const root = this.scroll.domNode;
    if ("isConnected" in root && !root.isConnected) {
      // document.getSelection() forces layout on Blink, so we trend to
      // not calling it.
      return [null, null];
    }
    const normalized = this.getNativeRange();
    if (normalized == null) return [null, null];
    const range = this.normalizedToRange(normalized);
    return [range, normalized];
  };

  getSelection = (focus = false) => {
    // if (focus) this.focus();
    // this.update(); // Make sure we access getRange with editor in consistent state
    return getRange()[0];
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 188) {
      setShowDropdown(true);
      console.log("###setShowDropdown:", getNativeRange());
      console.log("###getRange:", getRange());
    } else {
      setShowDropdown(false);
    }
    const newValue = (e.target.innerText || "")
      .replace(`<fname>`, `&lt;fname&gt;`)
      .replace(`<lname>`, `&lt;lname&gt;`)
      .replace(`<name>`, `&lt;name&gt;`)
      .replace(`<mobile>`, `&lt;mobile&gt;`)
      .replace(`<form>`, `&lt;form&gt;`);
    console.log("###handleKeyDown", document.getSelection());
    setValue(newValue);
    onChange(newValue);
  };

  const handleFocus = () => {};

  const handleSelectField = (fieldSelected) => {
    let newValue = value
      .replace(`<fname>`, `&lt;fname&gt;`)
      .replace(`<lname>`, `&lt;lname&gt;`)
      .replace(`<name>`, `&lt;name&gt;`)
      .replace(`<mobile>`, `&lt;mobile&gt;`)
      .replace(`<form>`, `&lt;form&gt;`)
      .replace(`&lt;fname&gt;`, `<span>&lt;fname&gt;</span>`)
      .replace(`&lt;lname&gt;`, `<span>&lt;lname&gt;</span>`)
      .replace(`&lt;name&gt;`, `<span>&lt;name&gt;</span>`)
      .replace(`&lt;mobile&gt;`, `<span>&lt;mobile&gt;</span>`)
      .replace(`&lt;form&gt;`, `<span>&lt;form&gt;</span>`);
    console.log("###getNativeRange:", getNativeRange());
    const length = newValue.length;
    const index = window.getSelection().baseOffset;
    console.log(document.getElementById("editableRef").selectedIndex);

    console.log(
      "###index",
      window.getSelection(),
      document.getSelection(),
      length,
      window.getSelection().baseOffset,
      index
    );
    console.log(
      "###newValue",
      newValue,
      newValue.slice(0, index - 2),
      newValue.slice(index - 2)
    );
    newValue =
      newValue.slice(0, index - 2) +
      `<span>${fieldSelected}</span>` +
      newValue.slice(index - 2);
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
