import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      return alert("Link không hợp lệ hoặc đã hết hạn");
    }

    if (!form.password) {
      return alert("Nhập mật khẩu");
    }

    if (form.password.length < 6) {
      return alert("Mật khẩu phải >= 6 ký tự");
    }

    if (form.password !== form.confirmPassword) {
      return alert("Mật khẩu không khớp");
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:8000/api/reset-password", {
        token,
        password: form.password,
      });

      alert(res.data.message);

      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Lỗi reset mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#F9FAFB", minHeight: "100vh" }}>
      <div className="container py-5">
        <div className="row justify-content-center align-items-center">

          <div className="col-md-5">

            <form onSubmit={handleSubmit}>

              <h4 className="text-center fw-bold mb-3">
                Đặt lại mật khẩu
              </h4>

              <p className="text-center mb-4" style={{ fontSize: "14px" }}>
                Nhập mật khẩu mới của bạn
              </p>

              <input
                name="password"
                type="password"
                className="form-control mb-3"
                placeholder="Mật khẩu mới"
                value={form.password}
                onChange={handleChange}
              />

              <input
                name="confirmPassword"
                type="password"
                className="form-control mb-3"
                placeholder="Xác nhận mật khẩu"
                value={form.confirmPassword}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="btn w-100"
                disabled={loading}
                style={{
                  background: "#2563EB",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
              </button>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
}