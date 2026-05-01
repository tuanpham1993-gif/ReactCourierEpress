import React, { useState, useRef, useEffect } from "react";

function Header() {
  const [showNoti, setShowNoti] = useState(false);
  const notiRef = useRef();

  // Click ngoài để đóng
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notiRef.current && !notiRef.current.contains(e.target)) {
        setShowNoti(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    "Đơn hàng TRK001 đã tạo",
    "Đơn hàng TRK002 đang vận chuyển",
    "Đơn hàng TRK003 đã giao",
  ];

  return (
    <header className="top-header">
      
      {/* LEFT */}
      <div className="header-left">
        <h2>Dashboard Shipment</h2>
        <p>Quản lý tổng quan đơn hàng CourierXpress</p>
      </div>

      {/* RIGHT */}
      <div className="header-right">

        {/* DATE */}
        <div className="date-box">
          <span className="calendar-icon">📅</span>
          <input type="date" className="date-input" />
        </div>

        {/* NOTIFICATION */}
        <div className="notification-wrapper" ref={notiRef}>
          <button
            className="notification-btn"
            onClick={() => setShowNoti(!showNoti)}
          >
            🔔
            <span className="notification-dot"></span>
          </button>

          {showNoti && (
            <div className="notification-dropdown">
              <h4>Thông báo</h4>

              {notifications.map((item, index) => (
                <div key={index} className="notification-item">
                  {item}
                </div>
              ))}

              {notifications.length === 0 && (
                <p className="empty-noti">Không có thông báo</p>
              )}
            </div>
          )}
        </div>

        {/* ADMIN */}
        <div className="admin-account">
          <span className="admin-avatar">👤</span>
          <div>
            <strong>Admin</strong>
            <p>Quản trị viên</p>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Header;