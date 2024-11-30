//core modules
const express = require('express');
const cors = require('cors');
var cookieParser = require('cookie-parser')
require('dotenv').config();
const app = express();



//middlewares that supports backend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(cookieParser())

//userdefined modules
const router = require('./routes/index')
const connectDB = require('./database/db');

 
//userdefinemiddileware



//baseroute
app.use('/api', router);



const PORT = process.env.PORT || 4000;
connectDB()
app.listen(PORT, () => {
    console.log("Server running at " + PORT);
});


