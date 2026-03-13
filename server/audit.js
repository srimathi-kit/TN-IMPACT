const mongoose = require('mongoose');
const Message = require('./models/Message');
const Request = require('./models/Request');
const User = require('./models/User');
require('dotenv').config();

async function audit() {
  await mongoose.connect(process.env.MONGO_URI);
  const users = await User.find({});
  
  const report = [];
  for (const user of users) {
    const unreadMessages = await Message.countDocuments({ receiver: user._id, read: false });
    const pendingRequests = await Request.countDocuments({ receiver: user._id, status: 'pending' });
    report.push({
      email: user.email,
      industry: user.industryName,
      unreadMessages,
      pendingRequests,
      total: unreadMessages + pendingRequests
    });
  }

  const fs = require('fs');
  fs.writeFileSync('audit_report.json', JSON.stringify(report, null, 2));
  console.log('Audit complete. Check audit_report.json');
  process.exit(0);
}

audit();
