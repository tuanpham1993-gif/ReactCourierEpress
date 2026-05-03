import { useState } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Đơn hàng TRK001 đã được tạo",
      message: "Đơn hàng của bạn đã được hệ thống ghi nhận",
      time: "20/04/2026 - 10:00",
      isRead: false,
    },
    {
      id: 2,
      title: "Đơn hàng TRK001 đang vận chuyển",
      message: "Đơn hàng đang được giao đến người nhận",
      time: "21/04/2026 - 14:30",
      isRead: false,
    },
    {
      id: 3,
      title: "Đơn hàng TRK002 đã giao thành công",
      message: "Người nhận đã nhận hàng",
      time: "18/04/2026 - 16:00",
      isRead: true,
    },
  ]);

  //  Đánh dấu đã đọc
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((item) =>
        item.id === id ? { ...item, isRead: true } : item
      )
    );
  };

  return (
    <div style={{ background: "#F9FAFB", minHeight: "100vh", padding: "20px" }}>
      <div className="container-fluid">

        {/* HEADER */}
        <div
          className="mb-4 p-4 shadow-sm"
          style={{ background: "#fff", borderRadius: "10px" }}
        >
          <h5 style={{ color: "#111827" }}>Notifications</h5>
          <p style={{ color: "#6B7280", fontSize: "14px" }}>
            Danh sách thông báo liên quan đến đơn hàng của bạn
          </p>
        </div>

        {/* LIST */}
        <div
          className="p-4 shadow-sm"
          style={{ background: "#fff", borderRadius: "10px" }}
        >
          {notifications.map((item) => (
            <div
              key={item.id}
              className="mb-3 p-3"
              style={{
                borderRadius: "8px",
                background: item.isRead ? "#F3F4F6" : "#EFF6FF",
                borderLeft: `5px solid ${
                  item.isRead ? "#9CA3AF" : "#2563EB"
                }`,
                cursor: "pointer",
              }}
              onClick={() => markAsRead(item.id)}
            >
              <strong style={{ color: "#111827" }}>
                {item.title}
              </strong>

              <p className="mb-1" style={{ color: "#6B7280" }}>
                {item.message}
              </p>

              <span style={{ fontSize: "13px", color: "#9CA3AF" }}>
                {item.time}
              </span>
            </div>
          ))}

          {notifications.length === 0 && (
            <p className="text-center" style={{ color: "#6B7280" }}>
              Không có thông báo nào
            </p>
          )}
        </div>

      </div>
    </div>
  );
}