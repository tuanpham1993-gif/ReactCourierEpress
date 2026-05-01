import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const [trackingCode, setTrackingCode] = useState("");
  const [weight, setWeight] = useState("");
  const [fee, setFee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleTrack = () => {
    if (!trackingCode) return alert("Nhập mã vận đơn");

    navigate(`/tracking?code=${trackingCode}`);
  };
  const calculateFee = () => {
    if (!weight || Number(weight) <= 0) {
      return alert("Khối lượng phải > 0");
    }

    const result = Number(weight) * 1000; // bạn tự chỉnh giá
    setFee(result);
    setShowModal(true);
  };
  const handleOrder = () => {
    navigate("/order");
  };


  return (
    <div style={{ background: "#F9FAFB", minHeight: "100vh" }}>
      <div className="container-fluid py-4" >

        {/* HERO */}
        <div
          className="text-center p-5 mb-4 rounded"
          style={{ background: "#2563EB", color: "white" }}
        >
          <h3 className="fw-bold">Fast delivery - Easy tracking</h3>
          <p style={{ color: "#E5E7EB" }}>
            Giao hàng nhanh chóng, theo dõi dễ dàng
          </p>

          <button
            className="btn mt-3"
            style={{ background: "#F59E0B", color: "white" }}
            onClick={handleOrder}
          >
            Tạo đơn ngay
          </button> 
        </div>

        {/* TRACKING */}
        <div className="card shadow-sm p-4 mb-4 border-0"
          style={{
            backgroundImage: "url('/images/your-image.jpg')",// đường dẫn hình nền
            backgroundSize: "cover", // đảm bảo hình nền phủ đầy
            backgroundPosition: "center",// vị trí hình nền ở giữa
          }}
        >

          <h5 className="fw-bold mb-3">Tra cứu đơn hàng</h5>

          <div className="row">
            <div className="col-md-4">
              <input
                className="form-control mb-2"
                placeholder="Nhập mã vận đơn"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
              />

              <button
                className="btn w-100 text-white"
                style={{ background: "#1E40AF" }}
                onClick={handleTrack}
              >
                Tra cứu
              </button>
            </div>

            <div className="col-md-8 d-flex align-items-center justify-content-center text-muted">
              Kết quả tracking sẽ hiển thị ở trang riêng
            </div>
          </div>
        </div>

        {/* COST */}
        <div className="card shadow-sm p-4 mb-4 border-0">
          <h5 className="fw-bold mb-3">Ước tính cước phí</h5>

          <div className="row g-2">
            <div className="col-md-3">
              <select className="form-select">
                <option value="">Chọn nơi gửi</option>
                <option>Hà Nội</option>
                <option>TP.HCM</option>
                <option>Đà Nẵng</option>
                <option>Cần Thơ</option>
              </select>
            </div>

            <div className="col-md-3">
              <select className="form-select">
                <option value="">Chọn nơi nhận</option>
                <option>Hà Nội</option>
                <option>TP.HCM</option>
                <option>Đà Nẵng</option>
                <option>Cần Thơ</option>
              </select>
            </div>

            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Khối lượng (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className="col-md-3 d-flex gap-2">
              <button
                className="btn w-50 text-white"
                style={{ background: "#F59E0B" }}
                onClick={calculateFee}
              >
                Tính phí
              </button>

              <button
                className="btn w-50 text-white"
                style={{ background: "#2563EB" }}
                onClick={handleOrder}
              >
                Order
              </button>
            </div>
          </div>
        </div>

        {/* MODAL HIỂN THỊ PHÍ */}
        {showModal && (// nếu showModal = true tức là phải bấm nút tính phí thì mới hiển thị modal ở hàm calculateFee
          <div
            className="modal fade show"
            style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Kết quả tính phí</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body text-center">
                  <h4 className="text-success">
                    {fee?.toLocaleString()} VND
                  </h4>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Đóng
                  </button>

                  <button
                    className="btn btn-primary"
                    onClick={handleOrder}
                  >
                    Đặt đơn ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FEATURES */}
        <div className="row text-center mb-4">
          <div className="col-md-4">
            <div className="card p-4 shadow-sm border-0">
              <h6 className="fw-bold">order</h6>
              <button
                className="btn mt-2 text-white"
                style={{ background: "#2563EB" }}
                onClick={handleOrder}
              >
                khám phá ngay
              </button>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 shadow-sm border-0">
              <h6 className="fw-bold">tracking</h6>
              <button
                className="btn mt-2 text-white"
                style={{ background: "#1E40AF" }}
                onClick={handleTrack}
              >
                Khám phá ngay
              </button>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 shadow-sm border-0">
              <h6 className="fw-bold">Loại Dịch Vụ</h6>
              <button
                className="btn mt-2 text-white"
                style={{ background: "#111827" }}
              >
                khám phá ngay
              </button>
            </div>
          </div>
        </div>

        {/* NEWS */}
        <div className="card p-4 shadow-sm border-0 mb-4">
          <h5 className="fw-bold mb-3">Tin tức</h5>

          <div className="row">
            <div className="col-md-4">
              <div className="p-4 bg-white border rounded">Tin 1</div>
            </div>

            <div className="col-md-4">
              <div className="p-4 bg-white border rounded">Tin 2</div>
            </div>

            <div className="col-md-4">
              <div className="p-4 bg-white border rounded">Tin 3</div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center mt-4 text-muted">
          © 2026 CourierXpress System
        </div>

      </div>
    </div>
  );
}