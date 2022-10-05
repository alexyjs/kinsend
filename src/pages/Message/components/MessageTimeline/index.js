import React, { useEffect, useRef } from "react";
import classnames from "classnames";
import { format } from "date-fns";

import "./styles.less";

const MessageTimeline = ({ data, className }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);
  console.log("####MessageTimeline", data);
  return (
    <div className={classnames("MessageTimeline", className)}>
      {data?.map((item) => (
        <div
          className={classnames("MessageTimeline-item", {
            "MessageTimeline-isSubscriberMessage": item?.isSubscriberMessage,
          })}
          key={`MessageTimeline-${item.id}`}
        >
          <div className="MessageTimeline-item-content mb-5 mt-3 text-white flex-col flex">
            <span className="bg-primary p-3 rounded	">
              {item?.content}
              <a
                href={item?.fileAttached}
                target="_blank"
                className="block underline"
              >
                {item?.fileAttached}
              </a>
            </span>
            <span className="text-black">
              {format(new Date(item?.dateSent), "MMM dd, hh:mm aa")} with{" "}
              {item?.phoneNumberSent}
            </span>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageTimeline;
