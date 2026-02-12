import React from 'react';
import { useEffect, useState } from 'react';
import { useAppContext } from "../../context/AppContext.jsx";


const SellerLogin = () => {

    const { isSeller, setIsSeller, navigate } = useAppContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsSeller(true);
    };

    useEffect(() => {
        if (isSeller) {
            navigate('/seller');
        }
    }, [isSeller]);

    return !isSeller && (
        <div className="min-h-screen flex items-center justify-center  px-3">

            <form
                onSubmit={onSubmitHandler}
                className="bg-white w-full max-w-sm p-8 rounded-xl shadow-lg border border-gray-200"
            >

                <p className="text-2xl font-medium text-center mb-6">
                    <span className="text-primary">Seller</span> Login
                </p>

                <div className="mb-4">
                    <label className="block mb-1 text-gray-600">Email</label>
                    <input
                        type="email"
                        placeholder="admin@example.com"
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
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 outline-primary"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dull text-white py-2.5 rounded-md transition"
                >
                    Login
                </button>

            </form>
        </div>
    );
};

export default SellerLogin;
