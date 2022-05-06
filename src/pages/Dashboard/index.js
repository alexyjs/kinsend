import _ from "lodash";
import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import { AccountSetupModal, SelectNumberModal } from "../components";
import { useModal } from "../hook/useModal";

const Dashboard = () => {
  // let navigate = useNavigate();
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
    // navigate('/dashboard');
  };

  const handleOkPhoneModal = () => {};

  const handleCancelPhoneModal = () => {
    closePhoneNumber();
    showAccountModal();
  };

  useEffect(() => {
    showAccountModal();
  }, []);

  return (
    <div>
      <h1 className="py-4 text-center text-5xl">Dashboard</h1>
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
    </div>
  );
};

export default Dashboard;
