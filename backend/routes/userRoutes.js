const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');


router.post('/login', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //  Validate input
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Username, email and password are required"
      });
    }

    // Find user with username + email
    const user = await userModel.findOne({ username, email });

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

    // Success
    return res.status(200).send({
      success: true,
      message: "Login successful",
      user
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Login error"
    });
  }
});

module.exports = router;