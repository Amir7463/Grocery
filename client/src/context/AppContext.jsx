import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();

  // ---------------- STATES ----------------
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return !!savedUser;
  });
  const [isSeller, setIsSeller] = useState(() => {
    const seller = localStorage.getItem("sellerEmail");
    return !!seller;
  });
  const [products, setProducts] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  // 🔥 Orders state (important)
  const [myOrders, setMyOrders] = useState([]);

  // 🔥 Guest ID generate
  const [guestId, setGuestId] = useState(() => {
    let id = localStorage.getItem("guestId");
    if (!id) {
      id = "guest_" + Date.now();
      localStorage.setItem("guestId", id);
    }
    return id;
  });

  // ---------------- CART ----------------
  const [cartItems, setCartItems] = useState(() =>
    JSON.parse(localStorage.getItem("guestCart")) || {}
  );

  // ---------------- Fetch current user ----------------
  const fetchCurrentUser = async () => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (err) {
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // ---------------- Fetch Products ----------------
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) setProducts(data.products);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ---------------- CART FUNCTIONS ----------------
  const syncCartToBackend = async (newCart) => {
    if (user?._id) {
      try {
        await axios.post("/api/cart/update", {
          userId: user._id,
          cartItems: newCart
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      localStorage.setItem("guestCart", JSON.stringify(newCart));
    }
  };

  const addToCart = (itemId) => {
    const newCart = { ...cartItems };
    newCart[itemId] = (newCart[itemId] || 0) + 1;
    setCartItems(newCart);
    syncCartToBackend(newCart);
  };

  const removeFromCart = (itemId) => {
    const newCart = { ...cartItems };
    if (newCart[itemId]) {
      newCart[itemId] -= 1;
      if (newCart[itemId] === 0) delete newCart[itemId];
    }
    setCartItems(newCart);
    syncCartToBackend(newCart);
  };

  const updateCartItem = (itemId, qty) => {
    const newCart = { ...cartItems };
    if (qty <= 0) delete newCart[itemId];
    else newCart[itemId] = qty;
    setCartItems(newCart);
    syncCartToBackend(newCart);
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((a, b) => a + b, 0);

  const getCartAmount = () => {
    let total = 0;
    for (let id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (product) total += product.offerPrice * cartItems[id];
    }
    return total;
  };

  // ---------------- CONTEXT VALUE ----------------
  const value = {
    // user
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    isSeller,
    setIsSeller,
    loadingUser,
    fetchCurrentUser,

    // products
    products,
    setProducts,

    // cart
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    updateCartItem,
    getCartCount,
    getCartAmount,

    // orders
    myOrders,
    setMyOrders,

    // guest
    guestId,

    // ui
    showLogin,
    setShowLogin,
    currency,
    navigate,
    axios
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
