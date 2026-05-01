import { useState } from "react";

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState("");
  const [result, setResult] = useState(null);

  // 🔥 MOCK DATA (sau này thay bằng API)
  const mockData = {
    TRK001: {
      sender: "Nguyễn Văn A",
      receiver: "Trần Văn B",
      status: "In Transit",
    },
    TRK002: {
      sender: "Lê Thị C",
      receiver: "Phạm Văn D",
      status: "Delivered",
    },
  };

  const handleSearch = () => {
    if (!trackingCode) {
      return alert("Nhập mã vận đơn");
    }

    const data = mockData[trackingCode.toUpperCase()];

    if (!data) {
      return alert("Không tìm thấy đơn");
    }

    setResult(data);
  };

  return (
    <div style={{ background: "#F9FAFB", minHeight: "100vh", padding: "20px" }}>
      <div className="container-fluid shadow" style={{ background: "#fff", padding: "20px" }}>

        {/* HEADER */}
        <div style={{ borderBottom: "3px solid #000", marginBottom: "30px", textAlign: "center" }}>
          <h4 style={{ color: "#111827" }}>TRA CỨU ĐƠN HÀNG</h4>
          <p style={{ color: "#6B7280" }}>
            Nhập mã vận đơn để xem trạng thái giao hàng
          </p>
        </div>

        {/* INPUT */}
        <div className="mb-4 p-3" style={{ border: "2px solid #000" }}>
          <div className="row">
            <div className="col-md-9">
              <input
                className="form-control"
                placeholder="Nhập mã vận đơn (Tracking Code)"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <button
                className="btn w-100 text-white"
                style={{ background: "#2563EB" }}
                onClick={handleSearch}
              >
                Tra cứu
              </button>
            </div>
          </div>
        </div>

        {/* RESULT */}
        <div className="mb-4 p-3" style={{ border: "2px solid #000" }}>
          <h6>Thông tin đơn hàng</h6>

          {result ? (
            <>
              <p><strong>Mã đơn:</strong> {trackingCode.toUpperCase()}</p>
              <p><strong>Người gửi:</strong> {result.sender}</p>
              <p><strong>Người nhận:</strong> {result.receiver}</p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                <span style={{ color: "#F59E0B", fontWeight: "bold" }}>
                  {result.status}
                </span>
              </p>
            </>
          ) : (
            <p style={{ color: "#6B7280" }}>Chưa có dữ liệu</p>
          )}
        </div>

        {/* NEWS */}
        <div className="mb-4 p-3" style={{ border: "2px solid #000" }}>
          <h6>Tin tức</h6>

          <div className="row">
            <div className="col-md-4">
              <h6>Khuyến mãi tháng 4</h6>
              <p className="small">Giảm 20% phí vận chuyển toàn quốc</p>
            </div>

            <div className="col-md-4">
              <h6>Mở rộng tuyến giao</h6>
              <p className="small">Thêm nhiều khu vực giao hàng nhanh</p>
            </div>

            <div className="col-md-4">
              <h6>Cập nhật hệ thống</h6>
              <p className="small">Tracking chính xác hơn theo thời gian thực</p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center mt-5 pt-4" style={{ borderTop: "2px solid #000" }}>
          <small>© 2026 CourierXpress System</small>
        </div>

      </div>
    </div>
  );
}