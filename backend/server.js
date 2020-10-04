const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');
require('dotenv').config()

const app = express();

const port = process.env.PORT || 5000;
//access api outside of same domain - skip same origin policy 
app.use(cors());
//access 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes 
app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);
app.get("/", (req, res) => {
    res.send("take us home");
})
//connect to db 
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, () => console.log("connected to DB!"));

//server 
app.listen(port, () => {
    console.log(`Server is running on  localhost:${port}`)
})

