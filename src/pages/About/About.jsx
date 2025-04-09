import React from 'react';
import './About.css'; // Optional: Add styling later

const About = () => {
  return (
    <div className='about-page'>
      <h1>Về chúng tôi</h1>
      <p>
        Chào mừng bạn đến với FoodOrder! Chúng tôi đam mê kết nối bạn với những món ăn ngon từ các nhà hàng địa phương yêu thích của bạn.
      </p>
      <p>
        Sứ mệnh của chúng tôi là cung cấp trải nghiệm đặt món ăn đơn giản, nhanh chóng và đáng tin cậy. Dù bạn thèm pizza, mì ống, salad hay món ngọt, chúng tôi đều có thể đáp ứng.
      </p>
      <p>
        Ứng dụng này được xây dựng bằng các công nghệ web hiện đại như React, Vite và React Router. Chúng tôi sử dụng Context API để quản lý trạng thái nhằm đảm bảo trải nghiệm người dùng mượt mà.
      </p>
      <h2>Tầm nhìn của chúng tôi</h2>
      <p>
        Trở thành nền tảng đặt món ăn hàng đầu, được yêu thích bởi sự tiện lợi, đa dạng và chất lượng dịch vụ.
      </p>
      <h2>Giá trị cốt lõi</h2>
      <ul>
        <li><strong>Khách hàng là trọng tâm:</strong> Luôn lắng nghe và đáp ứng nhu cầu của khách hàng.</li>
        <li><strong>Chất lượng:</strong> Đảm bảo chất lượng món ăn và dịch vụ giao hàng.</li>
        <li><strong>Đổi mới:</strong> Không ngừng cải tiến công nghệ và quy trình.</li>
        <li><strong>Đối tác tin cậy:</strong> Xây dựng mối quan hệ bền vững với các nhà hàng.</li>
      </ul>
      <h2>Đội ngũ của chúng tôi</h2>
      <p>
        Chúng tôi là một đội ngũ gồm những người đam mê ẩm thực và công nghệ, luôn nỗ lực mang đến dịch vụ tốt nhất cho bạn.
      </p>
      {/* You can add more sections like Mission, Vision, Values, etc. */}
    </div>
  );
};

export default About; 