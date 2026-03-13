const mongoose = require('mongoose');
const Message = require('./models/Message');
const Request = require('./models/Request');
const User = require('./models/User');
require('dotenv').config();

async function debug() {
  await mongoose.connect(process.env.MONGO_URI);
  
  const user = await User.findOne({ industryName: /Lakshmi Machine Works/i });
  if (!user) {
    console.log('User not found by industry name');
    process.exit(1);
  }

  console.log(`User Found: ${user.industryName} | Email: ${user.email} | ID: ${user._id}`);
  
  const msgCount = await Message.countDocuments({ receiver: user._id, read: false });
  const reqCount = await Request.countDocuments({ receiver: user._id, viewed: false });
  
  console.log(`DB Count - Messages: ${msgCount}`);
  console.log(`DB Count - Requests: ${reqCount}`);
  
  // List all unread message IDs
  const unreadMsgs = await Message.find({ receiver: user._id, read: false });
  console.log('Unread Message IDs:', unreadMsgs.map(m => m._id));

  process.exit(0);
}

debug();
