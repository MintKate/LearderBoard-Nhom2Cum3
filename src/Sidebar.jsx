import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsPersonCircle, BsPersonDashFill
} from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const navigate = useNavigate();

  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  const userData = localStorage.getItem('userData');

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('userData'); // Xóa dữ liệu người dùng
    navigate('/login'); // Điều hướng về trang login
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCart3 className='icon_header' /> SHOP
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/">
            <BsGrid1X2Fill className='icon' /> Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsFillArchiveFill className='icon' /> Products
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsFillGrid3X3GapFill className='icon' /> Categories
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsPeopleFill className='icon' /> Customers
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsListCheck className='icon' /> Inventory
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsMenuButtonWideFill className='icon' /> Reports
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsFillGearFill className='icon' /> Setting
          </a>
        </li>

        {/* Kiểm tra nếu người dùng đã đăng nhập */}
        {!userData ? (
          <li className='sidebar-list-item'>
            <Link to="/login">
              <BsPersonCircle className='icon' /> Login
            </Link>
          </li>
        ) : (
          <>
            <li className='sidebar-list-item'>
              <Link to="/user">
                <BsPersonCircle className='icon' /> User
              </Link>
            </li>
            <li className='sidebar-list-item'>
              <Link to="/" onClick={handleLogout}>
                <BsPersonDashFill className='icon' /> Logout
              </Link>
            </li>
          </>
        )}

      </ul>
    </aside>
  );
}

export default Sidebar;
