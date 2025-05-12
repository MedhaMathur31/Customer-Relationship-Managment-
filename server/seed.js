const mongoose = require('mongoose');
require('dotenv').config();

const Customer = require('./models/Customer');
const Order = require('./models/Order');

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Customer.deleteMany({});
    await Order.deleteMany({});

    const customers = await Customer.insertMany([
      { name: 'Aman', email: 'aman@example.com', total_spent: 15000, visits: 2, last_order_date: new Date('2024-12-01') },
      { name: 'Nina', email: 'nina@example.com', total_spent: 8000, visits: 5, last_order_date: new Date('2024-11-10') },
      { name: 'Kabir', email: 'kabir@example.com', total_spent: 20000, visits: 1, last_order_date: new Date('2024-10-20') },
    ]);

    const orders = [
      { customer_id: customers[0]._id, amount: 5000, date: new Date('2024-11-01') },
      { customer_id: customers[0]._id, amount: 10000, date: new Date('2024-12-01') },
      { customer_id: customers[1]._id, amount: 8000, date: new Date('2024-11-10') },
      { customer_id: customers[2]._id, amount: 20000, date: new Date('2024-10-20') },
    ];

    await Order.insertMany(orders);

    console.log('✅ Seed data inserted!');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  }
}

seedData();
