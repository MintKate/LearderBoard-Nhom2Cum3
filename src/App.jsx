import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import Loginform from './Components/LoginForm/Loginform';
import User from './Components/User/User'

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        
        {/* Sử dụng Routes để điều hướng */}
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Loginform />} /> 
          <Route path="/user" element={<User  />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
