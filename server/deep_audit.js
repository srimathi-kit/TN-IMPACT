const mongoose = require('mongoose');
const Message = require('./models/Message');
const User = require('./models/User');
require('dotenv').config();

async function deepAudit() {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({ email: 'admin@lmw.co.in' });
  
  const unread = await Message.find({ receiver: user._id, read: false }).populate('sender', 'industryName');
  
  console.log(`User: ${user.industryName}`);
  console.log(`Total Unread: ${unread.length}`);
  unread.forEach(m => {
    console.log(`- From: ${m.sender.industryName} (${m.sender._id}) - Msg: ${m.message}`);
  });

  process.exit(0);
}

deepAudit();
