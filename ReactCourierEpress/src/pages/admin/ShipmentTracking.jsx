import React, { useState } from "react";

function ShipmentTracking() {
  const [trackingCode, setTrackingCode] = useState("TRK001");

  const trackingData = {
    TRK001: [
      {
        status: "Pending",
        note: "Đơn hàng đã được tạo",
        date: "2026-04-28 08:00",
      },
      {
        status: "Picked Up",
        note: "Agent đã nhận hàng",
        date: "2026-04-28 10:30",
      },
      {
        status: "In Transit",
        note: "Đơn hàng đang được vận chuyển",
        date: "2026-04-28 14:00",
      },
    ],
    TRK002: [
      {
        status: "Pending",
        note: "Đơn hàng đã được tạo",
        date: "2026-04-29 09:00",
      },
      {
        status: "In Transit",
        note: "Đơn hàng đang vận chuyển",
        date: "2026-04-29 13:00",
      },
    ],
  };

  const currentTracking = trackingData[trackingCode] || [];

  return (
    <div className="tracking-page">
      <div className="tracking-card">
        <div className="tracking-header">
          <div>
            <h3>Shipment Tracking</h3>
            <p>Theo dõi lịch sử trạng thái đơn hàng</p>
          </div>
        </div>

        <div className="tracking-search">
          <input
            type="text"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
            placeholder="Nhập mã tracking..."
          />

          <button>Tìm kiếm</button>
        </div>

        <div className="tracking-result">
          <h4>Mã tracking: {trackingCode}</h4>

          {currentTracking.length > 0 ? (
            <div className="timeline">
              {currentTracking.map((item, index) => (
                <div className="timeline-item" key={index}>
                  <div className="timeline-dot"></div>

                  <div className="timeline-content">
                    <h5>{item.status}</h5>
                    <p>{item.note}</p>
                    <span>{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-tracking">
              Không tìm thấy lịch sử tracking cho mã này.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShipmentTracking;