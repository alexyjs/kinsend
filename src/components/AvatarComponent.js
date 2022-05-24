import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { CameraIcon } from "../assets/svg";
import "./AvatarComponent.less";

const AvatarComponent = ({ onFileChange, imgSrc }) => {
  const inputFileRef = React.useRef();

  const hanldeFileChange = async (event) => {
    onFileChange(event);
  };

  const onBtnClick = () => {
    inputFileRef.current.click();
  };

  return (
    <div className="avatar-wrap">
      <Avatar src={imgSrc || ""} size={186} icon={<UserOutlined />} />
      <input
        className="avatar-input"
        type="file"
        ref={inputFileRef}
        onChangeCapture={hanldeFileChange}
      />
      <div className="icon-camera cursor-pointer" onClick={onBtnClick}>
        <CameraIcon />
      </div>
    </div>
  );
};

export default AvatarComponent;
