const signUpUser = require("../models/signUpUser")

exports.signUp = async (req, res, next) => {
  try {
    const user = await signUpUser.findOne({ email: req.body.email });

    if (user) {
      return next(new Error("User already exists"))
    }

    const newUser = new signUpUser(req.body);
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
};