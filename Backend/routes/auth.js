const express = require('express');
const User = require('../models/User');
const fetchuser = require('../Middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "sanjuisagood$girl";

//Route 1: create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success=false;
    //If there are errors in the validation of user returns bad request and the errors.
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ success,errors: result.array() });
    }
    try {
        //check weather user with this email exists already.
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success,error: "sorry user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true;
        // res.json(user)
        res.json({ success,authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})
//Route 2: Authentcate a user using :POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').notEmpty(),
], async (req, res) => {
    let success=false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success,error: "Please try to login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ success,error: "Please try to login with correct credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({ success,authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})
//Route 3: Get loggedin  User Details using :POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser,async (req, res) => {
    try {
        userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})
module.exports = router