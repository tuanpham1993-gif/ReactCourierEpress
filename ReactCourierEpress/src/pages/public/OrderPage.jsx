import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        sender_name: "",
        sender_phone: "",
        sender_address: "",
        receiver_name: "",
        receiver_phone: "",
        receiver_address: "",
        weight: "",
        service: "Standard",
    });

    const [fee, setFee] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // TÍNH PHÍ
    const calculateFee = () => {
        if (!form.weight || form.weight <= 0) {
            return alert("Nhập khối lượng hợp lệ");
        }

        let base = 10000; // giá / kg

        if (form.service === "Express") base = 15000;
        if (form.service === "Same Day") base = 20000;

        const result = form.weight * base;

        setFee(result);
    };

    //  ĐẶT ĐƠN
    const handleOrder = () => {
        const user = localStorage.getItem("user");

        if (!user) {
            navigate("/login");
        } else {
            navigate("/customer/order");
        }
    };

    return (
        <div style={{ background: "#F9FAFB", minHeight: "100vh", padding: "20px" }}>
            <div
                className="container-fluid shadow"
                style={{
                 
                    background: "#fff",
                    padding: "20px",
                }}
            >

                {/* HEADER */}
                <div style={{ borderBottom: "3px solid #000", marginBottom: "30px", textAlign: "center" }}>
                    <h4 style={{ color: "#111827" }}>ĐẶT ĐƠN GỬI HÀNG</h4>
                    <p style={{ color: "#6B7280" }}>
                        Nhập thông tin để tạo đơn và ước tính chi phí
                    </p>
                </div>

                {/* NGƯỜI GỬI */}
                <div className="mb-4 p-3" style={{ border: "2px solid #000" }}>
                    <div className="fw-bold mb-2">Thông tin người gửi</div>

                    <div className="row">
                        <div className="col-md-4">
                            <input name="sender_name" onChange={handleChange} className="form-control" placeholder="Tên" />
                        </div>
                        <div className="col-md-4">
                            <input name="sender_phone" onChange={handleChange} className="form-control" placeholder="SĐT" />
                        </div>
                        <div className="col-md-4">
                            <input name="sender_address" onChange={handleChange} className="form-control" placeholder="Địa chỉ" />
                        </div>
                    </div>
                </div>

                {/* NGƯỜI NHẬN */}
                <div className="mb-4 p-3" style={{ border: "2px solid #000" }}>
                    <div className="fw-bold mb-2">Thông tin người nhận</div>

                    <div className="row">
                        <div className="col-md-4">
                            <input name="receiver_name" onChange={handleChange} className="form-control" placeholder="Tên" />
                        </div>
                        <div className="col-md-4">
                            <input name="receiver_phone" onChange={handleChange} className="form-control" placeholder="SĐT" />
                        </div>
                        <div className="col-md-4">
                            <input name="receiver_address" onChange={handleChange} className="form-control" placeholder="Địa chỉ" />
                        </div>
                    </div>
                </div>

                {/* THÔNG TIN ĐƠN */}
                <div className="mb-4 p-3" style={{ border: "2px solid #000" }}>
                    <div className="fw-bold mb-2">Thông tin đơn hàng</div>

                    <div className="row">
                        <div className="col-md-4">
                            <input
                                type="number"
                                name="weight"
                                value={form.weight}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Khối lượng (kg)"
                            />
                        </div>

                        <div className="col-md-4">
                            <select
                                name="service"
                                value={form.service}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option>Standard</option>
                                <option>Express</option>
                                <option>Same Day</option>
                            </select>
                        </div>

                        <div className="col-md-4 d-flex align-items-end">
                            <button
                                className="btn w-100 text-white"
                                style={{ background: "#F59E0B" }}
                                onClick={calculateFee}
                            >
                                Ước tính giá
                            </button>
                        </div>
                    </div>
                </div>

                {/* GIÁ */}
                <div className="mb-4 p-3" style={{ border: "2px solid #000", textAlign: "center" }}>
                    <div className="fw-bold mb-2">Chi phí dự kiến</div>

                    {fee ? (
                        <h4 style={{ color: "#2563EB" }}>
                            {fee.toLocaleString()} VNĐ
                        </h4>
                    ) : (
                        <p style={{ color: "#6B7280" }}>Chưa tính phí</p>
                    )}
                </div>

                {/* ACTION */}
                <div className="text-center p-3" style={{ border: "2px solid #000" }}>
                    <button
                        className="btn w-50 text-white"
                        style={{ background: "#2563EB" }}
                        onClick={handleOrder}
                    >
                        ĐẶT ĐƠN
                    </button>

                    <p className="small mt-2" style={{ color: "#6B7280" }}>
                        (Nếu chưa đăng nhập → chuyển Login)
                    </p>
                </div>

            </div>
        </div>
    );
}