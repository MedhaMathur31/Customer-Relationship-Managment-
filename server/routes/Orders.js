const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Customer = require('../models/Customer');

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const { customer_id, amount, date } = req.body;

    // Optional: Check if customer exists
    const customer = await Customer.findById(customer_id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const order = new Order({
      customer_id,
      amount,
      date
    });

    await order.save();

    // Optional: update total_spent and visits for the customer
    customer.total_spent += amount;
    customer.visits += 1;
    await customer.save();

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
