const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const jwt = require("jsonwebtoken");

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    //  Validate input
    if (!username || !password) {
      return res.status(400).send({
        success: false,
        message: "Username and password are required"
      });
    }

    // Find user with username + email
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).send({
        success: false,
        message: "Invalid password"
      });
    }

    //Success
    // return res.status(200).send({
    //   success: true,
    //   message: "Login successful",
    //   user
    // });

    const payload = {uname:req.body.username, pwd:req.body.password};
    const token = jwt.sign(payload, "secret");
    res.status(200).send({message:"login successsful", usertoken:token,success:true})

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Login error"
    });
  }
});

module.exports = router;