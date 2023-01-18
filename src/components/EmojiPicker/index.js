import React, { useEffect, useRef } from "react";

import data from "@emoji-mart/data";
import { Picker } from "emoji-mart";

// onEmojiSelect={console.log}
const EmojiPicker = (props) => {
  const ref = useRef();

  useEffect(() => {
    new Picker({ ...props, data, ref });
  }, []);

  return <div className={props.className || ""} ref={ref} />;
};

export default EmojiPicker;
