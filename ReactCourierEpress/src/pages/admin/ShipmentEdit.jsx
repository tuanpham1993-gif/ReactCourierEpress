import React, { useState } from "react";
import ShipmentForm from "../../components/shipments/ShipmentForm";

function ShipmentEdit() {
  const [formData, setFormData] = useState({
    tracking_code: "TRK001",
    sender_name: "Nguyen Van A",
    receiver_name: "Tran Thi B",
    service_type: "Express",
    weight: "2.5",
    fee: "50000",
    delivery_date: "2026-04-28",
  });

  // Hàm submit dùng để cập nhật thông tin đơn hàng
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Dữ liệu sửa shipment:", formData);
    alert("Cập nhật shipment thành công!");
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="form-header">
          <h3>Sửa đơn hàng</h3>
          <p>Cập nhật thông tin shipment.</p>
        </div>

        <ShipmentForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          buttonText="Cập nhật đơn hàng"
        />
      </div>
    </div>
  );
}

export default ShipmentEdit;