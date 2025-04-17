import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import './MyOrders.css'
import { useNavigate } from 'react-router-dom'

const MyOrders = () => {
  const { url, token } = useContext(StoreContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Kiểm tra đăng nhập
    if (!token) {
      navigate('/')
      return
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${url}/api/order/user-orders`, {
          headers: { token }
        })

        if (response.data.success) {
          console.log("Đơn hàng:", response.data.orders);
          setOrders(response.data.orders)
        } else {
          setError(response.data.message || 'Không thể tải đơn hàng')
        }
      } catch (error) {
        console.error('Lỗi khi tải đơn hàng:', error)
        setError('Đã xảy ra lỗi khi tải đơn hàng')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [token, url, navigate])

  // Hàm định dạng ngày tháng
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  // Hàm lấy màu cho trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case 'Đã thanh toán':
        return 'status-paid'
      case 'Đang giao':
        return 'status-shipping'
      case 'Đã giao':
        return 'status-delivered'
      case 'Đã hủy':
        return 'status-cancelled'
      default:
        return 'status-pending'
    }
  }

  // Hàm xử lý hiển thị sản phẩm
  const renderItems = (items) => {
    // Kiểm tra nếu items là mảng lồng trong mảng
    if (items && Array.isArray(items)) {
      // Nếu items là mảng phẳng chứa các sản phẩm
      if (items.length > 0 && typeof items[0] === 'object' && items[0].name) {
        return items.map((item, index) => (
          <div key={index} className="order-item">
            <div className="item-name">{item.name}</div>
            <div className="item-details">
              <span>SL: {item.quantity}</span>
              <span>{item.price}đ</span>
            </div>
          </div>
        ));
      } 
      // Nếu items là mảng lồng (mảng của mảng)
      else if (items.length > 0 && Array.isArray(items[0])) {
        return items[0].map((item, index) => (
          <div key={index} className="order-item">
            <div className="item-name">{item.name}</div>
            <div className="item-details">
              <span>SL: {item.quantity}</span>
              <span>{item.price}đ</span>
            </div>
          </div>
        ));
      }
    }
    
    return <div className="no-items">Không có thông tin sản phẩm</div>;
  };

  if (loading) {
    return <div className="my-orders-loading">Đang tải đơn hàng...</div>
  }

  if (error) {
    return <div className="my-orders-error">{error}</div>
  }

  if (orders.length === 0) {
    return (
      <div className="my-orders-empty">
        <h2>Bạn chưa có đơn hàng nào</h2>
        <button onClick={() => navigate('/')}>Tiếp tục mua sắm</button>
      </div>
    )
  }

  return (
    <div className="my-orders">
      <h1>Đơn hàng của tôi</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div className="order-id">
                <span>Mã đơn hàng:</span> #{order._id.substring(order._id.length - 8)}
              </div>
              <div className={`order-status ${getStatusColor(order.status)}`}>
                {order.status}
              </div>
            </div>
            
            <div className="order-date">
              <span>Ngày đặt:</span> {formatDate(order.date)}
            </div>
            
            <div className="order-items">
              <h3>Sản phẩm</h3>
              <div className="items-list">
                {renderItems(order.items)}
              </div>
            </div>
            
            <div className="order-address">
              <h3>Địa chỉ giao hàng</h3>
              <p>
                {order.address.firstName} {order.address.lastName}<br />
                {order.address.address}, {order.address.city}, {order.address.state}<br />
                {order.address.country}, {order.address.zip}<br />
                SĐT: {order.address.phone}
              </p>
            </div>
            
            <div className="order-total">
              <span>Tổng cộng:</span>
              <span className="total-amount">{order.amount}đ</span>
            </div>
            
            <div className="order-payment">
              <span>Trạng thái thanh toán:</span>
              <span className={order.payment ? 'payment-paid' : 'payment-pending'}>
                {order.payment ? 'Đã thanh toán' : 'Chưa thanh toán'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders
