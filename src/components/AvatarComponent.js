import React from "react";
import { Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";

import { CameraIcon } from "../assets/svg";
import { selectUsers, updateAvatarAsync } from "../redux/userReducer";
import "./AvatarComponent.less";

// TODO: move avatar to common component
const AvatarComponent = () => {
  const { user } = useSelector(selectUsers);
  const dispatch = useDispatch();
  const inputFileRef = React.useRef();

  const onFileChange = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0], event.target.files[0].name);
    dispatch(updateAvatarAsync(formData));
  };

  const onBtnClick = () => {
    inputFileRef.current.click();
  };

  return (
    <div className="avatar-wrap">
      <Avatar src={user?.image || ""} size={186} icon={<UserOutlined />} />
      <input
        className="avatar-input"
        type="file"
        ref={inputFileRef}
        onChangeCapture={onFileChange}
      />
      <div className="icon-camera" onClick={onBtnClick}>
        <CameraIcon />
      </div>
    </div>
  );
};

export default AvatarComponent;
