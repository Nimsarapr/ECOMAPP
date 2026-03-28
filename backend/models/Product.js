const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    image: { type: String, required: true },
    countInStock: { type: Number, required: true, default: 0 }
}, { timestamps: true });

// මේ පේළිය අතිශය වැදගත්!
// පරණ පේළිය වෙනුවට මේක දාන්න (මේකෙන් බලනවා දැනටමත් model එක හදලද තියෙන්නේ කියලා)
module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);