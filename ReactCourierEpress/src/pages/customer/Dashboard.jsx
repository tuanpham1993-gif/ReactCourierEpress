export default function CustomerDashboard() {
  return (
    <>
      {/* HEADER */}
      <div
        className="d-flex justify-content-between align-items-center mb-4 p-3 shadow-sm"
        style={{ background: "#FFFFFF", borderRadius: "10px" }}
      >
        <h5 style={{ color: "#111827", margin: 0 }}>
          Customer Dashboard
        </h5>

        <div style={{ color: "#6B7280" }}>
          Xin chào, <b>Nguyễn Văn A</b>
        </div>
      </div>

      {/* TRACK QUICK */}
      <div
        className="mb-4 p-3 shadow-sm"
        style={{ background: "#FFFFFF", borderRadius: "10px" }}
      >
        <h6 style={{ color: "#111827" }}>Tra cứu nhanh</h6>

        <div className="row">
          <div className="col-md-9">
            <input
              className="form-control"
              placeholder="Nhập mã vận đơn"
            />
          </div>

          <div className="col-md-3">
            <button
              className="btn w-100 text-white"
              style={{ background: "#2563EB" }}
            >
              Track
            </button>
          </div>
        </div>
      </div>

      {/* RECENT SHIPMENTS */}
      <div
        className="mb-4 p-3 shadow-sm"
        style={{ background: "#FFFFFF", borderRadius: "10px" }}
      >
        <h6 style={{ color: "#111827" }}>Đơn hàng gần đây</h6>

        <table className="table text-center">
          <thead>
            <tr style={{ color: "#6B7280" }}>
              <th>Mã đơn</th>
              <th>Người nhận</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>TRK001</td>
              <td>Trần Văn B</td>
              <td style={{ color: "#F59E0B", fontWeight: "bold" }}>
                In Transit
              </td>
              <td>20/04/2026</td>
            </tr>

            <tr>
              <td>TRK002</td>
              <td>Lê Văn C</td>
              <td style={{ color: "green", fontWeight: "bold" }}>
                Delivered
              </td>
              <td>18/04/2026</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PROFILE QUICK */}
      <div
        className="p-3 shadow-sm"
        style={{ background: "#FFFFFF", borderRadius: "10px" }}
      >
        <h6 style={{ color: "#111827" }}>Thông tin cá nhân</h6>

        <p><b>Tên:</b> Nguyễn Văn A</p>
        <p><b>Email:</b> a@gmail.com</p>
        <p><b>SĐT:</b> 0909xxx</p>

        <button
          className="btn text-white"
          style={{ background: "#2563EB" }}
        >
          Cập nhật
        </button>
      </div>
    </>
  );
}