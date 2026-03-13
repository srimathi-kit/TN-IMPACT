const mongoose = require('mongoose');
const Message = require('./models/Message');
const Request = require('./models/Request');
const User = require('./models/User');
require('dotenv').config();

async function checkCounts() {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({ email: 'admin@lmw.co.in' });
  if (!user) {
    console.log('User not found');
    process.exit(1);
  }

  const unreadMessages = await Message.countDocuments({ receiver: user._id, read: false });
  const pendingRequests = await Request.countDocuments({ receiver: user._id, status: 'pending' });

  console.log(`User: ${user.industryName}`);
  console.log(`Unread Messages: ${unreadMessages}`);
  console.log(`Pending Requests: ${pendingRequests}`);
  console.log(`Total Notification Count: ${unreadMessages + pendingRequests}`);

  process.exit(0);
}

checkCounts();
