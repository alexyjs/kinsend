import React from "react";

import { Button } from "antd";

import "./styles.less";

const Action = ({ Icon, label, value, onClick }) => {
  return (
    <div className="flex flex-col items-center text-center automation-action">
      <Icon />
      <span className="automation-action-label">{label}</span>
      <Button onClick={() => onClick(value)} type="primary">
        Select
      </Button>
    </div>
  );
};

export default Action;
