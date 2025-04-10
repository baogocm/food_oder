import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets'; // Import assets for icons
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const { food_list, cartItems, addToCart, removeFromCart,url} = useContext(StoreContext);

  // Find the product by ID
  const product = food_list.find((item) => item._id === productId);

  // Handle case where product is not found
  if (!product) {
    return <div className="product-not-found">Không tìm thấy sản phẩm!</div>;
  }

  return (
    <div className='product-detail-page'>
      <div className="product-detail-content">
        <div className="product-detail-image">
          <img src={url+"/images/"+product.image} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <img src={assets.rating_starts} alt="Đánh giá" className='product-detail-rating'/>
          <p className="product-detail-price">{product.price}đ</p>
          <p className="product-detail-description">{product.description}</p>
          
          {/* Add to Cart / Counter */} 
          <div className="product-detail-actions">
            {!cartItems[product._id] ? (
              <button onClick={() => addToCart(product._id)} className="add-to-cart-btn">
                Thêm vào giỏ
              </button>
            ) : (
              <div className='food-item-counter product-detail-counter'>
                <img onClick={() => removeFromCart(product._id)} src={assets.remove_icon_red} alt="Bớt" />
                <p>{cartItems[product._id]}</p>
                <img onClick={() => addToCart(product._id)} src={assets.add_icon_green} alt="Thêm" />
              </div>
            )}
          </div>

          <p className="product-detail-category">Danh mục: <span>{product.category}</span></p>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 