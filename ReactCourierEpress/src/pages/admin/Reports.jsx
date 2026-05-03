import React, { useMemo, useState } from "react";

function Reports() {
  const [filterDate, setFilterDate] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterBranch, setFilterBranch] = useState("");

  const shipments = [
    {
      id: 1,
      tracking_code: "TRK001",
      city: "Hà Nội",
      branch_name: "Chi nhánh Hà Nội",
      agent_name: "Agent Hà Nội 01",
      status: "Pending",
      created_at: "2026-04-24",
      delivery_date: "2026-04-28",
      fee: 50000,
      is_late: false,
    },
    {
      id: 2,
      tracking_code: "TRK002",
      city: "Hồ Chí Minh",
      branch_name: "Chi nhánh Hồ Chí Minh",
      agent_name: "Agent HCM 01",
      status: "In Transit",
      created_at: "2026-04-24",
      delivery_date: "2026-04-29",
      fee: 70000,
      is_late: true,
    },
    {
      id: 3,
      tracking_code: "TRK003",
      city: "Hà Nội",
      branch_name: "Chi nhánh Hà Nội",
      agent_name: "Agent Hà Nội 02",
      status: "Delivered",
      created_at: "2026-04-25",
      delivery_date: "2026-04-30",
      fee: 40000,
      is_late: false,
    },
    {
      id: 4,
      tracking_code: "TRK004",
      city: "Đà Nẵng",
      branch_name: "Chi nhánh Đà Nẵng",
      agent_name: "Agent Đà Nẵng 01",
      status: "Delivered",
      created_at: "2026-04-25",
      delivery_date: "2026-04-30",
      fee: 90000,
      is_late: true,
    },
  ];

  const filteredShipments = shipments.filter((item) => {
    const matchDate = filterDate === "" || item.created_at === filterDate;
    const matchCity = filterCity === "" || item.city === filterCity;
    const matchBranch = filterBranch === "" || item.branch_name === filterBranch;

    return matchDate && matchCity && matchBranch;
  });

  const totalOrders = filteredShipments.length;
  const deliveredOrders = filteredShipments.filter(
    (item) => item.status === "Delivered"
  ).length;
  const lateOrders = filteredShipments.filter((item) => item.is_late).length;
  const totalRevenue = filteredShipments.reduce(
    (total, item) => total + item.fee,
    0
  );

  const cityReports = useMemo(() => {
    const result = {};

    filteredShipments.forEach((item) => {
      if (!result[item.city]) {
        result[item.city] = {
          city: item.city,
          orders: 0,
          revenue: 0,
        };
      }

      result[item.city].orders += 1;
      result[item.city].revenue += item.fee;
    });

    return Object.values(result);
  }, [filteredShipments]);

  const branchReports = useMemo(() => {
    const result = {};

    filteredShipments.forEach((item) => {
      if (!result[item.branch_name]) {
        result[item.branch_name] = {
          branch_name: item.branch_name,
          orders: 0,
          late: 0,
          revenue: 0,
        };
      }

      result[item.branch_name].orders += 1;
      result[item.branch_name].revenue += item.fee;

      if (item.is_late) {
        result[item.branch_name].late += 1;
      }
    });

    return Object.values(result);
  }, [filteredShipments]);

  const agentReports = useMemo(() => {
    const result = {};

    filteredShipments.forEach((item) => {
      if (!result[item.agent_name]) {
        result[item.agent_name] = {
          agent_name: item.agent_name,
          orders: 0,
          delivered: 0,
          late: 0,
        };
      }

      result[item.agent_name].orders += 1;

      if (item.status === "Delivered") {
        result[item.agent_name].delivered += 1;
      }

      if (item.is_late) {
        result[item.agent_name].late += 1;
      }
    });

    return Object.values(result);
  }, [filteredShipments]);

  const exportCSV = () => {
    const header = [
      "Tracking Code",
      "City",
      "Branch",
      "Agent",
      "Status",
      "Created At",
      "Delivery Date",
      "Fee",
      "Late",
    ];

    const rows = filteredShipments.map((item) => [
      item.tracking_code,
      item.city,
      item.branch_name,
      item.agent_name,
      item.status,
      item.created_at,
      item.delivery_date,
      item.fee,
      item.is_late ? "Yes" : "No",
    ]);

    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "courierxpress_report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div>
          <h3>Báo cáo & Analytics</h3>
          <p>Báo cáo theo ngày, thành phố, agent, chi nhánh và đơn trễ.</p>
        </div>

        <div className="reports-actions">
          <button onClick={exportCSV}>⬇ Xuất CSV</button>
          <button onClick={handlePrint}>🖨 In báo cáo</button>
        </div>
      </div>

      <div className="reports-filter">
        <div>
          <label>Lọc theo ngày</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>

        <div>
          <label>Lọc theo thành phố</label>
          <select value={filterCity} onChange={(e) => setFilterCity(e.target.value)}>
            <option value="">Tất cả thành phố</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
          </select>
        </div>

        <div>
          <label>Lọc theo chi nhánh</label>
          <select
            value={filterBranch}
            onChange={(e) => setFilterBranch(e.target.value)}
          >
            <option value="">Tất cả chi nhánh</option>
            <option value="Chi nhánh Hà Nội">Chi nhánh Hà Nội</option>
            <option value="Chi nhánh Hồ Chí Minh">Chi nhánh Hồ Chí Minh</option>
            <option value="Chi nhánh Đà Nẵng">Chi nhánh Đà Nẵng</option>
          </select>
        </div>
      </div>

      <div className="report-stat-grid">
        <div className="report-stat-card">
          <p>Tổng đơn</p>
          <h3>{totalOrders}</h3>
        </div>

        <div className="report-stat-card">
          <p>Đã giao</p>
          <h3>{deliveredOrders}</h3>
        </div>

        <div className="report-stat-card late">
          <p>Đơn trễ</p>
          <h3>{lateOrders}</h3>
        </div>

        <div className="report-stat-card revenue">
          <p>Doanh thu</p>
          <h3>{totalRevenue.toLocaleString()} VNĐ</h3>
        </div>
      </div>

      <div className="reports-grid">
        <div className="report-card">
          <h4>Báo cáo theo thành phố</h4>

          <table className="report-table">
            <thead>
              <tr>
                <th>Thành phố</th>
                <th>Số đơn</th>
                <th>Doanh thu</th>
              </tr>
            </thead>

            <tbody>
              {cityReports.map((item) => (
                <tr key={item.city}>
                  <td>{item.city}</td>
                  <td>{item.orders}</td>
                  <td>{item.revenue.toLocaleString()} VNĐ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="report-card">
          <h4>Báo cáo theo chi nhánh</h4>

          <table className="report-table">
            <thead>
              <tr>
                <th>Chi nhánh</th>
                <th>Số đơn</th>
                <th>Đơn trễ</th>
                <th>Doanh thu</th>
              </tr>
            </thead>

            <tbody>
              {branchReports.map((item) => (
                <tr key={item.branch_name}>
                  <td>{item.branch_name}</td>
                  <td>{item.orders}</td>
                  <td>{item.late}</td>
                  <td>{item.revenue.toLocaleString()} VNĐ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="report-card full">
          <h4>Báo cáo theo Agent</h4>

          <table className="report-table">
            <thead>
              <tr>
                <th>Agent</th>
                <th>Số đơn xử lý</th>
                <th>Đã giao</th>
                <th>Đơn trễ</th>
              </tr>
            </thead>

            <tbody>
              {agentReports.map((item) => (
                <tr key={item.agent_name}>
                  <td>{item.agent_name}</td>
                  <td>{item.orders}</td>
                  <td>{item.delivered}</td>
                  <td>{item.late}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reports;