import React, { useState } from "react";

function Branches() {
  const [search, setSearch] = useState("");
  const [editingBranch, setEditingBranch] = useState(null);

  const [formData, setFormData] = useState({
    branch_name: "",
    city: "",
    address: "",
    phone: "",
  });

  const [branches, setBranches] = useState([
    {
      id: 1,
      branch_name: "Chi nhánh Hà Nội",
      city: "Hà Nội",
      address: "Cầu Giấy, Hà Nội",
      phone: "0241234567",
    },
    {
      id: 2,
      branch_name: "Chi nhánh Hồ Chí Minh",
      city: "Hồ Chí Minh",
      address: "Quận 1, TP.HCM",
      phone: "0289876543",
    },
    {
      id: 3,
      branch_name: "Chi nhánh Đà Nẵng",
      city: "Đà Nẵng",
      address: "Hải Châu, Đà Nẵng",
      phone: "0236123456",
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({
      branch_name: "",
      city: "",
      address: "",
      phone: "",
    });

    setEditingBranch(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingBranch) {
      const updatedBranches = branches.map((branch) =>
        branch.id === editingBranch.id
          ? { ...branch, ...formData }
          : branch
      );

      setBranches(updatedBranches);
      alert("Cập nhật chi nhánh thành công!");
    } else {
      const newBranch = {
        id: Date.now(),
        ...formData,
      };

      setBranches([...branches, newBranch]);
      alert("Thêm chi nhánh thành công!");
    }

    resetForm();
  };

  const handleEdit = (branch) => {
    setEditingBranch(branch);

    setFormData({
      branch_name: branch.branch_name,
      city: branch.city,
      address: branch.address,
      phone: branch.phone,
    });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa chi nhánh này không?"
    );

    if (confirmDelete) {
      setBranches(branches.filter((branch) => branch.id !== id));
      alert("Xóa chi nhánh thành công!");
    }
  };

  const filteredBranches = branches.filter((branch) => {
    const keyword = search.toLowerCase();

    return (
      branch.branch_name.toLowerCase().includes(keyword) ||
      branch.city.toLowerCase().includes(keyword) ||
      branch.address.toLowerCase().includes(keyword) ||
      branch.phone.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="branch-page">
      <div className="branch-header">
        <div>
          <h3>Quản lý chi nhánh</h3>
          <p>Quản lý danh sách chi nhánh của CourierXpress</p>
        </div>
      </div>

      <div className="branch-grid">
        <div className="branch-form-card">
          <h4>{editingBranch ? "Sửa chi nhánh" : "Thêm chi nhánh"}</h4>

          <form onSubmit={handleSubmit}>
            <div className="branch-form-group">
              <label>Tên chi nhánh</label>
              <input
                type="text"
                name="branch_name"
                value={formData.branch_name}
                onChange={handleChange}
                placeholder="VD: Chi nhánh Hà Nội"
                required
              />
            </div>

            <div className="branch-form-group">
              <label>Thành phố</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="VD: Hà Nội"
                required
              />
            </div>

            <div className="branch-form-group">
              <label>Địa chỉ</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Nhập địa chỉ chi nhánh"
                required
              />
            </div>

            <div className="branch-form-group">
              <label>Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                required
              />
            </div>

            <div className="branch-actions">
              <button type="submit" className="btn-save-branch">
                {editingBranch ? "Cập nhật" : "Thêm chi nhánh"}
              </button>

              {editingBranch && (
                <button
                  type="button"
                  className="btn-cancel-branch"
                  onClick={resetForm}
                >
                  Hủy
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="branch-table-card">
          <div className="branch-table-top">
            <h4>Danh sách chi nhánh</h4>

            <input
              type="text"
              placeholder="Tìm kiếm chi nhánh..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <table className="branch-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên chi nhánh</th>
                <th>Thành phố</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
                <th>Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {filteredBranches.map((branch, index) => (
                <tr key={branch.id}>
                  <td>{index + 1}</td>
                  <td>{branch.branch_name}</td>
                  <td>{branch.city}</td>
                  <td>{branch.address}</td>
                  <td>{branch.phone}</td>
                  <td>
                    <button
                      className="btn-edit-branch"
                      onClick={() => handleEdit(branch)}
                    >
                      ✏️
                    </button>

                    <button
                      className="btn-delete-branch"
                      onClick={() => handleDelete(branch.id)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}

              {filteredBranches.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-data">
                    Không có chi nhánh phù hợp
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Branches;