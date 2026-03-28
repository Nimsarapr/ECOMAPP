const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// 1. Config load කිරීම
dotenv.config();

// 2. App එක හදන්න (මේක තමයි උඩින්ම තියෙන්න ඕනේ)
const app = express();

// 3. Middleware සැකසීම
app.use(express.json());
app.use(cors());

// 4. Routes Import කිරීම
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes'); // මේක අනිවාර්යයෙන්ම තියෙන්න ඕනේ

// 5. Routes පාවිච්චි කිරීම
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Upload folder එක static විදිහට පාවිච්චි කිරීම
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// 6. MongoDB සම්බන්ධ කිරීම
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Database Connected Successfully!"))
    .catch(err => console.log("Database Connection Error: ", err));

app.get('/', (req, res) => {
    res.send("API is running...");
});

// 7. Server එක පණගැන්වීම
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});