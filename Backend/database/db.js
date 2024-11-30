const mongoose = require("mongoose");

async function connectDB() {
    try {

        await mongoose.connect(process.env.MONGO_URL, {
           
            connectTimeoutMS: 3000000, 
            socketTimeoutMS: 3000000,
            connectTimeoutMS: 3000000
        });
        const connection = mongoose.connection
        connection.on("connected", () => {
            console.log("connected to DB");
        });
        connection.on("error", (error) => {
            console.log("something is wrong in MongoDB", error);
        });
    } catch (err) {
        console.log("something is wrong", err);
    }
}
module.exports = connectDB;
