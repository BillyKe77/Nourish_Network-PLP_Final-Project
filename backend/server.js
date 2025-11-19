const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const foodRoutes = require('./routes/foodRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();


// Load environment variables
dotenv.config();

// Connecting to the database
connectDB();
// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/food', foodRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Nourish Network');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});