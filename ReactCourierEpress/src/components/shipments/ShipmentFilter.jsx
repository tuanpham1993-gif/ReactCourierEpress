import React from "react";
import { Link } from "react-router-dom";

function ShipmentFilter({ search, setSearch, status, setStatus }) {
  return (
    <div className="shipment-filter">
      <input
        type="text"
        placeholder="Tìm theo mã tracking, người gửi, người nhận..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Tất cả trạng thái</option>
        <option value="Pending">Pending</option>
        <option value="In Transit">In Transit</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <button className="btn-search">Tìm kiếm</button>
      <Link to="/shipments/create" className="btn-add">+ Thêm đơn hàng</Link>
    </div>
  );
}

export default ShipmentFilter;