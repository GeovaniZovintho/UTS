const User = require('../models/userModel');
const { generateToken } = require('../config/auth');
const bcrypt = require('bcrypt'); // Tambahkan ini

const authController = {
  register: async (req, res) => {
    const { username, password } = req.body;
    try {
      // Hash password sebelum disimpan
      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = await User.create(username, hashedPassword);
      const token = generateToken(userId);

      res.status(201).json({ token });
    } catch (err) {
      console.error("Registration Error:", err); // Log error untuk debugging
      res.status(500).json({ message: 'Registration failed' });
    }
  },

  login: async (req, res) => {  
    const { username, password } = req.body;
    try {
      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Pastikan user memiliki password
      if (!user.password) {
        return res.status(500).json({ message: 'User data invalid' });
      }

      // Bandingkan password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Buat token jika login berhasil
      const token = generateToken(user.id);
      res.json({ token });
    } catch (err) {
      console.error("Login Error:", err); // Log error untuk debugging
      res.status(500).json({ message: 'Login failed' });
    }
  }
};

module.exports = authController;
