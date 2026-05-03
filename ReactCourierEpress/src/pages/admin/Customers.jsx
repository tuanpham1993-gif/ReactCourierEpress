import React, { useState } from "react";

function Customers() {
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customers = [
    {
      id: 1,
      name: "Nguyen Van A",
      email: "nguyenvana@gmail.com",
      phone: "0909111111",
      address: "Hà Nội",
    },
    {
      id: 2,
      name: "Le Thi C",
      email: "lethic@gmail.com",
      phone: "0909333333",
      address: "Đà Nẵng",
    },
    {
      id: 3,
      name: "Hoang Van E",
      email: "hoangvane@gmail.com",
      phone: "0909555555",
      address: "Hồ Chí Minh",
    },
  ];

  const shipments = [
    {
      id: 1,
      customer_id: 1,
      tracking_code: "TRK001",
      receiver_name: "Tran Thi B",
      service_type: "Express",
      fee: 50000,
      status: "Pending",
      delivery_date: "2026-04-28",
    },
    {
      id: 2,
      customer_id: 2,
      tracking_code: "TRK002",
      receiver_name: "Pham Van D",
      service_type: "Standard",
      fee: 70000,
      status: "In Transit",
      delivery_date: "2026-04-29",
    },
    {
      id: 3,
      customer_id: 1,
      tracking_code: "TRK003",
      receiver_name: "Nguyen Van F",
      service_type: "Express",
      fee: 40000,
      status: "Delivered",
      delivery_date: "2026-04-30",
    },
  ];

  const filteredCustomers = customers.filter((customer) => {
    const keyword = search.toLowerCase();

    return (
      customer.name.toLowerCase().includes(keyword) ||
      customer.email.toLowerCase().includes(keyword) ||
      customer.phone.includes(keyword) ||
      customer.address.toLowerCase().includes(keyword)
    );
  });

  const customerShipments = selectedCustomer
    ? shipments.filter((item) => item.customer_id === selectedCustomer.id)
    : [];

  return (
    <div className="customers-page">
      <div className="customers-header">
        <div>
          <h3>Quản lý khách hàng</h3>
          <p>Tìm kiếm khách hàng và xem lịch sử gửi hàng.</p>
        </div>
      </div>

      <div className="customers-grid">
        <div className="customers-card">
          <div className="customers-top">
            <h4>Danh sách khách hàng</h4>

            <input
              type="text"
              placeholder="Tìm tên, email, số điện thoại..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <table className="customers-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Khách hàng</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer, index) => (
                <tr key={customer.id}>
                  <td>{index + 1}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td>
                    <button
                      className="btn-view-customer"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      Xem lịch sử
                    </button>
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-data">
                    Không tìm thấy khách hàng phù hợp
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="customer-history-card">
          <h4>Lịch sử gửi hàng</h4>

          {selectedCustomer ? (
            <>
              <div className="customer-info-box">
                <strong>{selectedCustomer.name}</strong>
                <p>{selectedCustomer.phone}</p>
                <p>{selectedCustomer.address}</p>
              </div>

              <table className="history-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Mã tracking</th>
                    <th>Người nhận</th>
                    <th>Dịch vụ</th>
                    <th>Phí</th>
                    <th>Trạng thái</th>
                    <th>Ngày giao</th>
                  </tr>
                </thead>

                <tbody>
                  {customerShipments.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td className="tracking-code">{item.tracking_code}</td>
                      <td>{item.receiver_name}</td>
                      <td>{item.service_type}</td>
                      <td>{Number(item.fee).toLocaleString()} VNĐ</td>
                      <td>{item.status}</td>
                      <td>{item.delivery_date}</td>
                    </tr>
                  ))}

                  {customerShipments.length === 0 && (
                    <tr>
                      <td colSpan="7" className="empty-data">
                        Khách hàng này chưa có lịch sử gửi hàng.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          ) : (
            <div className="empty-history">
              Chọn một khách hàng để xem lịch sử gửi hàng.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Customers;