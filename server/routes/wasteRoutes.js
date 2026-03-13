const express = require('express');
const router = express.Router();
const WasteItem = require('../models/WasteItem');
const { protect } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

router.post('/', protect, upload.single('image'), async (req, res) => {
  const { wasteType, quantity, location, description } = req.body;
  try {
    const waste = await WasteItem.create({
      industry: req.user._id,
      wasteType,
      quantity,
      location,
      description,
      image: req.file ? req.file.path : '',
    });
    res.status(201).json(waste);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const waste = await WasteItem.find().populate('industry', 'industryName industryType');
    res.json(waste);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/recommendations', protect, async (req, res) => {
  try {
    const myIndustryType = req.user.industryType;
    // Simple matching: if I'm Textile, show me Fabric waste from others
    // If I'm Manufacturing, show me Plastic, etc.
    let searchType = '';
    if (myIndustryType === 'Textile') searchType = 'Fabric';
    else if (myIndustryType === 'Manufacturing') searchType = 'Plastic';
    else if (myIndustryType === 'Chemical') searchType = 'Chemical';
    else if (myIndustryType === 'Heavy Industry') searchType = 'Metal';

    const recommendations = await WasteItem.find({
      wasteType: searchType,
      industry: { $ne: req.user._id }
    }).populate('industry', 'industryName industryType');
    
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
