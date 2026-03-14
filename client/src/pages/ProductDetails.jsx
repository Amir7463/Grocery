import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import { useParams, Link } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import ProductCard from '../components/ProductCard.jsx';

const ProductDetails = () => {
  const { products, currency, addToCart, navigate } = useAppContext();
  const { id } = useParams();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  // Find the current product
  const product = products.find((item) => item._id === id);

  // ==================== Related Products ====================
  useEffect(() => {
    if (products.length > 0 && product) {
      const related = products
        .filter((p) => p.category === product.category && p._id !== product._id)
        .slice(0, 5);
      setRelatedProducts(related);
    }
  }, [products, product]);

  // ==================== Thumbnail ====================
  // Ensure images exist and set first one as thumbnail
  const productImages = Array.isArray(product?.images) ? product.images : [];
  useEffect(() => {
    if (productImages.length > 0) setThumbnail(productImages[0]);
  }, [productImages]);

  // ==================== Safe Description ====================
  const descriptionList = Array.isArray(product?.description)
    ? product.description
    : product?.description
    ? [product.description]
    : [];

  // ==================== Loading State ====================
  if (!product) return <div className="mt-12 text-center">Loading...</div>;

  return (
    <div className="mt-12">
      {/* Breadcrumb */}
      <p>
        <Link to="/">Home</Link> /{' '}
        <Link to="/products">Products</Link> /{' '}
        <Link to={`/products/${product.category.toLowerCase()}`}>{product.category}</Link> /{' '}
        <span className="text-primary">{product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-4">
        {/* Images */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {productImages.map((img, index) => (
              <div
                key={index}
                className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                onClick={() => setThumbnail(img)}
              >
                <img
                  src={img || assets.fallback_image}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>

          {/* Selected Thumbnail */}
          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
            <img
              src={thumbnail || assets.fallback_image}
              alt="selected product"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          <div className="mt-1 flex items-center gap-0.5">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="star rating"
                  className="md:w-4 w-3.5"
                />
              ))}
            <p className="ml-2 text-base">(4)</p>
          </div>

          <div className="mt-6">
            <p className="text-gray-500/70 line-through">
              MRP: {currency}{product.price}
            </p>
            <p className="text-2xl font-medium">
              Price: {currency}{product.offerPrice}
            </p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            {descriptionList.map((desc, idx) => (
              <li key={idx}>{desc}</li>
            ))}
          </ul>

          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              className="w-full py-3.5 font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              onClick={() => addToCart(product._id)}
            >
              Add to Cart
            </button>

            <button
              className="w-full py-3.5 font-medium bg-primary text-white hover:bg-primary-dull transition"
              onClick={() => {
                addToCart(product._id);
                navigate('/cart');
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20 flex flex-col items-center">
        <div className="flex flex-col items-center w-max">
          <p className="text-3xl font-medium">Related Products</p>
          <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
          {relatedProducts.map((p, i) => (
            <ProductCard key={i} product={p} />
          ))}
        </div>

        <button
          onClick={() => { navigate('/products'); scrollTo(0, 0); }}
          className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition"
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
