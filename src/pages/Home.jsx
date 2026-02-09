import React from 'react';
import  MainBanner  from '../components/MainBanner.jsx';
import Categories from '../components/Categories.jsx';
import BestSeller from '../components/BestSeller.jsx';
import BottomBanner from '../components/BottomBanner.jsx';
import NewsLater from '../components/NewsLater.jsx';


const Home = () => {
    return (
        <div className="mt-10">
        <MainBanner />
        <Categories />
        <BestSeller />
        <BottomBanner />
        <NewsLater />
        </div>
    )
}
export default Home;