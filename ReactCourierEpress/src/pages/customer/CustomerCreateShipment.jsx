import { useState } from "react";

export default function CustomerCreateShipment() {
  const [form, setForm] = useState({
    sender_name: "",
    sender_phone: "",
    sender_address: "",
    receiver_name: "",
    receiver_phone: "",
    receiver_address: "",
    weight: "",
    service: "Standard",
  });

  const [fee, setFee] = useState(0);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);

    // ✅ auto tính phí khi nhập
    if (updated.weight > 0) {
      calculateFee(updated);
    }
  };

  const calculateFee = (data) => {
    let base = 10000;

    if (data.service === "Express") base = 15000;
    if (data.service === "Same Day") base = 20000;

    const result = data.weight * base;
    setFee(result);
  };

  const handleSubmit = () => {
    // ✅ validate
    if (
      !form.sender_name ||
      !form.sender_phone ||
      !form.receiver_name ||
      !form.receiver_phone ||
      !form.weight
    ) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setError("");

    console.log("CREATE SHIPMENT:", form, fee);

    alert("Tạo đơn thành công (UI)");
  };

  return (
    <div style={{ background: "#F9FAFB", minHeight: "100vh", padding: "20px" }}>
      <div className="container-fluid">

        {/* HEADER */}
        <div
          className="mb-4 p-4 shadow-sm"
          style={{ background: "#fff", borderRadius: "10px" }}
        >
          <h5 style={{ color: "#111827" }}>Tạo đơn vận chuyển</h5>
          <p style={{ color: "#6B7280", fontSize: "14px" }}>
            Nhập đầy đủ thông tin để tạo shipment
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {/* NGƯỜI GỬI */}
        <div className="mb-4 p-4 shadow-sm" style={{ background: "#fff", borderRadius: "10px" }}>
          <div className="fw-bold mb-3">Thông tin người gửi</div>

          <div className="row">
            <div className="col-md-4">
              <input
                name="sender_name"
                className="form-control"
                placeholder="Tên"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <input
                name="sender_phone"
                className="form-control"
                placeholder="SĐT"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <input
                name="sender_address"
                className="form-control"
                placeholder="Địa chỉ"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* NGƯỜI NHẬN */}
        <div className="mb-4 p-4 shadow-sm" style={{ background: "#fff", borderRadius: "10px" }}>
          <div className="fw-bold mb-3">Thông tin người nhận</div>

          <div className="row">
            <div className="col-md-4">
              <input
                name="receiver_name"
                className="form-control"
                placeholder="Tên"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <input
                name="receiver_phone"
                className="form-control"
                placeholder="SĐT"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <input
                name="receiver_address"
                className="form-control"
                placeholder="Địa chỉ"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* ĐƠN HÀNG */}
        <div className="mb-4 p-4 shadow-sm" style={{ background: "#fff", borderRadius: "10px" }}>
          <div className="fw-bold mb-3">Thông tin đơn</div>

          <div className="row">
            <div className="col-md-4">
              <input
                type="number"
                name="weight"
                className="form-control"
                placeholder="Khối lượng (kg)"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <select
                name="service"
                className="form-control"
                onChange={handleChange}
              >
                <option value="Standard">Thường</option>
                <option value="Express">Nhanh</option>
                <option value="Same Day">Same Day</option>
              </select>
            </div>

            <div className="col-md-4">
              <input
                className="form-control"
                value={fee ? fee.toLocaleString() + " VNĐ" : "Auto"}
                disabled
              />
            </div>
          </div>
        </div>

        {/* ACTION */}
        <div className="text-center">
          <button
            className="btn text-white w-50"
            style={{ background: "#2563EB" }}
            onClick={handleSubmit}
          >
            TẠO ĐƠN
          </button>
        </div>

      </div>
    </div>
  );
}