import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function ShipmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dữ liệu mẫu, sau này sẽ thay bằng API Laravel
  const shipments = [
    {
      id: 1,
      tracking_code: "TRK001",
      sender_name: "Nguyen Van A",
      receiver_name: "Tran Thi B",
      service_type: "Express",
      weight: 2.5,
      fee: 50000,
      delivery_date: "2026-04-28",
      status: "Pending",
    },
    {
      id: 2,
      tracking_code: "TRK002",
      sender_name: "Le Thi C",
      receiver_name: "Pham Van D",
      service_type: "Standard",
      weight: 3,
      fee: 70000,
      delivery_date: "2026-04-29",
      status: "In Transit",
    },
    {
      id: 3,
      tracking_code: "TRK003",
      sender_name: "Hoang Van E",
      receiver_name: "Nguyen Van F",
      service_type: "Express",
      weight: 1.2,
      fee: 40000,
      delivery_date: "2026-04-30",
      status: "Delivered",
    },
  ];

  const shipment = shipments.find((item) => item.id === Number(id));

  if (!shipment) {
    return (
      <div className="form-card">
        <h3>Không tìm thấy đơn hàng</h3>
        <button className="btn-cancel" onClick={() => navigate("/shipments")}>
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="form-header">
          <h3>Chi tiết đơn hàng</h3>
          <p>Thông tin chi tiết shipment #{shipment.tracking_code}</p>
        </div>

        <div className="detail-grid">
          <div className="detail-item">
            <span>Mã tracking</span>
            <strong>{shipment.tracking_code}</strong>
          </div>

          <div className="detail-item">
            <span>Người gửi</span>
            <strong>{shipment.sender_name}</strong>
          </div>

          <div className="detail-item">
            <span>Người nhận</span>
            <strong>{shipment.receiver_name}</strong>
          </div>

          <div className="detail-item">
            <span>Loại hàng</span>
            <strong>{shipment.service_type}</strong>
          </div>

          <div className="detail-item">
            <span>Khối lượng</span>
            <strong>{shipment.weight} kg</strong>
          </div>

          <div className="detail-item">
            <span>Phí</span>
            <strong>{Number(shipment.fee).toLocaleString()} VNĐ</strong>
          </div>

          <div className="detail-item">
            <span>Ngày giao</span>
            <strong>{shipment.delivery_date}</strong>
          </div>

          <div className="detail-item">
            <span>Trạng thái</span>
            <strong>{shipment.status}</strong>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn-cancel" onClick={() => navigate("/shipments")}>
            Quay lại
          </button>

          <button
            className="btn-submit"
            onClick={() => navigate(`/shipments/edit/${shipment.id}`)}
          >
            Sửa đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShipmentDetail;