import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const{cartItems,food_list,removeFromCart,addToCart,getTotalCartAmount,url} = useContext(StoreContext);
  const navigate = useNavigate();
  
  // Check if cart is empty
  const isCartEmpty = Object.keys(cartItems).length === 0 || 
                     Object.values(cartItems).every(quantity => quantity <= 0);
  
  return (
    <div className='cart'>
      {isCartEmpty ? (
        <div className="empty-cart">
          <h2>Giỏ hàng của bạn đang trống</h2>
          <button onClick={() => navigate('/')}>Tiếp tục mua sắm</button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Sản phẩm</p>
              <p>Tên</p>
              <p>Giá</p>
              <p>Số lượng</p>
              <p>Tổng</p>
              <p>Xóa</p>
            </div>
            <br />
            <hr />
            {food_list.map((item,index)=>{
              if(cartItems[item._id] > 0)
              {
                return ( 
                <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>{item.price}đ</p>
                  <div className="cart-quantity-controls">
                    <span onClick={() => removeFromCart(item._id)}>-</span>
                    <p>{cartItems[item._id]}</p>
                    <span onClick={() => addToCart(item._id)}>+</span>
                  </div>
                  <p>{item.price*cartItems[item._id]}đ</p>
                  <p onClick={()=>{
                    // Remove all of this item
                    for(let i=0; i<cartItems[item._id]; i++) {
                      removeFromCart(item._id);
                    }
                  }} className='cross'>x</p>
                  </div>
                  <hr />
                </div>
                ) 
              }
              return null;
            })}
          </div>
          <div className="cart-bottom">
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
              <button onClick={()=>navigate('/order')}>Tiến hành thanh toán</button>
            </div>
            <div className="cart-promocode">
              <div>
                <p>Nếu bạn có mã giảm giá, nhập vào đây:</p>
                <div className="cart-promocode-input">
                  <input type="text" placeholder='Mã giảm giá' />
                  <button>Áp dụng</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
