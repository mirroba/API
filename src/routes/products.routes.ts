import { Router } from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    changePrice
} from '../controllers/products.controller';

const router = Router();

router.get('/', getProducts);
router.get('/getById/:id', getProductById);
router.post('/create', createProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);
router.patch('/change-price/:id', changePrice);

export default router;