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


app.use(cors({
  origin: ['http://localhost:5173', 'https://nourishnetwork.netlify.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// === ADD REQUEST LOGGING ===
app.use((req, res, next) => {
  console.log('🌐 SERVER - Incoming Request:', {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    originalUrl: req.originalUrl,
    path: req.path,
    headers: {
      authorization: req.headers.authorization ? 'Bearer [PRESENT]' : 'MISSING',
      'content-type': req.headers['content-type']
    }
  });
  next();
});

// Other middleware
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  console.log('✅ Test route hit successfully');
  res.json({ 
    message: 'Server is working!', 
    timestamp: new Date().toISOString(),
    routes: ['/api/auth', '/api/food']
  });
});

// Routes
app.use('/api/food', foodRoutes);
app.use('/api/auth', authRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Nourish Network API');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});