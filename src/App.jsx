import react from 'react';
import { Navbar } from './components/Navbar.jsx';
import { Routes,Route,useLocation } from 'react-router-dom';
import  Home  from './pages/Home.jsx';
import {Toaster} from 'react-hot-toast';
const App = () => {

  const isSellerPath = useLocation().pathname.startsWith('/seller');
  return (
    <div>
     {isSellerPath ? null : <Navbar />}
      <Toaster />
     
      <div className={`${isSellerPath ? "" :"px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;