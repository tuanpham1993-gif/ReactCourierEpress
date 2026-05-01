import { Outlet } from "react-router-dom";
import Sidebar from "../../../ReactCourierEpress/src/components/Sidebar";

export default function CustomerLayout() {
  return (
    <div className="container-fluid">
      <div className="row">

        {/* SIDEBAR */}
        <div className="col-md-3 col-lg-2 p-0">
          <Sidebar />
        </div>

        {/* CONTENT */}
        <div
          className="col-md-9 col-lg-10 p-4"
          style={{ background: "#F9FAFB", minHeight: "100vh" }}
        >
          <Outlet />
        </div>

      </div>
    </div>
  );
}