import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({setShowLogin}) => {
  const[currState,setCurrState] = useState("Đăng ký")
  
    return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="Đóng" />
        </div>
        <div className="login-popup-inputs">
            {/* Conditionally render name input using && */} 
            {currState !== "Đăng nhập" && (
              <input type="text" placeholder='Tên của bạn' required />
            )}
            <input type="email" placeholder='Email của bạn' required />
            <input type="password" placeholder='Mật khẩu' required />
          </div>
        <button type="submit">{currState==="Đăng ký"?"Tạo tài khoản":"Đăng nhập"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>Bằng cách tiếp tục, tôi đồng ý với các điều khoản sử dụng & chính sách bảo mật.</p>
        </div>
        {currState==="Đăng nhập"?
        <p>Chưa có tài khoản? <span onClick={()=>setCurrState("Đăng ký")}>Đăng ký tại đây</span></p>
        :<p>Đã có tài khoản? <span onClick={()=>setCurrState("Đăng nhập")}>Đăng nhập tại đây</span></p>
        }
        </form>
    </div>
  )
}

export default LoginPopup
