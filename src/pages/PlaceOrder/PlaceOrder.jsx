import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {
  const{getTotalCartAmount} = useContext(StoreContext);

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className='title'>Thông tin giao hàng</p>
        <div className='multi-fields'>
          <input type="text" placeholder='Tên' />
          <input type="text" placeholder='Họ' />
        </div>
        <input type="email" placeholder='Địa chỉ email' />
        <input type="text" placeholder='Địa chỉ nhà'/>
        <div className='multi-fields'>
          <input type="text" placeholder='Thành phố' />
          <input type="text" placeholder='Tỉnh/Bang' />
        </div>
        <div className='multi-fields'>
          <input type="text" placeholder='Mã bưu điện' />
          <input type="text" placeholder='Quốc gia' />
        </div>
        <input type="text" placeholder='Số điện thoại' />
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
