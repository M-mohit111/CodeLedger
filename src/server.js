const express = require('express')
require('dotenv').config();
const main = require('./config/db')
const cookieParser = require('cookie-parser');


const app = express();

app.use(express.json());
app.use(cookieParser());

main()
.then(async ()=>{
    app.listen(process.env.PORT,()=>{
        console.log("server is active at port : " + process.env.PORT);
    })
})

.catch((err) => {
    console.log(err);
});