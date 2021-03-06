const express = require('express');
const router = express.Router();
const User = require('../models/user.model.js');


//get all users list 
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
})


//add a user 
router.post('/add', async (req, res) => {
    const newUser = new User({ username: req.body.username });
    try {
        await newUser.save();
        res.json('user added!');
    } catch (err) {
        res.json({ message: err });
    }
})

module.exports = router;