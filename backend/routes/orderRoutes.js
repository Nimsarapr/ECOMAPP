const express = require('express');
const router = express.Router();
// මේ පේළියේ { } ඇතුළට getMyOrders කියන එකත් දාන්න
const { addOrderItems, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addOrderItems); // ඇණවුමක් දාන්න ලොග් වෙලා ඉන්නම ඕනේ
router.get('/myorders', protect, getMyOrders);

module.exports = router;