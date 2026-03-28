const Product = require('../models/Product');

// 1. සියලුම භාණ්ඩ ලබා ගැනීම
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. එක භාණ්ඩයක විස්තර ලබා ගැනීම (මෙන්න මේකයි අඩුවෙලා තිබුණේ)
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. අලුත් භාණ්ඩයක් ඇතුළත් කිරීම
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, image, countInStock } = req.body;
        const product = new Product({ name, description, price, category, image, countInStock });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. භාණ්ඩයක් මැකීම
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: "Product removed" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 5. භාණ්ඩයක විස්තර වෙනස් කිරීම
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.name = req.body.name || product.name;
            product.price = req.body.price || product.price;
            // අනිත් field ටිකත් මේ වගේම දාන්න පුළුවන්...
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProducts, getProductById, createProduct, deleteProduct, updateProduct };