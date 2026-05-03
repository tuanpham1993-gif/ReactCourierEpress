import React from "react";

function TrackingTimeline({ trackingList }) {
  if (!trackingList || trackingList.length === 0) {
    return (
      <div className="empty-tracking">
        Chưa có lịch sử tracking hoặc không tìm thấy mã đơn hàng.
      </div>
    );
  }

  return (
    <div className="tracking-timeline">
      {trackingList.map((item, index) => (
        <div className="timeline-item" key={index}>
          <div className="timeline-dot"></div>

          <div className="timeline-content">
            <h5>{item.status}</h5>
            <p>{item.note}</p>
            <span>{item.created_at}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrackingTimeline;