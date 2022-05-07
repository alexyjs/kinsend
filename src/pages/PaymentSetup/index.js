import _ from "lodash";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AccountSetupModal, SelectNumberModal } from "../../components";
import { useModal } from "../../hook/useModal";

const PaymentSetup = () => {
  let navigate = useNavigate();
  const {
    close: closePhoneNumber,
    show: showPhoneNumber,
    visible: phoneNumberModalVisible,
  } = useModal();
  const {
    close: closeAccountModal,
    show: showAccountModal,
    visible: visibleAccountModal,
  } = useModal();

  // TODO: refactor. we need to handle by step. we will add these step to array
  const handleOkAccountModal = () => {
    showPhoneNumber();
    closeAccountModal();
  };

  const handleCancelAccountModal = () => {
    closeAccountModal();
    navigate('/dashboard');
  };

  const handleOkPhoneModal = () => {};

  const handleCancelPhoneModal = () => {
    closePhoneNumber();
    showAccountModal();
  };

  useEffect(() => {
    showAccountModal();
  });

  return (
    <>
      <AccountSetupModal
        handleCancel={handleCancelAccountModal}
        handleOk={handleOkAccountModal}
        visible={visibleAccountModal}
      />
      <SelectNumberModal
        handleCancel={handleCancelPhoneModal}
        handleClose={closePhoneNumber}
        handleOk={handleOkPhoneModal}
        visible={phoneNumberModalVisible}
      />
    </>
  );
};

export default PaymentSetup;
