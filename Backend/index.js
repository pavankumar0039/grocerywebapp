const express = require('express');
const cors = require('cors');
var cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'https://grocerywebapp-1.onrender.com'], // Allow both localhost and deployed frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Apply middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));  // Use the CORS configuration
app.use(cookieParser());

// User-defined modules
const router = require('./routes/index');
const connectDB = require('./database/db');

// Base route
app.use('/api', router);

const PORT = process.env.PORT || 4000;
connectDB();

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
