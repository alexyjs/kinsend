import React from "react";

import "./styles.less";

const SideBarUpdate = () => {
  return (
    <div className="SideBarUpdate">
      <div>SideBarUpdate</div>
      <div className="SideBarUpdate-list">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            className="SideBarUpdate-item"
            key={`sidebar-update-item-${item}`}
          >
            <h3 className="text-ellipsis overflow-hidden truncate">
              lorem Symone Humphrey lorem lorem Symone Humphrey lorem
            </h3>
            <span>Sent Oct 24,2020,11:32p. to ALL CONTACTS</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBarUpdate;
