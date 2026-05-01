import React, { useState } from "react";
import ShipmentForm from "../../components/shipments/ShipmentForm";

function ShipmentCreate() {
  const [formData, setFormData] = useState({
    tracking_code: "",
    sender_name: "",
    receiver_name: "",
    service_type: "",
    weight: "",
    fee: "",
    delivery_date: "",
    branch_id: "",
    agent_id: "",
  });

  // Dữ liệu giả cho branches và agents, trong thực tế sẽ lấy từ API
  const branches = [
    { id: 1, branch_name: "Chi nhánh Hà Nội" },
    { id: 2, branch_name: "Chi nhánh Hồ Chí Minh" },
    { id: 3, branch_name: "Chi nhánh Đà Nẵng" },
  ];

  const agents = [
    { id: 1, name: "Agent Hà Nội 01", branch_id: 1 },
    { id: 2, name: "Agent Hà Nội 02", branch_id: 1 },
    { id: 3, name: "Agent HCM 01", branch_id: 2 },
    { id: 4, name: "Agent Đà Nẵng 01", branch_id: 3 },
  ];

  // Hàm submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Dữ liệu thêm shipment:", formData);
    alert("Thêm shipment thành công!");

    setFormData({
      tracking_code: "",
      sender_name: "",
      receiver_name: "",
      service_type: "",
      weight: "",
      fee: "",
      delivery_date: "",
      branch_id: "",
      agent_id: "",
    });
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="form-header">
          <h3>Thêm đơn hàng</h3>
          <p>Nhập thông tin shipment theo đúng yêu cầu đề bài.</p>
        </div>

        <ShipmentForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          buttonText="Thêm đơn hàng"
          branches={branches}   
          agents={agents}       
        />
      </div>
    </div>
  );
}

export default ShipmentCreate;