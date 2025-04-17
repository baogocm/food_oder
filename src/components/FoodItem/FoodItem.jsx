import React, { useContext} from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { Link, useNavigate } from 'react-router-dom'

const FoodItem = ({id,name,price,description,image}) => {
  const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext)
  const navigate = useNavigate();
  
  // Check if this item is in the cart
  const itemCount = cartItems[id] || 0;

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <Link to={`/product/${id}`}>
          <img className='food-item-image' src={url+"/images/"+image} alt={name} />
        </Link>
        {!itemCount
          ? <img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="Thêm vào giỏ" />
          : <div className='food-item-counter'>
            <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="Bớt" />
            <p>{itemCount}</p>
            <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="Thêm" />
          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <Link to={`/product/${id}`} className="food-item-link">
            <p>{name}</p>
          </Link>
          <img src={assets.rating_starts} alt="Đánh giá" />
        </div>  
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">{price}đ</p>
        <button onClick={() => navigate(`/product/${id}`)} className="food-item-details-btn">
          Xem chi tiết
        </button>
      </div>      
    </div>
  )
}

export default FoodItem
