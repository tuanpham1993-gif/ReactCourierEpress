import { useNavigate } from "react-router-dom";

export default function MyShipmentsPage() {
  const navigate = useNavigate();

  const shipments = [
    {
      code: "TRK001",
      receiver: "Nguyễn Văn B",
      status: "In Transit",
      date: "20/04/2026",
    },
    {
      code: "TRK002",
      receiver: "Lê Văn C",
      status: "Delivered",
      date: "18/04/2026",
    },
  ];

  return (
    <div style={{ background: "#F9FAFB", minHeight: "100vh", padding: "20px" }}>
      <div className="container-fluid">

        {/* HEADER */}
        <div
          className="mb-4 p-4 shadow-sm"
          style={{ background: "#fff", borderRadius: "10px" }}
        >
          <h5 style={{ color: "#111827" }}>My Shipments</h5>
          <p style={{ color: "#6B7280", fontSize: "14px" }}>
            Danh sách tất cả đơn hàng bạn đã tạo
          </p>
        </div>

        {/* SUMMARY */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div
              className="p-3 text-center shadow-sm"
              style={{ background: "#fff", borderRadius: "10px" }}
            >
              <h6>Tổng đơn</h6>
              <h4 style={{ color: "#2563EB" }}>10</h4>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="p-3 text-center shadow-sm"
              style={{ background: "#fff", borderRadius: "10px" }}
            >
              <h6>Đang giao</h6>
              <h4 style={{ color: "#F59E0B" }}>3</h4>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="p-3 text-center shadow-sm"
              style={{ background: "#fff", borderRadius: "10px" }}
            >
              <h6>Đã giao</h6>
              <h4 style={{ color: "#16A34A" }}>7</h4>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div
          className="p-4 shadow-sm"
          style={{ background: "#fff", borderRadius: "10px" }}
        >
          <h6 className="mb-3" style={{ color: "#111827" }}>
            Danh sách đơn hàng
          </h6>

          <table className="table text-center">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Người nhận</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
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
                        color:
                          item.status === "Delivered"
                            ? "#16A34A"
                            : "#F59E0B",
                        fontWeight: "bold",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{item.date}</td>
                  <td>
                    <button
                      className="btn btn-sm text-white"
                      style={{ background: "#2563EB" }}
                      onClick={() => navigate("/tracking")}
                    >
                      Track
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}