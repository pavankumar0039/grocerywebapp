const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000'], // Allow both localhost and deployed frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Apply middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions)); // Use the CORS configuration
app.use(cookieParser());

// User-defined modules
const router = require('./routes/index');
const connectDB = require('./database/db');

// Base API routes
app.use('/api', router);

// Serve static files for frontend
const frontendPath = path.join(__dirname, '../frontend'); // Correct path to the build folder
app.use(express.static(frontendPath));

// Fallback route for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 4000;
connectDB();

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
