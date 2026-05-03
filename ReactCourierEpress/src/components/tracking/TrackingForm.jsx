import React, { useState } from "react";

function TrackingForm({ onSearch }) {
  const [trackingCode, setTrackingCode] = useState("");

  // Xử lý khi bấm nút tìm kiếm
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!trackingCode.trim()) {
      alert("Vui lòng nhập mã tracking!");
      return;
    }

    onSearch(trackingCode.trim().toUpperCase());
  };

  return (
    <form className="tracking-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={trackingCode}
        onChange={(e) => setTrackingCode(e.target.value)}
        placeholder="Nhập mã tracking, ví dụ: TRK001"
      />

      <button type="submit">Tìm kiếm</button>
    </form>
  );
}

export default TrackingForm;