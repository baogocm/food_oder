import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <div className="logo">Food Order</div>
            <p>Chúng tôi mang đến những món ăn ngon nhất từ các nhà hàng yêu thích của bạn, giao đến tận cửa nhà bạn. Hãy khám phá thực đơn đa dạng và đặt hàng ngay hôm nay!</p>
            <div className="footer-social-icons">
                <a href="#"><img src={assets.facebook_icon} alt="Facebook" /></a>
                <a href="#"><img src={assets.twitter_icon} alt="Twitter" /></a>
                <a href="#"><img src={assets.linkedin_icon} alt="LinkedIn" /></a>
            </div>
        
        </div>
        <div className="footer-content-center">
            <h2>CÔNG TY</h2>
            <ul>
                <li><Link to="/">Trang chủ</Link></li>
                <li><Link to="/about">Về chúng tôi</Link></li>
                <li>Giao hàng</li>
                <li>Chính sách bảo mật</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>LIÊN HỆ</h2>
            <ul>
                <li>+84 123 456 789</li>
                <li>lienhe@foodorder.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Bản quyền © 2024, FoodOrder.com - Đã đăng ký Bản quyền.</p>
    </div>
  )
}

export default Footer
