const mongoose = require('mongoose');
const Message = require('./models/Message');
const Request = require('./models/Request');
const User = require('./models/User');
require('dotenv').config();

async function nuclearReset() {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({ email: 'admin@lmw.co.in' });
  
  if (!user) {
    console.log('User admin@lmw.co.in not found');
    process.exit(1);
  }

  // FORCE everything to read/viewed
  const msgResult = await Message.updateMany(
    { receiver: user._id },
    { $set: { read: true } }
  );
  
  const reqResult = await Request.updateMany(
    { receiver: user._id },
    { $set: { viewed: true } }
  );
  
  console.log(`NUCLEAR RESET COMPLETE for ${user.industryName}`);
  console.log(`- Messages cleared: ${msgResult.modifiedCount}`);
  console.log(`- Requests cleared: ${reqResult.modifiedCount}`);
  
  process.exit(0);
}

nuclearReset();
