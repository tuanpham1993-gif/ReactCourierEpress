import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { useEffect } from "react";
import { getProfile } from "../../services/authService";
export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      return alert("Nhập đầy đủ thông tin");
    }

    try {
      const res = await login(form); // gọi hàm login từ authService với form làm tham số

      const user = res.data.user;// lấy thông tin user từ response trả về sau khi đăng nhập thành công 
      const token = res.data.token;// lấy token từ response trả về sau khi đăng nhập thành công

      localStorage.setItem("user", JSON.stringify(user));// lưu thông tin user vào localStorage với key tên user và giá trị là chuỗi JSON của user
      localStorage.setItem("token", token);// lưu token vào localStorage với key tên token và giá trị là token

      alert("Đăng nhập thành công");

      if (user.role_id === 1) {
        window.location.href = "/admin/dashboard";
      } else if (user.role_id === 3) {
        window.location.href = "/customer/dashboard";
      } else {
        alert("Không có quyền truy cập");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Lỗi login");
    }
  };

  return (
    <div style={{ background: "#F9FAFB", minHeight: "100vh" }}>
      <div className="container py-5">
        <div className="row align-items-center justify-content-center">

          {/* FORM */}
          <div className="col-md-6 d-flex justify-content-center">
            <form
              onSubmit={handleSubmit}
              style={{ width: "100%", maxWidth: "380px" }}
            >
              <h4 className="text-center fw-bold mb-4">
                Đăng nhập
              </h4>

              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="form-control mb-3"
                placeholder="Username"
              />

              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="form-control mb-3"
                placeholder="Mật khẩu"
              />

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
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>

              <div className="text-center">
                <Link
                  to="/forgot-password"
                  style={{ fontSize: "13px" }}
                >
                  Quên mật khẩu?
                </Link>

                <div className="mt-2">
                  <Link to="/register">
                    Chưa có tài khoản? Đăng ký
                  </Link>
                </div>
              </div>
            </form>
          </div>

          {/* BANNER */}
          <div className="col-md-6 text-center">
            <div
              style={{
                height: "320px",
                background: "#E5E7EB",
                borderRadius: "10px",
              }}
            >
              LOGIN IMAGE / BANNER
            </div>

            <h5 className="mt-3">
              CourierXpress System
            </h5>

            <p style={{ fontSize: "14px" }}>
              Đăng nhập để quản lý đơn hàng và theo dõi vận đơn
            </p>

            <div style={{ color: "#F59E0B", fontWeight: "bold" }}>
              Nhanh • Bảo mật • Chính xác
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}