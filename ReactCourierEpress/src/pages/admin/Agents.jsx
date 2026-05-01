import React, { useState } from "react";

function Agents() {
  // State lưu từ khóa tìm kiếm agent
  const [search, setSearch] = useState("");

  // State lưu agent đang được chọn để sửa
  // Nếu null nghĩa là đang ở chế độ thêm mới
  const [editingAgent, setEditingAgent] = useState(null);

  // Danh sách chi nhánh mẫu
  // Sau này khi nối API sẽ lấy từ bảng branches trong database
  const branches = [
    { id: 1, branch_name: "Chi nhánh Hà Nội" },
    { id: 2, branch_name: "Chi nhánh Hồ Chí Minh" },
    { id: 3, branch_name: "Chi nhánh Đà Nẵng" },
  ];

  // Danh sách agent mẫu
  // Sau này khi nối API sẽ lấy từ bảng users/agents trong database
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: "Agent Hà Nội 01",
      email: "agenthn01@gmail.com",
      phone: "0912345678",
      branch_id: 1,
      status: "Active",
    },
    {
      id: 2,
      name: "Agent HCM 01",
      email: "agenthcm01@gmail.com",
      phone: "0987654321",
      branch_id: 2,
      status: "Active",
    },
    {
      id: 3,
      name: "Agent Đà Nẵng 01",
      email: "agentdn01@gmail.com",
      phone: "0901122334",
      branch_id: 3,
      status: "Locked",
    },
  ]);

  // State lưu dữ liệu đang nhập trong form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    branch_id: "",
    status: "Active",
  });

  // Hàm lấy tên chi nhánh từ branch_id
  // Vì trong agent chỉ lưu branch_id, nhưng khi hiển thị cần hiện tên chi nhánh
  const getBranchName = (branchId) => {
    const branch = branches.find((item) => item.id === Number(branchId));
    return branch ? branch.branch_name : "Chưa gán";
  };

  // Hàm xử lý khi người dùng nhập dữ liệu vào form
  // name trong input phải trùng với key trong formData
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Hàm reset form về trạng thái ban đầu
  // Dùng sau khi thêm/sửa thành công hoặc khi bấm Hủy
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      branch_id: "",
      status: "Active",
    });

    setEditingAgent(null);
  };

  // Hàm xử lý thêm mới hoặc cập nhật agent
  const handleSubmit = (e) => {
    e.preventDefault();

    // Nếu editingAgent có dữ liệu => đang sửa agent
    if (editingAgent) {
      const updatedAgents = agents.map((agent) =>
        agent.id === editingAgent.id
          ? {
              ...agent,
              ...formData,
              branch_id: Number(formData.branch_id),
            }
          : agent
      );

      setAgents(updatedAgents);
      alert("Cập nhật agent thành công!");
    } else {
      // Nếu không có editingAgent => thêm agent mới
      const newAgent = {
        id: Date.now(),
        ...formData,
        branch_id: Number(formData.branch_id),
      };

      setAgents([...agents, newAgent]);
      alert("Thêm agent thành công!");
    }

    resetForm();
  };

  // Hàm đưa dữ liệu agent lên form để sửa
  const handleEdit = (agent) => {
    setEditingAgent(agent);

    setFormData({
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      branch_id: agent.branch_id,
      status: agent.status,
    });
  };

  // Hàm khóa hoặc mở khóa agent
  const handleToggleStatus = (id) => {
    // Tìm agent hiện tại theo id
    const currentAgent = agents.find((agent) => agent.id === id);

    if (!currentAgent) return;

    // Kiểm tra agent hiện tại đang bị khóa hay đang hoạt động
    const isLocked = currentAgent.status === "Locked";

    // Hỏi xác nhận trước khi thay đổi trạng thái
    const confirmAction = window.confirm(
      isLocked
        ? "Bạn có muốn MỞ KHÓA Agent này không?"
        : "Bạn có muốn KHÓA Agent này không?"
    );

    // Nếu bấm Cancel thì dừng, không thay đổi gì
    if (!confirmAction) return;

    // Cập nhật trạng thái agent
    const updatedAgents = agents.map((agent) =>
      agent.id === id
        ? {
            ...agent,
            status: isLocked ? "Active" : "Locked",
          }
        : agent
    );

    setAgents(updatedAgents);

    // Thông báo sau khi cập nhật xong
    alert(isLocked ? "Đã mở khóa Agent thành công!" : "Đã khóa Agent thành công!");
  };

  // Hàm xóa agent
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa agent này không?"
    );

    if (confirmDelete) {
      setAgents(agents.filter((agent) => agent.id !== id));
      alert("Xóa agent thành công!");
    }
  };

  // Lọc danh sách agent theo từ khóa tìm kiếm
  // Có thể tìm theo tên, email, số điện thoại, chi nhánh hoặc trạng thái
  const filteredAgents = agents.filter((agent) => {
    const keyword = search.toLowerCase();

    return (
      agent.name.toLowerCase().includes(keyword) ||
      agent.email.toLowerCase().includes(keyword) ||
      agent.phone.toLowerCase().includes(keyword) ||
      getBranchName(agent.branch_id).toLowerCase().includes(keyword) ||
      agent.status.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="agent-page">
      <div className="agent-header">
        <div>
          <h3>Quản lý Agent</h3>
          <p>
            Tạo tài khoản agent theo chi nhánh, cập nhật thông tin và khóa agent
            không hoạt động.
          </p>
        </div>
      </div>

      <div className="agent-grid">
        <div className="agent-form-card">
          <h4>{editingAgent ? "Sửa Agent" : "Thêm Agent"}</h4>

          <form onSubmit={handleSubmit}>
            <div className="agent-form-group">
              <label>Tên Agent</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="VD: Agent Hà Nội 01"
                required
              />
            </div>

            <div className="agent-form-group">
              <label>Email đăng nhập</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="agent@example.com"
                required
              />
            </div>

            <div className="agent-form-group">
              <label>Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                required
              />
            </div>

            <div className="agent-form-group">
              <label>Chi nhánh</label>
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

            <div className="agent-form-group">
              <label>Trạng thái</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Locked">Locked</option>
              </select>
            </div>

            <div className="agent-actions">
              <button type="submit" className="btn-save-agent">
                {editingAgent ? "Cập nhật" : "Thêm Agent"}
              </button>

              {editingAgent && (
                <button
                  type="button"
                  className="btn-cancel-agent"
                  onClick={resetForm}
                >
                  Hủy
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="agent-table-card">
          <div className="agent-table-top">
            <h4>Danh sách Agent</h4>

            <input
              type="text"
              placeholder="Tìm agent, email, chi nhánh..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <table className="agent-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Agent</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Chi nhánh</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {filteredAgents.map((agent, index) => (
                <tr key={agent.id}>
                  <td>{index + 1}</td>
                  <td>{agent.name}</td>
                  <td>{agent.email}</td>
                  <td>{agent.phone}</td>
                  <td>{getBranchName(agent.branch_id)}</td>

                  <td>
                    <span
                      className={`agent-status ${
                        agent.status === "Active" ? "active" : "locked"
                      }`}
                    >
                      {agent.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn-edit-agent"
                      onClick={() => handleEdit(agent)}
                      title="Sửa agent"
                    >
                      ✏️
                    </button>

                    <button
                      className={
                        agent.status === "Active"
                          ? "btn-lock-agent"
                          : "btn-unlock-agent"
                      }
                      onClick={() => handleToggleStatus(agent.id)}
                      title={
                        agent.status === "Active"
                          ? "Khóa agent"
                          : "Mở khóa agent"
                      }
                    >
                      {agent.status === "Active" ? "🔒" : "🔓"}
                    </button>

                    <button
                      className="btn-delete-agent"
                      onClick={() => handleDelete(agent.id)}
                      title="Xóa agent"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}

              {filteredAgents.length === 0 && (
                <tr>
                  <td colSpan="7" className="empty-data">
                    Không có agent phù hợp
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

export default Agents;