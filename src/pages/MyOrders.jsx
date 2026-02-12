import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyOrders } from "../assets/assets";

const MyOrders = () => {

  const [myOrders, setMyOrders] = useState([]);
  const { currency } = useAppContext();

  useEffect(() => {
    setMyOrders(dummyOrders);
  }, []);

  return (
    <div className="mt-10 md:mt-16 pb-12 md:pb-16 px-3 md:px-0">

      {/* Heading */}
      <div className="flex flex-col items-start md:items-end w-max mb-6 md:mb-8">
        <p className="text-xl md:text-2xl font-medium uppercase">My Orders</p>
        <div className="w-12 md:w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      <div className="space-y-4 md:space-y-6">

        {myOrders.map((order,index)=>(
          <div key={index} className="border border-gray-300 rounded-lg p-3 md:p-5">

            {/* Order Top */}
            <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm text-gray-500 mb-3 md:mb-4 gap-1 sm:gap-2">
              <p>OrderId : {order._id}</p>
              <p>Payment : {order.paymentType}</p>
              <p>Total Amount : {currency}{order.amount}</p>
            </div>

            {/* Products */}
            {order.items.map((item,i)=>(
              <div key={i} className="flex flex-col md:flex-row md:justify-between md:items-center border-t pt-3 md:pt-4 mt-3 md:mt-4 gap-3">

                {/* Left */}
                <div className="flex gap-3 md:gap-4 items-center">

                  <img
                    src={item.product.image[0]}
                    alt={item.product.name}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md bg-gray-100"
                  />

                  <div>
                    <p className="font-medium text-sm md:text-base text-gray-700">
                      {item.product.name}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">
                      Category : {item.product.category}
                    </p>
                  </div>
                </div>

                {/* Middle */}
                <div className="text-xs md:text-sm text-gray-500 flex flex-wrap gap-x-4">
                  <p>Quantity : {item.quantity}</p>
                  <p>Status : {order.status}</p>
                  <p>Date : {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                {/* Right */}
                <p className="text-green-600 text-sm md:text-base font-medium">
                  Amount : {currency}{item.product.offerPrice * item.quantity}
                </p>

              </div>
            ))}

          </div>
        ))}

      </div>
    </div>
  );
};

export default MyOrders;
