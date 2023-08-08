const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("./models/User"); 
const UserController = {
  register: async (req, res) => {
    try {
      const { username, email, password, full_name, age, gender } = req.body;

      // Check if username or email already exists
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (existingUser) {
        return res.status(400).json({
          status: 'error',
          code: 'USER_EXISTS',
          message: 'Username or email already exists.',
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user record
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        full_name,
        age,
        gender,
      });

      // Generate JWT token
      const token = jwt.sign({ user_id: newUser.id }, 'shivamsecretkey', {
        expiresIn: '1h',
      });

      res.status(201).json({
        status: 'success',
        message: 'User successfully registered!',
        data: {
          user_id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          full_name: newUser.full_name,
          age: newUser.age,
          gender: newUser.gender,
          access_token: token,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An internal server error occurred.',
      });
    }
  },

  generateToken: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find user by username
      const user = await User.findOne({
        where: { username },
      });

      if (!user) {
        return res.status(401).json({
          status: 'error',
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid credentials.',
        });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          status: 'error',
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid credentials.',
        });
      }

      // Generate JWT token
      const token = jwt.sign({ user_id: user.id }, 'your-secret-key', {
        expiresIn: '1h',
      });

      res.status(200).json({
        status: 'success',
        message: 'Access token generated successfully.',
        data: {
          access_token: token,
          expires_in: 3600,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An internal server error occurred.',
      });
    }
  },
};

module.exports = UserController;
