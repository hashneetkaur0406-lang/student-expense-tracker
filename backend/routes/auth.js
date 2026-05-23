const router = require("express").Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {

    // check existing user
    const existingUser = await User.findOne({
      email: req.body.email
    });

    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      req.body.password,
      salt
    );

    // create new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    // save user
    await newUser.save();

    res.status(201).json("User Registered Successfully");

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;