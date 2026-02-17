import express from 'express';
import { addProduct, productList, productById, changeStock } from '../controllers/productController.js';
import { upload } from '../config/multer.js';
import authSeller from '../middlewares/authSeller.js';

const productRouter = express.Router();

productRouter.post(
  '/add',
  authSeller,
  upload.array('images', 4),
  addProduct
);

productRouter.get('/list', productList);
productRouter.get('/:id', productById);
productRouter.post('/stock', authSeller, changeStock);

export default productRouter;
