import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import router from './routes/userRoutes.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './config/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';

dotenv.config();

connectCloudinary();

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();

const allowedOrigins = [
  'http://localhost:3000',               // Local development ke liye
  'http://localhost:5173',               // Vite local development ke liye
  'https://grocery-omega-gray.vercel.app' // Aapka LIVE Frontend (Vercel) link
];

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// agar local images use kar rahe ho to ye add karo
app.use("/uploads", express.static("uploads"));

app.get('/', (req, res) => {
  res.send('API is Working');
});

app.use('/api/user', router);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
