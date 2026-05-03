import React, { useState } from "react";

function Invoices() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const shipments = [
    {
      id: 1,
      tracking_code: "TRK001",
      sender_name: "Nguyen Van A",
      receiver_name: "Tran Thi B",
      service_type: "Express",
      weight: 2.5,
      fee: 50000,
      delivery_date: "2026-04-28",
    },
    {
      id: 2,
      tracking_code: "TRK002",
      sender_name: "Le Thi C",
      receiver_name: "Pham Van D",
      service_type: "Standard",
      weight: 3,
      fee: 70000,
      delivery_date: "2026-04-29",
    },
    {
      id: 3,
      tracking_code: "TRK003",
      sender_name: "Hoang Van E",
      receiver_name: "Nguyen Van F",
      service_type: "Express",
      weight: 1.2,
      fee: 40000,
      delivery_date: "2026-04-30",
    },
  ];

  // Tự tạo hóa đơn từ shipment
  const invoices = shipments.map((shipment) => {
    const tax = shipment.fee * 0.1;
    const total = shipment.fee + tax;

    return {
      id: shipment.id,
      invoice_code: `INV-${shipment.tracking_code}`,
      ...shipment,
      tax,
      total,
      created_at: "2026-04-24",
    };
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="invoice-page">
      <div className="invoice-header">
        <h3>Quản lý hóa đơn</h3>
        <p>Tự tạo hóa đơn theo shipment, hiển thị phí, thuế và tổng tiền.</p>
      </div>

      <div className="invoice-grid">
        <div className="invoice-list-card">
          <h4>Danh sách hóa đơn</h4>

          <table className="invoice-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Mã hóa đơn</th>
                <th>Mã tracking</th>
                <th>Người gửi</th>
                <th>Người nhận</th>
                <th>Phí</th>
                <th>Thuế</th>
                <th>Tổng tiền</th>
                <th>Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {invoices.map((invoice, index) => (
                <tr key={invoice.id}>
                  <td>{index + 1}</td>
                  <td className="invoice-code">{invoice.invoice_code}</td>
                  <td className="tracking-code">{invoice.tracking_code}</td>
                  <td>{invoice.sender_name}</td>
                  <td>{invoice.receiver_name}</td>
                  <td>{Number(invoice.fee).toLocaleString()} VNĐ</td>
                  <td>{Number(invoice.tax).toLocaleString()} VNĐ</td>
                  <td className="invoice-total">
                    {Number(invoice.total).toLocaleString()} VNĐ
                  </td>
                  <td>
                    <button
                      className="btn-view-invoice"
                      onClick={() => setSelectedInvoice(invoice)}
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="invoice-detail-card">
          <h4>Chi tiết hóa đơn</h4>

          {selectedInvoice ? (
            <div className="invoice-print-area">
              <div className="invoice-title">
                <h3>CourierXpress Invoice</h3>
                <p>Mã hóa đơn: {selectedInvoice.invoice_code}</p>
              </div>

              <div className="invoice-info">
                <div>
                  <span>Mã tracking</span>
                  <strong>{selectedInvoice.tracking_code}</strong>
                </div>

                <div>
                  <span>Ngày tạo</span>
                  <strong>{selectedInvoice.created_at}</strong>
                </div>

                <div>
                  <span>Người gửi</span>
                  <strong>{selectedInvoice.sender_name}</strong>
                </div>

                <div>
                  <span>Người nhận</span>
                  <strong>{selectedInvoice.receiver_name}</strong>
                </div>

                <div>
                  <span>Dịch vụ</span>
                  <strong>{selectedInvoice.service_type}</strong>
                </div>

                <div>
                  <span>Khối lượng</span>
                  <strong>{selectedInvoice.weight} kg</strong>
                </div>

                <div>
                  <span>Ngày giao</span>
                  <strong>{selectedInvoice.delivery_date}</strong>
                </div>
              </div>

              <div className="invoice-summary">
                <div>
                  <span>Phí vận chuyển</span>
                  <strong>{Number(selectedInvoice.fee).toLocaleString()} VNĐ</strong>
                </div>

                <div>
                  <span>Thuế VAT 10%</span>
                  <strong>{Number(selectedInvoice.tax).toLocaleString()} VNĐ</strong>
                </div>

                <div className="invoice-total-row">
                  <span>Tổng thanh toán</span>
                  <strong>{Number(selectedInvoice.total).toLocaleString()} VNĐ</strong>
                </div>
              </div>

              <button className="btn-print-invoice" onClick={handlePrint}>
                🖨 In hóa đơn
              </button>
            </div>
          ) : (
            <div className="empty-invoice">
              Chọn một hóa đơn để xem chi tiết.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Invoices;