import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { AccountSetupModal, SelectNumberModal } from "../../components";
import { selectUsers } from "../../redux/userReducer";
import { useModal } from "../../hook/useModal";

const PaymentSetup = () => {
  let navigate = useNavigate();
  const { user } = useSelector(selectUsers);

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
  }, [showAccountModal]);

  useEffect(() => {
    if (user?.isEnabledBuyPlan) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

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
