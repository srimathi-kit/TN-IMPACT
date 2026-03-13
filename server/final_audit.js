const mongoose = require('mongoose');
const Message = require('./models/Message');
const User = require('./models/User');
require('dotenv').config();

async function finalAudit() {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({ email: 'admin@lmw.co.in' });
  
  const allMessagesToUser = await Message.find({ receiver: user._id }).populate('sender', 'industryName');
  
  console.log(`User: ${user.industryName} (${user._id})`);
  console.log(`Total messages received: ${allMessagesToUser.length}`);
  
  const unread = allMessagesToUser.filter(m => !m.read);
  console.log(`Total unread messages: ${unread.length}`);
  
  unread.forEach(m => {
    console.log(`- ID: ${m._id} | From: ${m.sender?.industryName || 'Unknown'} (${m.sender?._id || 'NoID'}) | Read: ${m.read} | Msg: ${m.message}`);
  });

  process.exit(0);
}

finalAudit();
