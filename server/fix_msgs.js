const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sciep').then(async () => {
    const Message = mongoose.connection.db.collection('messages');
    const User = mongoose.connection.db.collection('users');
    const myUser = await User.findOne({email: 'lakshminew@gmail.com'});
    const lmw = await User.findOne({email: 'admin@lmw.co.in'});
    if (myUser && lmw) {
        await Message.updateMany({sender: lmw._id}, {$set: {sender: myUser._id}});
        await Message.updateMany({receiver: lmw._id}, {$set: {receiver: myUser._id}});
        console.log('Successfully transferred all demo chats to your account!');
    }
    process.exit(0);
});
