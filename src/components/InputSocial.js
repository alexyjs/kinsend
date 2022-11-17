import { Button, Input } from "antd";
import React, { useState, useEffect } from "react";
import { InstagramSVG, TwitterSVG } from "../assets/svg";

const InputSocial = ({ defaultActiveKey = "instagram", ...rest }) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey);

  const handleClick = (activeKey) => () => {
    setActiveKey(activeKey);
  };

  const handleInputClick = (event) => {
    if (!event.target.value.includes("https://")) {
      if (activeKey === "instagram") {
        event.target.value = "https://www.instagram.com/";
      } else if (activeKey === "twitter") {
        event.target.value = "https://www.twitter.com/";
      }
    }
  };

  return (
    <Input
      size="large"
      placeholder={
        activeKey === defaultActiveKey
          ? "https://www.instagram.com/instagram"
          : "https://twitter.com/twitter"
      }
      onClick={handleInputClick}
      {...rest}
      addonBefore={
        <>
          <Button
            key="instagram"
            size="large"
            className="text-center"
            icon={<InstagramSVG isActive={activeKey === "instagram"} />}
            onClick={handleClick("instagram")}
          />
          <Button
            key="twitter"
            size="large"
            className="text-center"
            icon={<TwitterSVG isActive={activeKey === "twitter"} />}
            onClick={handleClick("twitter")}
          />
        </>
      }
    />
  );
};

export default InputSocial;
