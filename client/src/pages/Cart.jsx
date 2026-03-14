import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { toast } from "react-hot-toast";
import axios from "axios";
import { assets } from "../assets/assets.js";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItem,
    getCartCount,
    getCartAmount,
    navigate,
    user,
    setShowLogin
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const [guestId, setGuestId] = useState(null);

  // ---------------- Build cart array ----------------
  useEffect(() => {
    const arr = [];
    for (let id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (product) arr.push({ ...product, quantity: cartItems[id] });
    }
    setCartArray(arr);
  }, [products, cartItems]);

  // ---------------- Guest ID ----------------
  useEffect(() => {
    let id = localStorage.getItem("guestId");
    if (!id) {
      id = "guest-" + Date.now();
      localStorage.setItem("guestId", id);
    }
    setGuestId(id);
  }, []);

  // ---------------- Fetch addresses ----------------
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        let data = [];
        if (user?._id) {
          const res = await axios.get(`/api/address/get?userId=${user._id}`);
          data = res.data;
        } else if (guestId) {
          const res = await axios.get(`/api/address/get?guestId=${guestId}`);
          data = res.data;
        }
        setAddresses(data);
        if (data.length > 0) setSelectedAddress(data[data.length - 1]);
      } catch (err) {
        console.error(err);
      }
    };
    if (guestId || user?._id) fetchAddresses();
  }, [user, guestId]);

  // ---------------- Place Order ----------------
  const placeOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    if (cartArray.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    try {
      const orderItems = cartArray.map(item => ({
        product: item._id,
        quantity: item.quantity
      }));

      const payload = {
        items: orderItems,
        address: selectedAddress,
      };

      if (user?._id) payload.userId = user._id;
      else payload.guestId = guestId;

      const res = await axios.post("/api/order/cod", payload);

      if (res.data.success) {
        toast.success("Order placed successfully ✅");
        navigate("/"); 
      } else {
        toast.error(res.data.message || "Failed to place order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while placing order");
    }
  };

  if (cartArray.length === 0) return <div className="mt-12 text-center">Cart is empty</div>;

  return (
    <div className="flex flex-col md:flex-row mt-16 gap-8">
      {/* Cart Items */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product) => (
          <div key={product._id} className="grid grid-cols-[2fr_1fr_1fr] items-center text-gray-500 text-sm md:text-base font-medium pt-3">
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden"
              >
                <img className="max-w-full h-full object-cover" src={product.images[0]} alt={product.name} />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>Weight: <span>{product.Weight || "N/A"}</span></p>
                  <div className="flex items-center gap-2 mt-1">
                    <p>Qty:</p>
                    <select
                      value={cartItems[product._id]}
                      className="outline-none border rounded px-1"
                      onChange={(e) => updateCartItem(product._id, Number(e.target.value))}
                    >
                      {Array(20).fill("").map((_, idx) => (
                        <option key={idx} value={idx + 1}>{idx + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
            <button onClick={() => removeFromCart(product._id)} className="cursor-pointer mx-auto">
              <img src={assets.refresh_icon} alt="Remove" className="inline-block w-6 h-6" />
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address found"}
            </p>
            <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline cursor-pointer">Change</button>

            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10">
                {addresses.map((addr, idx) => (
                  <p key={idx} onClick={() => { setSelectedAddress(addr); setShowAddress(false); }} className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer">
                    {addr.street}, {addr.city}, {addr.state}, {addr.country}
                  </p>
                ))}
                <p onClick={() => navigate("/add-address")} className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10">
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select value={paymentOption} onChange={(e) => setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between"><span>Price</span><span>{currency}{getCartAmount()}</span></p>
          <p className="flex justify-between"><span>Shipping Fee</span><span className="text-green-600">Free</span></p>
          <p className="flex justify-between"><span>Tax (2%)</span><span>{currency}{(getCartAmount() * 2 / 100).toFixed(2)}</span></p>
          <p className="flex justify-between text-lg font-medium mt-3"><span>Total Amount:</span><span>{currency}{(getCartAmount() * 1.02).toFixed(2)}</span></p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Pay"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
