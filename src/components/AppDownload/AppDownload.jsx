import React from 'react'
import { assets } from '../../assets/assets'
import './AppDownload.css'
const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>Để có trải nghiệm tốt hơn, hãy tải về ứng dụng FoodOrder</p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="Tải về từ Google Play"/>
        <img src={assets.app_store} alt="Tải về từ App Store" />
      </div>
    </div>
  )
}

export default AppDownload
