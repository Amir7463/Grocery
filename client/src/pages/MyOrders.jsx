import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const MyOrders = () => {
  const { currency, user, guestId, myOrders, setMyOrders } = useAppContext();
  const [loading, setLoading] = useState(true);

  const boxIcon =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user?._id && !guestId) {
          setMyOrders([]);
          setLoading(false);
          return;
        }

        const query = user?._id
          ? `?userId=${user._id}`
          : `?guestId=${guestId}`;

        const res = await axios.get(`/api/order/user${query}`);

        if (res.data.success) {
          setMyOrders(res.data.orders || []);
        } else {
          setMyOrders([]);
        }
      } catch (err) {
        console.error(err);
        setMyOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, guestId, setMyOrders]);

  if (loading) return <p className="p-6">Loading orders...</p>;

  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">My Orders</h2>

      {myOrders?.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        myOrders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] 
                       md:items-center gap-5 p-5 max-w-4xl rounded-md 
                       border border-gray-300 text-gray-800"
          >
            {/* Products Section */}
            <div className="flex gap-5">
              <img
                className="w-12 h-12 object-cover opacity-60"
                src={boxIcon}
                alt="boxIcon"
              />
              <div>
                {order.items?.map((item, index) => (
                  <div key={index} className="flex flex-col justify-center">
                    <p className="font-medium">
                      {item.product?.name || "Product"}{" "}
                      <span
                        className={`text-indigo-500 ${
                          item.quantity < 2 && "hidden"
                        }`}
                      >
                        x {item.quantity}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Address Section */}
            <div className="text-sm">
              <p className="font-medium mb-1">
                {order.address?.firstName} {order.address?.lastName}
              </p>
              <p>
                {order.address?.street}, {order.address?.city},{" "}
                {order.address?.state}, {order.address?.zipcode},{" "}
                {order.address?.country}
              </p>
            </div>

            {/* Amount */}
            <p className="font-medium text-base my-auto text-black/70">
              {currency}
              {order.amount}
            </p>

            {/* Payment Info */}
            <div className="flex flex-col text-sm">
              <p>Method: {order.paymentType}</p>
              <p>
                Date:{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p>
                Payment:{" "}
                <span
                  className={
                    order.isPaid ? "text-green-600" : "text-red-500"
                  }
                >
                  {order.isPaid ? "Paid" : "Pending"}
                </span>
              </p>
              <p>Status: {order.status}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
