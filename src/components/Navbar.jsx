import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { useAppContext } from '../context/AppContext.jsx'

export const Navbar = () => {

const [open, setOpen] = useState(false)

const {
  user,
  setUser,
  isSeller,
  setIsSeller,
  isLoggedIn,
  setIsLoggedIn,
  navigate,
  setSearchQuery,
  searchQuery,
  getCartCount,
  setShowLogin,
} = useAppContext();

const logout = async () => {
  setUser(null);
  navigate('/');
}

useEffect(() => {
  if (searchQuery.length > 0) {
    navigate('/products');
  }
}, [searchQuery, navigate]);

return (
<nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

<NavLink to='/'>
  <img className="h-9" src={assets.logo} alt="Logo" />
</NavLink>

<div className="hidden sm:flex items-center gap-8">
  <NavLink to='/'>Home</NavLink>
  <NavLink to='/products'>All Products</NavLink>
  <NavLink to='/'>Contact</NavLink>

  <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
    <input
      onChange={(e) => setSearchQuery(e.target.value)}
      className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
      type="text"
      placeholder="Search products"
    />
    <img className="h-4 w-4" src={assets.search_icon} alt="Search Icon" />
  </div>

  <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
    <img className="opacity-80 w-6" src={assets.nav_cart_icon} alt="Cart Icon" />
    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
      {getCartCount()}
    </button>
  </div>

  {!user ? (
    <button
      onClick={() => setShowLogin(true)}
      className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
      Login
    </button>
  ) : (
    <div className="relative group flex items-center py-3 cursor-pointer"
>

      <img
        src={assets.profile_icon}
        alt="Profile Icon"
        className="w-8 h-8 rounded-full cursor-pointer"
      />

      <ul className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute top-full right-0 transition-all duration-200 bg-white shadow border border-gray-200 py-2.5 w-32 rounded-md text-sm z-40"
>

        <li
          className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
          onClick={() => navigate('/my-orders')}>
          My Orders
        </li>

        <li
          className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
          onClick={logout}>
          Logout
        </li>

      </ul>
    </div>
  )}
</div>

<div className='flex items-center gap-6 sm:hidden'>
  <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
    <img className="opacity-80 w-6" src={assets.nav_cart_icon} alt="Cart Icon" />
    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
      {getCartCount()}
    </button>
  </div>

  <button
    onClick={() => open ? setOpen(false) : setOpen(true)}
    aria-label="Menu">
    <img className="h-6 w-6" src={assets.menu_icon} alt="Menu Icon" />
  </button>
</div>

{open && (
  <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-2 px-5 text-sm md:hidden">
    <NavLink to='/' onClick={() => setOpen(false)}>Home</NavLink>
    <NavLink to='/products' onClick={() => setOpen(false)}>All Products</NavLink>
    {user && <NavLink to='/products' onClick={() => setOpen(false)}>My Orders</NavLink>}
    <NavLink to='/' onClick={() => setOpen(false)}>Contact</NavLink>

    {!user ? (
      <button
        className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
        onClick={() => {
          setOpen(false);
          setShowLogin(true);
        }}>
        Login
      </button>
    ) : (
      <button
        onClick={logout}
        className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
        Logout
      </button>
    )}
  </div>
)}

</nav>
)
}
