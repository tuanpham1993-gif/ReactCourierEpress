import React, { useState } from "react";
import StatCard from "../../components/dashboard/StatCard";
import ShipmentFilter from "../../components/shipments/ShipmentFilter";
import ShipmentTable from "../../components/shipments/ShipmentTable";

function Dashboard() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const [shipments, setShipments] = useState([
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
      branch_id: 1,
      agent_id: 1,
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
      branch_id: 2,
      agent_id: 3,
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
      branch_id: 1,
      agent_id: 2,
    },

  ]);

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const handleDeleteShipment = (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa đơn hàng này không?"
    );

    if (confirmDelete) {
      const newShipments = shipments.filter((item) => item.id !== id);
      setShipments(newShipments);
      showMessage("Xóa đơn hàng thành công!");
    }
  };

  const handleUpdateStatus = (id, newStatus) => {
    const updatedShipments = shipments.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );

    setShipments(updatedShipments);
    showMessage("Cập nhật trạng thái đơn hàng thành công!");
  };

  const filteredShipments = shipments.filter((item) => {
    const keyword = search.toLowerCase();

    const matchSearch =
      item.tracking_code.toLowerCase().includes(keyword) ||
      item.sender_name.toLowerCase().includes(keyword) ||
      item.receiver_name.toLowerCase().includes(keyword);

    const matchStatus = status === "" || item.status === status;

    return matchSearch && matchStatus;
  });

  const countStatus = (statusName) => {
    return shipments.filter((item) => item.status === statusName).length;
  };

  return (
    <div className="dashboard-page">
      {message && <div className="success-message">{message}</div>}

      <div className="stat-grid">
        <StatCard title="Tổng đơn hàng" value={shipments.length} type="total" />
        <StatCard title="Chờ xử lý" value={countStatus("Pending")} type="pending" />
        <StatCard title="Đang vận chuyển" value={countStatus("In Transit")} type="transit" />
        <StatCard title="Đã giao hàng" value={countStatus("Delivered")} type="delivered" />
        <StatCard title="Đã hủy" value={countStatus("Cancelled")} type="cancelled" />
      </div>

      <ShipmentFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <ShipmentTable
        shipments={filteredShipments}
        onDelete={handleDeleteShipment}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}

export default Dashboard;