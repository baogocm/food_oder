import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets';
import { Link, Links } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({setShowLogin}) => {
    const[menu,setMenu] = useState("home");
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

    const {getTotalCartAmount,token,setToken} = useContext(StoreContext);

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/");
    }
    // Function to toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

  return (
    <div className='navbar'>
      <Link to='/' className="navbar-logo">Food Order</Link>

      {/* Hamburger Icon */} 
      <div className="navbar-hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Apply 'open' class based on state */} 
      <ul className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
        {/* Close menu on link click (optional but good UX) */} 
        <Link to='/' onClick={()=>{setMenu("home"); setIsMenuOpen(false);}} className={menu=="home"?"active":""}>Trang chủ</Link>
        <a href='#explore-menu' onClick={()=>{setMenu("menu"); setIsMenuOpen(false);}} className={menu=="menu"?"active":""}>Thực đơn</a>
        <Link to='/about' onClick={()=>{setMenu("about"); setIsMenuOpen(false);}} className={menu==="about"?"active":""}>Về chúng tôi</Link>
        <Link to='/policy' onClick={()=>{setMenu("policy"); setIsMenuOpen(false);}} className={menu==="policy"?"active":""}>Chính sách</Link>
        <a href='#footer' onClick={()=>{setMenu("contact-us"); setIsMenuOpen(false);}} className={menu=="contact-us"?"active":""}>Liên hệ</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Tìm kiếm" />
        <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} alt="Giỏ hàng" /></Link>
            <div className={getTotalCartAmount()===0 ? "": "dot"}></div>
        </div>
        {!token?
        <button onClick={()=>setShowLogin(true)}>Đăng nhập</button>
        :<div className="navbar-profile">
            <img src={assets.profile_icon} alt="Tài khoản" />
            <ul className='navbar-profile-dropdown'>
              <li onClick={() => navigate('/my-orders')}><img src={assets.bag_icon} alt="" />Đơn hàng</li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" />Đăng xuất</li>
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar
