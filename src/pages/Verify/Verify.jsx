import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import './Verify.css'

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('order_id');
  const navigate = useNavigate();
  const { url, token, clearCart } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const updateOrderStatus = async () => {
      try {
        if (success === 'true' && orderId) {
          // Cập nhật trạng thái đơn hàng thành công
          const response = await axios.post(
            `${url}/api/order/update-status`,
            { orderId, status: 'Đã thanh toán', payment: true },
            { headers: { token } }
          );

          if (response.data.success) {
            // Xóa giỏ hàng sau khi thanh toán thành công
            await clearCart();
            setMessage('Thanh toán thành công! Đơn hàng của bạn đang được xử lý.');
          } else {
            setMessage('Đã xảy ra lỗi khi cập nhật đơn hàng.');
          }
        } else {
          setMessage('Thanh toán không thành công hoặc đã bị hủy.');
        }
      } catch (error) {
        console.error('Lỗi khi cập nhật đơn hàng:', error);
        setMessage('Đã xảy ra lỗi khi cập nhật đơn hàng.');
      } finally {
        setLoading(false);
      }
    };

    updateOrderStatus();
  }, [success, orderId, url, token, clearCart]);

  return (
    <div className="verify-container">
      {loading ? (
        <div className="loading">Đang xử lý đơn hàng...</div>
      ) : (
        <div className="verify-result">
          <div className={`verify-status ${success === 'true' ? 'success' : 'failed'}`}>
            {success === 'true' ? '✓' : '✗'}
          </div>
          <h2>{success === 'true' ? 'Thanh toán thành công!' : 'Thanh toán thất bại'}</h2>
          <p>{message}</p>
          <div className="verify-buttons">
            <button onClick={() => navigate('/')}>Quay lại trang chủ</button>
            {success !== 'true' && (
              <button onClick={() => navigate('/cart')}>Thử lại</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Verify 