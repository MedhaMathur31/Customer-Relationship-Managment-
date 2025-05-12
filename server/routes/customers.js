const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// POST /api/customers
router.post('/', async (req, res) => {
  try {
    const { name, email, total_spent, last_order_date, visits } = req.body;

    const customer = new Customer({
      name,
      email,
      total_spent,
      last_order_date,
      visits
    });

    await customer.save();
    res.status(201).json({ message: 'Customer added successfully', customer });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
