import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return alert("Nhập email");
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:8000/api/forgot-password", {
        email,
      });

      setMessage(res.data.message);

    } catch (err) {
      setMessage(err.response?.data?.message || "Có lỗi xảy ra");
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
                Quên mật khẩu
              </h4>

              <p className="text-center mb-4" style={{ fontSize: "14px" }}>
                Nhập email để nhận link đặt lại mật khẩu
              </p>

              <input
                className="form-control mb-3"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
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
                {loading ? "Đang gửi..." : "Gửi link reset"}
              </button>

              {message && (
                <div className="alert alert-success text-center">
                  {message}
                </div>
              )}

              <div className="text-center">
                <Link to="/login">
                  ← Quay lại đăng nhập
                </Link>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}