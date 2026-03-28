const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();

// පින්තූරය සේව් වෙන්න ඕනේ තැන සහ නම තීරණය කිරීම
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // පින්තූර සේව් වෙන්නේ මෙතනට
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// API එක: /api/upload
router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`); // සේව් වුණ තැන ලින්ක් එක ආපහු එවනවා
});

module.exports = router;