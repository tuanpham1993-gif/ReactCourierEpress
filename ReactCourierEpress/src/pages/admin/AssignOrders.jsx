import React, { useState } from "react";

function AssignOrders() {
  const shipments = [
    {
      id: 1,
      tracking_code: "TRK001",
      sender_name: "Nguyen Van A",
      receiver_name: "Tran Thi B",
      status: "Pending",
    },
    {
      id: 2,
      tracking_code: "TRK002",
      sender_name: "Le Thi C",
      receiver_name: "Pham Van D",
      status: "In Transit",
    },
    {
      id: 3,
      tracking_code: "TRK003",
      sender_name: "Hoang Van E",
      receiver_name: "Nguyen Van F",
      status: "Delivered",
    },
  ];

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

  const [formData, setFormData] = useState({
    shipment_id: "",
    branch_id: "",
    agent_id: "",
  });

  const [assignments, setAssignments] = useState([]);

  // Lọc agent theo chi nhánh đã chọn
  const filteredAgents = agents.filter(
    (agent) => Number(agent.branch_id) === Number(formData.branch_id)
  );

  const getShipment = (id) => {
    return shipments.find((item) => item.id === Number(id));
  };

  const getBranch = (id) => {
    return branches.find((item) => item.id === Number(id));
  };

  const getAgent = (id) => {
    return agents.find((item) => item.id === Number(id));
  };

  // Xử lý khi chọn shipment / branch / agent
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Nếu đổi branch thì reset agent để tránh chọn sai agent thuộc branch cũ
    if (name === "branch_id") {
      setFormData({
        ...formData,
        branch_id: value,
        agent_id: "",
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Bấm gán đơn
  const handleAssign = (e) => {
    e.preventDefault();

    const selectedShipment = getShipment(formData.shipment_id);
    const selectedBranch = getBranch(formData.branch_id);
    const selectedAgent = getAgent(formData.agent_id);

    if (!selectedShipment || !selectedBranch || !selectedAgent) {
      alert("Vui lòng chọn đầy đủ shipment, chi nhánh và agent.");
      return;
    }

    const newAssignment = {
      id: Date.now(),
      shipment_id: selectedShipment.id,
      tracking_code: selectedShipment.tracking_code,
      branch_id: selectedBranch.id,
      branch_name: selectedBranch.branch_name,
      agent_id: selectedAgent.id,
      agent_name: selectedAgent.name,
      assigned_at: new Date().toLocaleString("vi-VN"),
    };

    setAssignments([...assignments, newAssignment]);

    alert("Gán đơn hàng thành công!");

    setFormData({
      shipment_id: "",
      branch_id: "",
      agent_id: "",
    });
  };

  const handleDeleteAssignment = (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn hủy phân công này không?");

    if (confirmDelete) {
      setAssignments(assignments.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="assign-page">
      <div className="assign-header">
        <h3>Gán đơn hàng</h3>
        <p>Phân công shipment cho chi nhánh và agent xử lý.</p>
      </div>

      <div className="assign-grid">
        <div className="assign-form-card">
          <h4>Thông tin phân công</h4>

          <form onSubmit={handleAssign}>
            <div className="assign-form-group">
              <label>Chọn đơn hàng</label>
              <select
                name="shipment_id"
                value={formData.shipment_id}
                onChange={handleChange}
                required
              >
                <option value="">-- Chọn shipment --</option>
                {shipments.map((shipment) => (
                  <option key={shipment.id} value={shipment.id}>
                    {shipment.tracking_code} - {shipment.sender_name} →{" "}
                    {shipment.receiver_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="assign-form-group">
              <label>Chọn chi nhánh</label>
              <select
                name="branch_id"
                value={formData.branch_id}
                onChange={handleChange}
                required
              >
                <option value="">-- Chọn chi nhánh --</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.branch_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="assign-form-group">
              <label>Chọn agent</label>
              <select
                name="agent_id"
                value={formData.agent_id}
                onChange={handleChange}
                required
                disabled={!formData.branch_id}
              >
                <option value="">
                  {formData.branch_id
                    ? "-- Chọn agent --"
                    : "Chọn chi nhánh trước"}
                </option>

                {filteredAgents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-assign">
              Gán đơn hàng
            </button>
          </form>
        </div>

        <div className="assign-table-card">
          <h4>Danh sách đơn đã gán</h4>

          <table className="assign-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Mã tracking</th>
                <th>Chi nhánh</th>
                <th>Agent</th>
                <th>Thời gian gán</th>
                <th>Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {assignments.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="tracking-code">{item.tracking_code}</td>
                  <td>{item.branch_name}</td>
                  <td>{item.agent_name}</td>
                  <td>{item.assigned_at}</td>
                  <td>
                    <button
                      className="btn-delete-assign"
                      onClick={() => handleDeleteAssignment(item.id)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}

              {assignments.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-data">
                    Chưa có đơn hàng nào được gán.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AssignOrders;