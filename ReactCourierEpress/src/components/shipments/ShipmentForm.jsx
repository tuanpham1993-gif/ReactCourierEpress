import React from "react";
import { useNavigate } from "react-router-dom";

function ShipmentForm({
  formData,
  setFormData,
  onSubmit,
  buttonText,
  branches = [], // Danh sách chi nhánh truyền từ ShipmentCreate / ShipmentEdit
  agents = [],   // Danh sách agent truyền từ ShipmentCreate / ShipmentEdit
}) {
  const navigate = useNavigate();

  // Bấm Hủy thì quay về trang danh sách shipment
  const handleCancel = () => {
    navigate("/shipments");
  };

  // Xử lý thay đổi dữ liệu trong input/select
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Nếu đổi chi nhánh thì reset agent_id để tránh agent cũ không thuộc chi nhánh mới
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

  // Chỉ hiển thị agent thuộc chi nhánh đang chọn
  const filteredAgents = agents.filter(
    (agent) => Number(agent.branch_id) === Number(formData.branch_id)
  );

  return (
    <form className="shipment-form" onSubmit={onSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>Mã tracking</label>
          <input
            type="text"
            name="tracking_code"
            value={formData.tracking_code}
            onChange={handleChange}
            placeholder="VD: TRK001"
            required
          />
        </div>

        <div className="form-group">
          <label>Người gửi</label>
          <input
            type="text"
            name="sender_name"
            value={formData.sender_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Người nhận</label>
          <input
            type="text"
            name="receiver_name"
            value={formData.receiver_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Loại hàng</label>
          <select
            name="service_type"
            value={formData.service_type}
            onChange={handleChange}
            required
          >
            <option value="">Chọn loại hàng</option>
            <option value="Standard">Standard</option>
            <option value="Express">Express</option>
            <option value="Same Day">Same Day</option>
          </select>
        </div>

        <div className="form-group">
          <label>Khối lượng</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            step="0.1"
            required
          />
        </div>

        <div className="form-group">
          <label>Phí</label>
          <input
            type="number"
            name="fee"
            value={formData.fee}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ngày giao</label>
          <input
            type="date"
            name="delivery_date"
            value={formData.delivery_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Trạng thái</label>
          <select
            name="status"
            value={formData.status || "Pending"}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Picked Up">Picked Up</option>
            <option value="In Transit">In Transit</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Chọn chi nhánh xử lý đơn hàng */}
        <div className="form-group">
          <label>Chi nhánh</label>
          <select
            name="branch_id"
            value={formData.branch_id || ""}
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

        {/* Chọn agent thuộc chi nhánh đã chọn */}
        <div className="form-group">
          <label>Agent phụ trách</label>
          <select
            name="agent_id"
            value={formData.agent_id || ""}
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
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {buttonText}
        </button>

        <button type="button" className="btn-cancel" onClick={handleCancel}>
          Hủy
        </button>
      </div>
    </form>
  );
}

export default ShipmentForm;