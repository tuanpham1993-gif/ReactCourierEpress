import { useState } from "react";

export default function CustomerTrackShipment() {
  const [trackingCode, setTrackingCode] = useState("");
  const [shipment, setShipment] = useState(null);

  // 🔥 MOCK DATA (sau này thay API)
  const mockData = {
    tracking_code: "TRK001",
    sender: "Nguyễn Văn A",
    receiver: "Trần Văn B",
    status: "In Transit",
    history: [
      { time: "20/04/2026", status: "Đơn hàng đã được tạo" },
      { time: "21/04/2026", status: "Đã lấy hàng" },
      { time: "22/04/2026", status: "Đang vận chuyển" },
      { time: "23/04/2026", status: "Đã giao hàng" },
    ],
  };

  const handleTrack = () => {
    if (!trackingCode) {
      return alert("Nhập mã vận đơn");
    }

    // 👉 sau này call API
    setShipment(mockData);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ background: "#F9FAFB", minHeight: "100vh", padding: "20px" }}>
      <div className="container-fluid">

        {/* HEADER */}
        <div
          className="mb-4 p-4 shadow-sm"
          style={{ background: "#fff", borderRadius: "10px" }}
        >
          <h5 style={{ color: "#111827" }}>Track Shipment</h5>
          <p style={{ color: "#6B7280", fontSize: "14px" }}>
            Nhập mã vận đơn để tra cứu trạng thái
          </p>
        </div>

        {/* INPUT */}
        <div
          className="mb-4 p-4 shadow-sm"
          style={{ background: "#fff", borderRadius: "10px" }}
        >
          <div className="row">
            <div className="col-md-9">
              <input
                className="form-control"
                placeholder="Nhập mã vận đơn"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <button
                className="btn w-100 text-white"
                style={{ background: "#2563EB" }}
                onClick={handleTrack}
              >
                Track
              </button>
            </div>
          </div>
        </div>

        {/* RESULT */}
        {shipment && (
          <>
            <div
              className="mb-4 p-4 shadow-sm"
              style={{ background: "#fff", borderRadius: "10px" }}
            >
              <h6>Thông tin đơn hàng</h6>
              <p><strong>Mã đơn:</strong> {shipment.tracking_code}</p>
              <p><strong>Người gửi:</strong> {shipment.sender}</p>
              <p><strong>Người nhận:</strong> {shipment.receiver}</p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                <span style={{ color: "#2563EB", fontWeight: "bold" }}>
                  {shipment.status}
                </span>
              </p>
            </div>

            {/* TIMELINE */}
            <div
              className="mb-4 p-4 shadow-sm"
              style={{ background: "#fff", borderRadius: "10px" }}
            >
              <h6>Lịch sử vận chuyển</h6>

              <div style={{ borderLeft: "3px solid #2563EB", marginLeft: "10px", paddingLeft: "20px" }}>
                {shipment.history.map((item, index) => (
                  <div key={index} style={{ marginBottom: "15px", position: "relative" }}>
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        background: "#2563EB",
                        borderRadius: "50%",
                        position: "absolute",
                        left: "-26px",
                        top: "5px",
                      }}
                    ></div>

                    <p style={{ margin: 0 }}>
                      <strong>{item.time}</strong> - {item.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTION */}
            <div className="text-center">
              <button
                className="btn text-white"
                style={{ background: "#F59E0B" }}
                onClick={handlePrint}
              >
                In / Tải xuống
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}