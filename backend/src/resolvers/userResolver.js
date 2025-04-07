// revisar mas adelante 
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../config/jwt");
const { validationResult } = require("express-validator");

const userResolver = {
  Query: {
    login: async (_, { usernameOrEmail, password }) => {
     
      const user = await User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      });
      if (!user) {
        throw new Error("User not found");
      }
     
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }
      const token = generateToken(user);
      return { token, user };
    },
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
     
      let user = await User.findOne({ $or: [{ username }, { email }] });
      if (user) {
        throw new Error("User already exists");
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ username, email, password: hashedPassword });
      await user.save();
      const token = generateToken(user);
      return { token, user };
    },
  },
};

module.exports = userResolver;
