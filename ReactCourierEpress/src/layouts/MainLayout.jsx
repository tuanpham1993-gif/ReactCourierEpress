import { Outlet } from "react-router-dom";
import Navbar from "../../../ReactCourierEpress/src/components/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}