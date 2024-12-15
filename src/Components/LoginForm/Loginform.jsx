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
    
    // Gửi yêu cầu đến server
    try {
      const response = await fetch('https://serverleaderbroad.fly.dev/get_marks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ msv, password }),
      });

      if (!response.ok) {
        throw new Error('Đăng nhập thất bại, vui lòng kiểm tra lại thông tin.');
      }

      const data = await response.json();

      // Lưu thông tin vào localStorage (hoặc context/state)
      localStorage.setItem('userData', JSON.stringify(data));

      // Chuyển sang trang user
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
