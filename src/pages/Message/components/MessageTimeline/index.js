import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { format } from "date-fns";

import "./styles.less";

const MessageTimeline = ({ data }) => {
  console.log("####MessageTimeline", data);
  return (
    <div className="MessageTimeline">
      {data?.map((item) => (
        <div
          className={classnames("MessageTimeline-item", {
            "MessageTimeline-isSubscriberMessage": item?.isSubscriberMessage,
          })}
        >
          <div className="MessageTimeline-item-content mb-5 mt-3 text-white flex-col flex">
            <span className="bg-primary p-3">{item?.content}</span>
            <span className="text-black">
              {format(new Date(item?.dateSent), "MMM dd, hh:mm aa")} with{" "}
              {item?.phoneNumberSent}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageTimeline;
