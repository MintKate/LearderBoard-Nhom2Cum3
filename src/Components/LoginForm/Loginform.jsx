import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [msv, setMsv] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra xem thông tin có trống hay không
    if (!msv || !password) {
      alert('MSV và Password không được để trống!');
      return;
    }

    try {
      console.log('Gửi yêu cầu với thông tin:', { msv, password });

      // Gửi yêu cầu đến API với URL đầy đủ
      const response = await fetch('https://serverleaderbroad.fly.dev/get_marks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ msv, password }),
      });

      // Kiểm tra nếu response không thành công
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Lỗi từ server:', errorData);
        throw new Error(errorData.message || 'Đăng nhập thất bại, vui lòng kiểm tra lại thông tin.');
      }

      // Lấy dữ liệu trả về từ server
      const data = await response.json();
      console.log('Đăng nhập thành công:', data);

      // Lưu dữ liệu vào localStorage
      localStorage.setItem('userData', JSON.stringify(data));

      // Chuyển hướng đến trang user
      navigate('/user');
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className='input-box'>
          <input 
            type="text" 
            placeholder='MSV' 
            required 
            value={msv} 
            onChange={(e) => setMsv(e.target.value)} 
          />
          <FaUser className='icon'/>
        </div>

        <div className='input-box'>
          <input 
            type="password" 
            placeholder='Password' 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <FaLock className='icon'/>
        </div>

        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
