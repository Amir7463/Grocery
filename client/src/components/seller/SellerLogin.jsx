import React, { useEffect, useState } from 'react';
import { useAppContext } from "../../context/AppContext.jsx";
import { toast } from "react-hot-toast";

const SellerLogin = () => {
    const { isSeller, setIsSeller, navigate, axios } = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/api/seller/login', { email, password });

            if (data.success) {
                toast.success("Seller login successful");
                setIsSeller(true);

                // Optional: persist seller info if needed
                localStorage.setItem("sellerEmail", email);

                setTimeout(() => {
                    navigate('/seller');
                }, 500);
            } else {
                toast.error(data.message || "Login failed");
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        // Restore seller login state from localStorage
        const seller = localStorage.getItem("sellerEmail");
        if (seller) {
            setIsSeller(true);
            navigate('/seller');
        }
    }, [isSeller, setIsSeller, navigate]);

    return !isSeller && (
        <div className="min-h-screen flex items-center justify-center px-3">
            <form onSubmit={onSubmitHandler} className="bg-white w-full max-w-sm p-8 rounded-xl shadow-lg border border-gray-200">
                <p className="text-2xl font-medium text-center mb-6">
                    <span className="text-primary">Seller</span> Login
                </p>

                <div className="mb-4">
                    <label className="block mb-1 text-gray-600">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 outline-primary"
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-1 text-gray-600">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 outline-primary"
                    />
                </div>

                <button type="submit" className="w-full bg-primary hover:bg-primary-dull text-white py-2.5 rounded-md transition">
                    Login
                </button>
            </form>
        </div>
    );
};

export default SellerLogin;
