import React from "react";
import { Link } from "react-router-dom";


function ShipmentTable({ shipments, onDelete, onUpdateStatus = () => {} }) {
    // 🔥 Dữ liệu mẫu (giống ShipmentCreate)
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

  // 🔥 helper
  const getBranchName = (id) => {
    const b = branches.find((item) => item.id === Number(id));
    return b ? b.branch_name : "Chưa gán";
  };

  const getAgentName = (id) => {
    const a = agents.find((item) => item.id === Number(id));
    return a ? a.name : "Chưa gán";
  };
  return (
    <div className="shipment-table-card">
      <table className="shipment-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Mã tracking</th>
            <th>Người gửi</th>
            <th>Người nhận</th>
            <th>Loại hàng</th>
            <th>Khối lượng</th>
            <th>Phí</th>
            <th>Ngày giao</th>
            <th>Chi nhánh</th>
            <th>Agent</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
            
          </tr>
        </thead>

        <tbody>
          {shipments.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td className="tracking-code">{item.tracking_code}</td>
              <td>{item.sender_name}</td>
              <td>{item.receiver_name}</td>
              <td>{item.service_type}</td>
              <td>{item.weight} kg</td>
              <td>{Number(item.fee).toLocaleString()} VNĐ</td>
              <td>{item.delivery_date}</td>
              {/* 🔥 THÊM */}
              <td className="branch-name">{getBranchName(item.branch_id)}</td>
              <td className="agent-name">{getAgentName(item.agent_id)}</td>
              <td>
                <select
                  className={`status-select ${item.status.toLowerCase().replaceAll(" ", "-")}`}
                  value={item.status}
                  onChange={(e) => onUpdateStatus(item.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Picked Up">Picked Up</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <Link to={`/shipments/detail/${item.id}`} className="btn-action"> 👁</Link>
                <Link to={`/shipments/edit/${item.id}`} className="btn-action">✏️</Link>
                <button className="btn-action delete" onClick={() => onDelete(item.id)}>🗑</button>
              </td>
              
            </tr>
          ))}

          {shipments.length === 0 && (
            <tr>
              <td colSpan="10" className="empty-data">
                Không có đơn hàng phù hợp
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ShipmentTable;