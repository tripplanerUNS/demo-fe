import React from "react";
import TopbarNew from "../Component/TopbarNew";
import SidebarNew from "../Component/SidebarNew";

function DashboardNew() {
  return (
    <div className="wrap-dashboard">
      <TopbarNew />
      <div className="sidebar-new">
        <SidebarNew />
      </div>
      <div className="wrap-dahsboard-content"></div>
    </div>
  );
}

export default DashboardNew;
