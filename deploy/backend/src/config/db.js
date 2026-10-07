const mongoose = require('mongoose');

async function main() {
    try {
        await mongoose.connect(process.env.DB_CONNECT_STRING);
        console.log("MongoDB connection successful.");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        throw err;
    }
}

module.exports = main;
