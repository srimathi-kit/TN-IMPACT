const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const { protect } = require('../middleware/auth');

router.post('/', protect, async (req, res) => {
  const { receiver, wasteItem, message } = req.body;
  try {
    const request = await Request.create({
      sender: req.user._id,
      receiver,
      wasteItem,
      message,
    });
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const requests = await Request.find({ 
      $or: [{ sender: req.user._id }, { receiver: req.user._id }] 
    }).populate('sender receiver wasteItem');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  const { status } = req.body;
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    
    if (request.receiver.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this request' });
    }
    
    request.status = status;
    await request.save();
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/count', protect, async (req, res) => {
  try {
    const count = await Request.countDocuments({ receiver: req.user._id, viewed: false });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/mark-viewed', protect, async (req, res) => {
  try {
    await Request.updateMany(
      { receiver: req.user._id, viewed: false },
      { $set: { viewed: true } }
    );
    res.json({ message: 'Requests marked as viewed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
