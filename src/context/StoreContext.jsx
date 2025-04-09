import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

        const[cartItems,setCartItems] = useState({});

        const addToCart = (itemId) =>{
            console.log("Adding item ID:", itemId);
                if(!cartItems[itemId])
                {
                    setCartItems((prev)=>({...prev,[itemId]:1}))
                }
                else{
                    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
                }
            }
        const removeFromCart =(itemId) =>
            {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
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



        const conTextValue = {
            food_list,
            cartItems,
            setCartItems,
            addToCart,
            removeFromCart,
            getTotalCartAmount
        
        }   

        return (
            <StoreContext.Provider value={conTextValue}>
                {props.children}
            </StoreContext.Provider>
        )
    }

export default StoreContextProvider;