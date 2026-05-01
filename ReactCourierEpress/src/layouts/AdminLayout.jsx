import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="main-area">
        <Header />

        <section className="content-area">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default AdminLayout;