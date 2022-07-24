import React from "react";
import { format } from "date-fns";
import { truncate } from "lodash";

import "./styles.less";

const SideBarUpdate = ({ data }) => {
  return (
    <div className="SideBarUpdate">
      {/* <div>SideBarUpdate</div> */}
      <div className="SideBarUpdate-list">
        {data?.length
          ? data.map((item) => (
              <div
                className="SideBarUpdate-item"
                key={`sidebar-update-item-${item}`}
              >
                <h3 className="text-ellipsis overflow-hidden truncate">
                  {truncate(item.message, {
                    length: 30,
                    omission: "...",
                  })}
                </h3>
                <span>
                  Sent {format(new Date(item.datetime), "MM/dd/yyyy hh:mm aa")}.
                  to {item.triggerType}
                </span>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default SideBarUpdate;
