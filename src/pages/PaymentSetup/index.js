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

  const handleOkAccountModal = () => {
    closeAccountModal();
    if (user && !user?.phoneSystem?.length) {
      showPhoneNumber();
    }
  };

  const handleCancelAccountModal = () => {
    closeAccountModal();
    // navigate("/dashboard");
    navigate("/message");
  };

  const handleOkPhoneModal = () => {};

  const handleCancelPhoneModal = () => {
    closePhoneNumber();
    showAccountModal();
  };

  useEffect(() => {
    if (user) {
      if(!user?.isEnabledBuyPlan) {
        showAccountModal();
      } else {
        showPhoneNumber();
      }
    }
  }, [user, showAccountModal]);

  useEffect(() => {
    if (user?.isEnabledBuyPlan && user?.phoneSystem?.length) {
      // navigate("/dashboard");
      navigate("/message");
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
