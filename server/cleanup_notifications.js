const mongoose = require('mongoose');
const Request = require('./models/Request');
const User = require('./models/User');
require('dotenv').config();

async function cleanup() {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({ email: 'admin@lmw.co.in' });
  
  const result = await Request.updateMany(
    { receiver: user._id, viewed: false },
    { $set: { viewed: true } }
  );
  
  console.log(`Cleanup complete. Marked ${result.modifiedCount} requests as viewed for ${user.industryName}`);
  process.exit(0);
}

cleanup();
