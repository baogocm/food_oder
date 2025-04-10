import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

        const[cartItems,setCartItems] = useState({});
        const url = "http://localhost:5000";
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
            if(token)
            {
                await axios.post(`${url}/api/cart/remove`,{itemId},{headers:{token}})
            }
        }
        const loadCartData = async() =>{
            if(token)
            {
                const response = await axios.post(`${url}/api/cart/get`,{},{headers:{token}})
                setCartItems(response.data.cartData);
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
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        }
        useEffect(()=>{
            async function fetchData(){
                await fetchFoodList();
                // First check localStorage for cart items
                const savedCart = localStorage.getItem('cartItems');
                if(savedCart) {
                    setCartItems(JSON.parse(savedCart));
                }
                
                // Then check if user is logged in
                if(localStorage.getItem("token")){
                    setToken(localStorage.getItem("token"));
                    await loadCartData(localStorage.getItem("token"));
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