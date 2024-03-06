const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
}

async function getProfile(req, res, next) {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  getProfile,
};
