import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

        const[cartItems,setCartItems] = useState({});
        const url = "https://food-order-backend-5afp.onrender.com";
        const [token,setToken] = useState("");
        const[food_list,setFoodList] = useState([]);
        
        // Save cart to localStorage whenever it changes
        useEffect(() => {
            if (Object.keys(cartItems).length > 0) {
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
            }
        }, [cartItems]);
        
        const addToCart = async(itemId) =>{
            console.log("Adding item ID:", itemId);
                if(!cartItems[itemId])
                {
                    setCartItems((prev)=>({...prev,[itemId]:1}))
                }
                else{
                    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
                }
                if(token)
                {
                    await axios.post(`${url}/api/cart/add`,{itemId},{headers:{token}})
                }
            }
        const removeFromCart = async(itemId) =>
        {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
            if(cartItems[itemId] <= 1) {
                // Remove item completely if count reaches 0
                const updatedCart = {...cartItems};
                delete updatedCart[itemId];
                setCartItems(updatedCart);
            }
            
            if(token)
            {
                await axios.post(`${url}/api/cart/remove`,{itemId},{headers:{token}})
            }
        }
        const loadCartData = async() =>{
            if(token)
            {
                try {
                    const response = await axios.post(`${url}/api/cart/get`,{},{headers:{token}})
                    setCartItems(response.data.cartData);
                } catch (error) {
                    console.error("Error loading cart data:", error);
                }
            }
        }

        // Xóa toàn bộ giỏ hàng
        const clearCart = async() => {
            setCartItems({});
            localStorage.removeItem('cartItems');
            
            if(token) {
                try {
                    await axios.post(`${url}/api/cart/clear`, {}, {headers:{token}});
                } catch (error) {
                    console.error("Lỗi khi xóa giỏ hàng:", error);
                }
            }
        }

        const getTotalCartAmount = () => {
            let totalAmount = 0;
            for(const item in cartItems)
            {
                if(cartItems[item] > 0)
                {
                    let itemInfo = food_list.find((products)=>products._id===item)
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
            return totalAmount;
        }
        
        const fetchFoodList = async() => {
            try {
                const response = await axios.get(`${url}/api/food/list`);
                setFoodList(response.data.data);
            } catch (error) {
                console.error("Error fetching food list:", error);
            }
        }
        
        // Initial data loading
        useEffect(()=>{
            async function fetchData(){
                await fetchFoodList();
                
                // First load the cart from localStorage - this will work even without login
                const savedCart = localStorage.getItem('cartItems');
                if(savedCart) {
                    try {
                        const parsedCart = JSON.parse(savedCart);
                        setCartItems(parsedCart);
                        console.log("Loaded cart from localStorage:", parsedCart);
                    } catch (error) {
                        console.error("Error parsing saved cart:", error);
                        localStorage.removeItem('cartItems');
                    }
                }
                
                // Then check if user is logged in - server cart takes precedence if available
                if(localStorage.getItem("token")){
                    setToken(localStorage.getItem("token"));
                    await loadCartData();
                }
            }
            fetchData();
        },[])


        const conTextValue = {
            food_list,
            cartItems,
            setCartItems,
            addToCart,
            removeFromCart,
            clearCart,
            getTotalCartAmount,
            url,
            token,
            setToken,
        
        }   

        return (
            <StoreContext.Provider value={conTextValue}>
                {props.children}
            </StoreContext.Provider>
        )
    }

export default StoreContextProvider;