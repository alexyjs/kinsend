import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { SelectNumberModal, LayoutComponent } from "../../components";
import { useModal } from "../../hook/useModal";
import { selectUsers } from "../../redux/userReducer";

const Message = () => {
  const { user } = useSelector(selectUsers);
  const {
    close: closePhoneNumber,
    show: showPhoneNumber,
    visible: phoneNumberModalVisible,
  } = useModal();

  const handleOkPhoneModal = () => {};

  const handleCancelPhoneModal = () => {
    closePhoneNumber();
  };

  useEffect(() => {
    if (user && !user?.phoneSystem?.length) {
      showPhoneNumber();
    }
  }, user);

  return (
    <LayoutComponent>
      <h1 className="py-4 text-center text-5xl">Message</h1>
      <SelectNumberModal
        handleCancel={handleCancelPhoneModal}
        handleClose={closePhoneNumber}
        handleOk={handleOkPhoneModal}
        visible={phoneNumberModalVisible}
      />
    </LayoutComponent>
  );
};

export default Message;
