import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import About from './pages/About/About'
import Policy from './pages/Policy/Policy'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const[showLogin,setShowLogin] = useState(false)

  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
      <Navbar setShowLogin = {setShowLogin}/>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/cart" element={<Cart />} />
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
