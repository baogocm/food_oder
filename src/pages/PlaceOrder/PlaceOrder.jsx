import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';

const PlaceOrder = () => {
  const{getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);

  const [data,setData] = useState({
   firstName: "",
   lastName: "",
   email: "",
   address: "",
   city: "",
   state: "",
   zip: "",
   country: "",
   phone: "",
  })

  const handleChange = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}));
  }

  const placeOrder = async (event)=>{
    event.preventDefault();
    let orderItems = [];
    food_list.map(item=>{
     if(cartItems[item._id]){
      let itemInfo = item;
      itemInfo["quantity"] = cartItems[item._id];
      orderItems.push(itemInfo);
     }
    })
    
    let address = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
      country: data.country,
      phone: data.phone,
    };
    
    let orderData = {
     address: address,
     cartItems: orderItems,
     amount: getTotalCartAmount() + 2
    }
    
    let response = await axios.post(`${url}/api/order/place`, orderData, {headers:{token:token}});
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }else{
      alert("Đặt hàng thất bại");
    }
  }

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Thông tin giao hàng</p>
        <div className='multi-fields'>
          <input required name='firstName' onChange={handleChange} value={data.firstName} type="text" placeholder='Tên' />
          <input required name='lastName' onChange={handleChange} value={data.lastName} type="text" placeholder='Họ' />
        </div>
        <input required name='email' onChange={handleChange} value={data.email} type="email" placeholder='Địa chỉ email' />
        <input required name='address' onChange={handleChange} value={data.address} type="text" placeholder='Địa chỉ nhà' />
        <div className='multi-fields'>
          <input required name='city' onChange={handleChange} value={data.city} type="text" placeholder='Thành phố' />
          <input required name='state' onChange={handleChange} value={data.state} type="text" placeholder='Tỉnh/Bang' />
        </div>
        <div className='multi-fields'>
          <input required name='zip' onChange={handleChange} value={data.zip} type="text" placeholder='Mã bưu điện' />
          <input required name='country' onChange={handleChange} value={data.country} type="text" placeholder='Quốc gia' />
        </div>
          <input required name='phone' onChange={handleChange} value={data.phone} type="text" placeholder='Số điện thoại' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
            <h2>Tổng tiền giỏ hàng</h2>
            <div>
              <div className="cart-total-details">
                <p>Tổng phụ:</p>
                <p>{getTotalCartAmount()}đ</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Phí giao hàng</p>
                <p>{getTotalCartAmount()===0?0:2}đ</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Tổng cộng</b>
                <b>{getTotalCartAmount()===0?0:getTotalCartAmount()+2}đ</b>
              </div>
            </div>
            <button type="submit">Tiến hành thanh toán</button>
          </div>
      </div>
    </form>
  )
}

export default PlaceOrder
