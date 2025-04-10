import React, { useState,useContext } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPopup = ({setShowLogin}) => {

  const {url,setToken} = useContext(StoreContext);

  const[currState,setCurrState] = useState("Đăng nhập")
  const[data,setData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
  }
  const onLogin = async(event) => {
    event.preventDefault();
    let newUrl = `${url}/api/user/login`;
    if(currState==="Đăng nhập"){
      newUrl = `${url}/api/user/login`;
    }else{
      newUrl = `${url}/api/user/register`;
    }
    try {
      const response = await axios.post(newUrl,data);
      console.log(response);
      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false);
        toast.success(currState === "Đăng nhập" ? "Đăng nhập thành công!" : "Đăng ký thành công!");
      }
      else{
        toast.error(response.data.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra");
    }
  }
  
    return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="Đóng" />
        </div>
        <div className="login-popup-inputs">
            {currState !== "Đăng ký" ?<></>:<input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder='Tên của bạn' required />}
            <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email của bạn' required />
            <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder='Mật khẩu' required />
          </div>
        <button  type="submit">{currState==="Đăng ký"?"Tạo tài khoản":"Đăng nhập"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>Bằng cách tiếp tục, tôi đồng ý với các điều khoản sử dụng & chính sách bảo mật.</p>
        </div>
        {currState==="Đăng ký"?
        <p>Chưa có tài khoản? <span onClick={()=>setCurrState("Đăng nhập")}>Đăng nhập tại đây</span></p>
        :<p>Đã có tài khoản? <span onClick={()=>setCurrState("Đăng ký")}>Tạo tài khoản tại đây</span></p>
        }
        </form>
    </div>
  )
}

export default LoginPopup
