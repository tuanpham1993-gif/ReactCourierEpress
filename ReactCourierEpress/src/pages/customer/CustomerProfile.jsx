import { useState } from "react";
import { updateProfile, getProfile } from "../../services/authService";
import { useEffect } from "react";
export default function CustomerProfile() {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    getProfile(user.id)
      .then((res) => {
        const u = res.data.user;

        setForm({
          full_name: u.full_name || "",
          email: u.email || "",
          phone: u.phone || "",
          address: u.address || "",
          city: u.city || "",
        });
      })
      .catch((err) => {
        console.log("Load profile error", err);
      });
  }, []);
  const [form, setForm] = useState({
    full_name: "Nguyễn Văn A",
    email: "a@gmail.com",
    phone: "0909xxxxxx",
    address: "TP.HCM",
    city: "TP.HCM",
  });

  const [message, setMessage] = useState("");

  const cities = ["TP.HCM", "Hà Nội", "Đà Nẵng", "Cần Thơ"];

  const shipments = [
    {
      code: "TRK001",
      receiver: "Nguyễn Văn B",
      status: "Delivered",
      date: "20/04/2026",
    },
    {
      code: "TRK002",
      receiver: "Lê Văn C",
      status: "In Transit",
      date: "18/04/2026",
    },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleUpdate = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await updateProfile({
        id: user.id, // lấy động từ user login
        ...form,
      });

      setMessage(res.data.message);

      // update lại localStorage luôn
      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log(res.data.user);
    } catch (err) {
      setMessage("Cập nhật thất bại");
    }
  };

  return (
    <div style={{ background: "#F9FAFB", minHeight: "100vh", padding: "20px" }}>
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4 p-4 shadow-sm" style={{ background: "#fff", borderRadius: "10px" }}>
          <h5 style={{ color: "#111827" }}>Profile</h5>
          <p style={{ color: "#6B7280", fontSize: "14px" }}>
            Quản lý thông tin cá nhân của bạn
          </p>
        </div>

        {/* MESSAGE */}
        {message && <div className="alert alert-info">{message}</div>}

        {/* PROFILE */}
        <div className="mb-4 p-4 shadow-sm" style={{ background: "#fff", borderRadius: "10px" }}>
          <h6>Thông tin cá nhân</h6>

          <div className="row">

            <div className="col-md-6 mb-3">
              <label>Họ tên</label>
              <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Số điện thoại</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Địa chỉ</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* CITY DROPDOWN */}
            <div className="col-md-6 mb-3">
              <label>Thành phố</label>

              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                className="form-select"
              >
                <option value="" disabled>
                  Chọn thành phố
                </option>

                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <button
            className="btn text-white"
            style={{ background: "#2563EB" }}
            onClick={handleUpdate}
          >
            Cập nhật
          </button>
        </div>

        {/* SHIPMENT */}
        <div className="p-4 shadow-sm" style={{ background: "#fff", borderRadius: "10px" }}>
          <h6>Lịch sử đơn hàng</h6>

          <table className="table text-center">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Người nhận</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>

            <tbody>
              {shipments.map((item, index) => (
                <tr key={index}>
                  <td>{item.code}</td>
                  <td>{item.receiver}</td>
                  <td>
                    <span
                      style={{
                        color: item.status === "Delivered" ? "green" : "#F59E0B",
                        fontWeight: "bold",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}