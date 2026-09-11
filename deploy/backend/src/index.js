// Node.js v24/v26 Fix for jsonwebtoken compatibility
const buffer = require('buffer');
if (!buffer.SlowBuffer) {
    buffer.SlowBuffer = buffer.Buffer;
}

const express = require('express')
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const errorMiddleware = require('./middleware/errorMiddleware');
const main =  require('./config/db')
const cookieParser =  require('cookie-parser');
const authRouter = require("./routes/userAuth");
const redisClient = require('./config/redis');
const problemRouter = require("./routes/problemCreator");
const submitRouter = require("./routes/submit")
const aiRouter = require("./routes/aiChatting")
const videoRouter = require("./routes/videoCreator");
const cors = require('cors')

const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://127.0.0.1:5173'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error('Origin is not allowed by CORS'));
    },
    credentials: true 
}))

app.use(express.json());
app.use(cookieParser());

app.use('/user',authRouter);
app.use('/problem',problemRouter);
app.use('/submission',submitRouter);
app.use('/ai',aiRouter);
app.use("/video",videoRouter);
app.use(errorMiddleware);


const InitalizeConnection = async ()=>{
    try{
        await Promise.all([main(),redisClient.connect()]);
        console.log("DB Connected");
        
        try {
            await mongoose.connection.collection('users_v2').dropIndex('problemSolved_1');
            console.log("Duplicate problemSolved index deleted successfully!");
        } catch (err) {
            console.log("Index already deleted or not found.");
        }

        app.listen(process.env.PORT, ()=>{
            console.log("Server listening at port number: "+ process.env.PORT);
        })
    }
    catch(err){
        console.log("Error: "+err);
    }
}


InitalizeConnection();

