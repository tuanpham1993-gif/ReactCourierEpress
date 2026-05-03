import React, { useState } from "react";
import TrackingForm from "../../components/tracking/TrackingForm";
import TrackingTimeline from "../../components/tracking/TrackingTimeline";

function ShipmentTracking() {
  const [selectedCode, setSelectedCode] = useState("");
  const [trackingList, setTrackingList] = useState([]);

  // Dữ liệu tracking mẫu
  const trackingData = {
    TRK001: [
      {
        status: "Pending",
        note: "Đơn hàng đã được tạo.",
        created_at: "2026-04-28 08:00",
      },
      {
        status: "Picked Up",
        note: "Agent đã nhận hàng từ người gửi.",
        created_at: "2026-04-28 10:30",
      },
      {
        status: "In Transit",
        note: "Đơn hàng đang được vận chuyển.",
        created_at: "2026-04-28 14:00",
      },
    ],

    TRK002: [
      {
        status: "Pending",
        note: "Đơn hàng đã được tạo.",
        created_at: "2026-04-29 09:00",
      },
      {
        status: "In Transit",
        note: "Đơn hàng đang vận chuyển.",
        created_at: "2026-04-29 13:00",
      },
    ],

    TRK003: [
      {
        status: "Pending",
        note: "Đơn hàng đã được tạo.",
        created_at: "2026-04-30 08:00",
      },
      {
        status: "Delivered",
        note: "Đơn hàng đã giao thành công.",
        created_at: "2026-04-30 17:00",
      },
    ],
  };

  // Nhận mã tracking từ TrackingForm rồi tìm lịch sử tương ứng
  const handleSearch = (code) => {
    const upperCode = code.toUpperCase();

    setSelectedCode(upperCode);
    setTrackingList(trackingData[upperCode] || []);
  };

  return (
    <div className="tracking-page">
      <div className="tracking-card">
        <div className="tracking-header">
          <div>
            <h3>Shipment Tracking</h3>
            <p>Theo dõi lịch sử trạng thái đơn hàng</p>
          </div>
        </div>

        <TrackingForm onSearch={handleSearch} />

        {selectedCode && (
          <div className="tracking-result-title">
            Mã tracking: <strong>{selectedCode}</strong>
          </div>
        )}

        <TrackingTimeline trackingList={trackingList} />
      </div>
    </div>
  );
}

export default ShipmentTracking;