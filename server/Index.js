const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const customerRoutes = require('./routes/customers');
const orderRoutes = require('./routes/Orders');
const segmentRoutes = require('./routes/segments');
const aiRoutes = require('./routes/ai');
const authRoutes = require('./Auth');

const deliveryRoutes = require('./routes/delivery');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json()); 

app.use(session({
  secret: process.env.COOKIE_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/segments', segmentRoutes);
app.use('/api/ai', aiRoutes);

app.use('/delivery', deliveryRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Root route
app.get('/', (req, res) => {
  res.send('Xeno CRM backend running!');
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
