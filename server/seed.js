const mongoose = require('mongoose');
const User = require('./models/User');
const WasteItem = require('./models/WasteItem');
const dotenv = require('dotenv');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sciep');
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await WasteItem.deleteMany({});

    // Create Industries (Real Coimbatore & Chennai Companies)
    console.log('Creating User 1 (Lakshmi Machine Works)...');
    const user1 = await User.create({
      industryName: 'Lakshmi Machine Works (LMW)',
      industryType: 'Heavy Industry',
      location: 'Coimbatore, Tamil Nadu',
      email: 'admin@lmw.co.in',
      password: 'password123'
    });

    console.log('Creating User 2 (KPR Mill)...');
    const user2 = await User.create({
      industryName: 'KPR Mill Limited',
      industryType: 'Textile',
      location: 'Coimbatore, Tamil Nadu',
      email: 'sustainability@kprmill.com',
      password: 'password123'
    });

    console.log('Creating User 3 (Roots Industries)...');
    const user3 = await User.create({
      industryName: 'Roots Industries India',
      industryType: 'Manufacturing',
      location: 'Coimbatore, Tamil Nadu',
      email: 'exchange@roots.co.in',
      password: 'password123'
    });

    console.log('Creating User 4 (Pricol)...');
    const user4 = await User.create({
      industryName: 'Pricol Limited',
      industryType: 'Electronics',
      location: 'Coimbatore, Tamil Nadu',
      email: 'materials@pricol.com',
      password: 'password123'
    });

    console.log('Creating User 5 (TVS Motor Company)...');
    const user5 = await User.create({
      industryName: 'TVS Motor Company',
      industryType: 'Automotive',
      location: 'Chennai, Tamil Nadu',
      email: 'sustainability@tvsmotor.com',
      password: 'password123'
    });

    console.log('Creating User 6 (Ashok Leyland)...');
    const user6 = await User.create({
      industryName: 'Ashok Leyland',
      industryType: 'Heavy Vehicles',
      location: 'Chennai, Tamil Nadu',
      email: 'green@ashokleyland.com',
      password: 'password123'
    });

    console.log('Creating User 7 (MRF Tyres)...');
    const user7 = await User.create({
      industryName: 'MRF Tyres (Chennai Plant)',
      industryType: 'Rubber & Plastics',
      location: 'Chennai, Tamil Nadu',
      email: 'circular@mrf.com',
      password: 'password123'
    });

    // Create Waste Items
    await WasteItem.create([
      {
        industry: user1._id,
        wasteType: 'Metal',
        quantity: '4500 kg',
        location: 'Perianaickenpalayam, Coimbatore',
        description: 'High-grade CNC machining steel offcuts and cast iron shavings. Sorted and clean.',
        status: 'available'
      },
      {
        industry: user2._id,
        wasteType: 'Fabric',
        quantity: '8500 kg',
        location: 'Arasur, Coimbatore',
        description: 'Premium organic cotton yarn waste and fabric selvages from garment production.',
        status: 'available'
      },
      {
        industry: user3._id,
        wasteType: 'Plastic',
        quantity: '1200 kg',
        location: 'Thudiyalur, Coimbatore',
        description: 'Injection molding ABS and Polycarbonate plastic sprues and rejects.',
        status: 'available'
      },
      {
        industry: user4._id,
        wasteType: 'Chemical',
        quantity: '800 L',
        location: 'Perianaickenpalayam, Coimbatore',
        description: 'Neutralized electroplating bath residue and flux waste from PCB manufacturing.',
        status: 'available'
      },
      {
        industry: user5._id,
        wasteType: 'Metal',
        quantity: '12000 kg',
        location: 'Hosur, near Chennai',
        description: 'Automotive grade aluminum die-cast scrap and stamping skeletons.',
        status: 'available'
      },
      {
        industry: user6._id,
        wasteType: 'Wood',
        quantity: '3500 kg',
        location: 'Ennore, Chennai',
        description: 'Heavy duty wooden packing pallets and shipping crates from vehicle component logistics.',
        status: 'available'
      },
      {
        industry: user7._id,
        wasteType: 'Chemical',
        quantity: '4000 kg',
        location: 'Tiruvottiyur, Chennai',
        description: 'Vulcanized rubber scrap and edge trimmings from tire manufacturing process.',
        status: 'available'
      }
    ]);

    // Seed Messages to populate the chat feature!
    console.log('Seeding initial conversations...');
    const Message = require('./models/Message');
    await Message.deleteMany({});

    // Conversation between LMW and Ashok Leyland
    await Message.create([
      {
        sender: user1._id,
        receiver: user6._id,
        message: 'Hello team Ashok Leyland, we noticed you have a listing for heavy-duty wooden packing pallets. Are they treated or raw wood?',
        read: true,
        createdAt: new Date(Date.now() - 86400000) // 1 day ago
      },
      {
        sender: user6._id,
        receiver: user1._id,
        message: 'Hi LMW team. Most of them are heat-treated (HT) standard pine pallets, ideal for heavy machinery transport. We have about 500 units available this week.',
        read: true,
        createdAt: new Date(Date.now() - 82800000) // 23 hours ago
      },
      {
        sender: user1._id,
        receiver: user6._id,
        message: 'Excellent. Let us arrange logistics from Ennore to Coimbatore. We will take the full batch.',
        read: false,
        createdAt: new Date(Date.now() - 3600000) // 1 hour ago
      }
    ]);

    // Conversation between KPR Mill and Roots
    await Message.create([
      {
        sender: user3._id,
        receiver: user2._id,
        message: 'Hi KPR Mill, we are looking for woven fabric scraps to use as industrial cleaning rags in our injection molding facility. Can you supply?',
        read: false,
        createdAt: new Date(Date.now() - 1800000) // 30 mins ago
      }
    ]);
    
    console.log('Sample data and chats seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    console.error(error.stack);
    if (error.errors) {
      Object.keys(error.errors).forEach(key => {
        console.error(`- ${key}: ${error.errors[key].message}`);
      });
    }
    process.exit(1);
  }
};

seedData();
