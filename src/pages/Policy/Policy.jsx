import React from 'react';
import './Policy.css'; // Import CSS for styling

const Policy = () => {
  return (
    <div className='policy-page'>
      <h1>Chính sách và Điều khoản</h1>

      <section>
        <h2>1. Chính sách Bảo mật Thông tin Cá nhân</h2>
        <p>
          Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Thông tin thu thập (như tên, địa chỉ, email, số điện thoại) chỉ được sử dụng cho mục đích xử lý đơn hàng, giao hàng và liên lạc liên quan đến dịch vụ của FoodOrder.
        </p>
        <p>
          Chúng tôi không chia sẻ thông tin cá nhân của bạn với bất kỳ bên thứ ba nào khác ngoại trừ các đối tác vận chuyển để thực hiện việc giao hàng.
        </p>
        <p>
          Dữ liệu của bạn được lưu trữ an toàn và chỉ được truy cập bởi nhân viên có thẩm quyền.
        </p>
      </section>

      <section>
        <h2>2. Chính sách Đặt hàng và Thanh toán</h2>
        <p>
          Bạn có thể đặt hàng trực tiếp qua website. Vui lòng kiểm tra kỹ thông tin đơn hàng (món ăn, số lượng, địa chỉ giao hàng) trước khi xác nhận.
        </p>
        <p>
          Hiện tại, chúng tôi hỗ trợ thanh toán khi nhận hàng (COD). Chúng tôi đang nỗ lực để tích hợp thêm các phương thức thanh toán trực tuyến trong tương lai.
        </p>
      </section>

      <section>
        <h2>3. Chính sách Giao hàng</h2>
        <p>
          Phí giao hàng sẽ được tính dựa trên khoảng cách và được hiển thị rõ ràng trong quá trình đặt hàng. Hiện tại, chúng tôi áp dụng mức phí giao hàng cố định là 2đ (đây chỉ là ví dụ, cần cập nhật thực tế).
        </p>
        <p>
          Thời gian giao hàng dự kiến sẽ được thông báo sau khi bạn đặt hàng. Chúng tôi cố gắng giao hàng trong thời gian sớm nhất có thể.
        </p>
      </section>

      <section>
        <h2>4. Chính sách Đổi trả và Hoàn tiền</h2>
        <p>
          Nếu có bất kỳ vấn đề nào về chất lượng món ăn hoặc sai sót trong đơn hàng, vui lòng liên hệ ngay với chúng tôi qua số điện thoại hoặc email được cung cấp tại mục Liên hệ để được hỗ trợ kịp thời. Tùy trường hợp cụ thể, chúng tôi sẽ có chính sách đổi trả hoặc hoàn tiền phù hợp.
        </p>
      </section>

      <section>
        <h2>5. Điều khoản Sử dụng</h2>
        <p>
          Bằng việc sử dụng trang web này, bạn đồng ý tuân thủ các chính sách và điều khoản đã nêu. Chúng tôi có quyền thay đổi các chính sách này vào bất kỳ lúc nào mà không cần thông báo trước. Vui lòng truy cập trang này thường xuyên để cập nhật.
        </p>
      </section>

    </div>
  );
};

export default Policy; 