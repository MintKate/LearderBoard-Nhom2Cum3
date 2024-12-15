import React, { useEffect, useState } from 'react';
import './User.css';  // Đảm bảo bạn đã import đúng CSS

const User = () => {
  const [serverResponse, setServerResponse] = useState(null);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const data = localStorage.getItem('userData');
    if (data) {
      // Lấy dữ liệu từ localStorage và hiển thị trong serverResponse
      setServerResponse(JSON.parse(data));
    }
  }, []);

  if (!serverResponse) {
    return <p className="loading">Loading...</p>;  // Hiển thị "Loading..." nếu chưa có dữ liệu
  }

  return (
    <div className="user-page-container">
      <h2>Thông tin người dùng:</h2>
      <pre>{JSON.stringify(serverResponse, null, 2)}</pre> {/* Hiển thị dữ liệu trả về từ server */}
    </div>
  );
};

export default User;
