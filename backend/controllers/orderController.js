const Order = require('../models/Order');
const Product = require('../models/product');

const addOrderItems = async (req, res) => {
    const { orderItems, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: "No order items" });
    } else {
        const order = new Order({
            user: req.user._id, // ලොග් වෙලා ඉන්න කෙනාගේ ID එක
            orderItems,
            totalPrice
        });

        const createdOrder = await order.save();

        // Business Logic: බඩුවක් ගත්තම Stock එක අඩු කිරීම
        for (const item of orderItems) {
            const product = await Product.findById(item.product);
            if (product) {
                product.countInStock -= item.qty;
                await product.save();
            }
        }

        res.status(201).json(createdOrder);
    }
};

module.exports = { addOrderItems };
// ලොග් වෙලා ඉන්න යූසර්ගේ ඕඩර්ස් විතරක් ලබා ගැනීම
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Exports වලට මේකත් දාන්න
module.exports = { addOrderItems, getMyOrders };