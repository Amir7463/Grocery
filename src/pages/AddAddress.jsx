import React, { useState } from 'react';
import add_address_image from '../assets/add_address_image.svg';
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


// ✅ Component name capital hona chahiye
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
    className="w-full px-3 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
  />
);

const AddAddress = () => {

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: ""
  });

  const handleChange = (e) => {
    setAddress(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const navigate = useNavigate();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(address);
     toast.success("Address Saved ✅");
    navigate("/cart");
  };

  return (
    <div className='mt-16 pb-16'>

      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping <span className="font-semibold text-primary">Address</span>
      </p>

      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>

        {/* FORM */}
        <div className="flex-1 max-w-md">

          <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>

            <div className="flex gap-3">
              <InputField type="text" placeholder="First Name" name="firstName" handleChange={handleChange} address={address} />
              <InputField type="text" placeholder="Last Name" name="lastName" handleChange={handleChange} address={address} />
            </div>

            <InputField type="email" placeholder="Email address" name="email" handleChange={handleChange} address={address} />

            <InputField type="text" placeholder="Street" name="street" handleChange={handleChange} address={address} />

            <div className="flex gap-3">
              <InputField type="text" placeholder="City" name="city" handleChange={handleChange} address={address} />
              <InputField type="text" placeholder="State" name="state" handleChange={handleChange} address={address} />
            </div>

            <div className="flex gap-3">
              <InputField type="text" placeholder="Zip code" name="zip" handleChange={handleChange} address={address} />
              <InputField type="text" placeholder="Country" name="country" handleChange={handleChange} address={address} />
            </div>

            <InputField type="text" placeholder="Phone" name="phone" handleChange={handleChange} address={address} />

            <button className="w-full bg-primary hover:bg-primary-dull text-white py-3 rounded mt-3">
              SAVE ADDRESS
            </button>

          </form>

        </div>

        {/* IMAGE */}
        <img
          className='md:mr-16 mb-16 md:mb-0'
          src={add_address_image}
          alt="Add Address Illustration"
        />

      </div>
    </div>
  );
};

export default AddAddress;
