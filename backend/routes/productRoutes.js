const express = require('express');
const router = express.Router();
const { 
    getProducts, 
    createProduct, 
    getProductById, // අලුතින් එකතු කළා
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

// සියලුම බඩු බලන්න
router.get('/', getProducts);

// එක බඩුවක විස්තර බලන්න (මේක තමයි Details පේජ් එකට ඕනේ වෙන්නේ)
router.get('/:id', getProductById);

// බඩු ඇතුළත් කරන්න, වෙනස් කරන්න, මකන්න (Admin වැඩ)
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;