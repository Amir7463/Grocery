import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});

    // Fetch products (dummy implementation)
    const fetchProducts = async () => {
        setProducts(dummyProducts);
    }

    // Add Product to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Item added to cart");
    }

    // update cart  items quantity
    const updateCartItem = () => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart updated");
    }

    // removw Product from Cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
       if(cartData[itemId]) {
            cartData[itemId] -= 1;
            if(cartData[itemId] === 0) {
                delete cartData[itemId];
            }
       }
       toast.success("Item removed from cart");
       setCartItems(cartData);
    }


    useEffect(() => {
        fetchProducts();
    }, []);

    const value = {navigate, user, setUser, isSeller, setIsSeller, isLoggedIn, setIsLoggedIn, products, setProducts, currency,addToCart, cartItems, setCartItems,updateCartItem,removeFromCart}; 
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}