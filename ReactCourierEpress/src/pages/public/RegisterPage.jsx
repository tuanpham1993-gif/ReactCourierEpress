import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    full_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATE
    if (!form.username || !form.email || !form.password) {
      return alert("Nhập đầy đủ thông tin bắt buộc");
    }

    if (form.password !== form.confirmPassword) {
      return alert("Mật khẩu không khớp");
    }

    if (form.password.length < 6) {
      return alert("Mật khẩu phải >= 6 ký tự");
    }

    const data = {
      username: form.username,
      full_name: form.full_name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      city: form.city,
      password: form.password,
    };

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/register",
        data
      );

      alert("Đăng ký thành công!");

      // LƯU USER VÀO LOCALSTORAGE
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // CHUYỂN HƯỚNG ĐẾN TRANG LOGIN
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Lỗi đăng ký");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#F9FAFB", minHeight: "100vh" }}>
      <div className="container py-5">
        <div className="row align-items-center">

          {/* FORM */}
          <div className="col-md-6 d-flex justify-content-center">
            <form
              onSubmit={handleSubmit}
              style={{ width: "100%", maxWidth: "420px" }}
            >
              <h4 className="text-center fw-bold mb-4">
                Đăng ký
              </h4>

              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="form-control mb-3"
                placeholder="Username *"
              />

              <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                className="form-control mb-3"
                placeholder="Họ tên"
              />

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="form-control mb-3"
                placeholder="Email *"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="form-control mb-3"
                placeholder="Số điện thoại"
              />

              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="form-control mb-3"
                placeholder="Mật khẩu *"
              />

              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="form-control mb-3"
                placeholder="Xác nhận mật khẩu *"
              />

              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="form-control mb-3"
                placeholder="Địa chỉ"
              />

              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                className="form-select mb-3"
              >
                <option value="">Chọn thành phố</option>
                <option value="TP.HCM">TP.HCM</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Cần Thơ">Cần Thơ</option>
              </select>

              <button
                type="submit"
                className="btn w-100 mb-3"
                disabled={loading}
                style={{
                  background: "#2563EB",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                {loading ? "Đang xử lý..." : "Đăng ký"}
              </button>

              <div className="text-center">
                <Link to="/login">
                  Đã có tài khoản? Đăng nhập
                </Link>
              </div>
            </form>
          </div>

          {/* BANNER */}
          <div className="col-md-6 text-center">
            <div
              style={{
                height: "300px",
                background: "#E5E7EB",
                borderRadius: "8px",
              }}
            >
              CHÈN ẢNH
            </div>

            <h5 className="mt-3">Tham gia CourierXpress</h5>
            <p>Tạo tài khoản để gửi hàng dễ dàng</p>
          </div>

        </div>
      </div>
    </div>
  );
}