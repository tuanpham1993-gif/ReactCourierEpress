import React, { useState } from "react";

function Settings() {
  const [language, setLanguage] = useState("English");
  const [darkMode, setDarkMode] = useState(false);

  const handleChangePassword = () => {
    alert("Chức năng đổi mật khẩu sẽ được xử lý ở bước sau.");
  };

  const handleSwitchAccount = () => {
    alert("Chuyển tài khoản / đăng xuất tài khoản hiện tại.");
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h3>⚙️ Settings</h3>
        <p>Manage system preferences and account settings.</p>
      </div>

      <div className="settings-grid">
        {/* 1. Giao diện ngôn ngữ */}
        <div className="settings-card">
          <h4>🌐 Language</h4>
          <p>Choose interface language.</p>

          <select
            className="settings-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="Vietnamese">Vietnamese</option>
          </select>
        </div>

        {/* 2. Bật/tắt sáng tối */}
        <div className="settings-card">
          <h4>🌙 Appearance</h4>
          <p>Switch between light and dark mode.</p>

          <button
            className={`toggle-btn ${darkMode ? "dark" : ""}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Dark Mode ON" : "Light Mode ON"}
          </button>
        </div>

        {/* 3. Đổi mật khẩu */}
        <div className="settings-card">
          <h4>🔐 Password</h4>
          <p>Change your account password.</p>

          <button className="settings-button" onClick={handleChangePassword}>
            Change Password
          </button>
        </div>

        {/* 4. Thông tin hệ thống */}
        <div className="settings-card">
          <h4>ℹ️ System Information</h4>

          <ul className="system-info">
            <li><strong>System:</strong> CourierXpress Admin</li>
            <li><strong>Version:</strong> 1.0.0</li>
            <li><strong>Frontend:</strong> ReactJS + Bootstrap</li>
            <li><strong>Backend:</strong> Laravel API</li>
          </ul>
        </div>

        {/* 5. Liên hệ hỗ trợ */}
        <div className="settings-card">
          <h4>📞 Support Contact</h4>

          <ul className="system-info">
            <li><strong>Email:</strong> phamthanht009@gmail.com</li>
            <li><strong>Phone:</strong> 093.6667.789</li>
            <li><strong>Address:</strong> Thành Phố Hồ Chí Minh, Viet Nam</li>
          </ul>
        </div>

        {/* 6. Chuyển tài khoản */}
        <div className="settings-card">
          <h4>👤 Account</h4>
          <p>Switch to another account or logout current user.</p>

          <button className="switch-account-btn" onClick={handleSwitchAccount}>
            Switch Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;