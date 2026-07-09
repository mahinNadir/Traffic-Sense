const bcrypt = require("bcrypt");
const Cryptr = require("cryptr");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const cryptr = new Cryptr(process.env.CRYPT_SECRET);
const errorStrings = require("../../constants/errorStrings");
const User = require("./index");

exports.registerUser = async (userData) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    const isUserExist = await User.findOne({ email: userData.email });

    if (isUserExist) {
      throw new Error(errorStrings.USER_ALREADY_EXIST);
    }

    const user = new User({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    throw new Error(error);
  }
};

exports.loginUser = async (userData) => {
  try {
    const user = await User.findOne({ email: userData.email });

    if (!user) {
        throw new Error (errorStrings.USER_NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);

    if (!isMatch) {
      throw new Error (errorStrings.INVALID_CREDENTIALS);
    }

    const token = await exports.generateAuthToken(user);

    return { user, token };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.generateAuthToken = async (user) => {
  try {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    const encryptedToken = cryptr.encrypt(token);

    return encryptedToken;
  } catch (error) {
    throw new Error(errorStrings.JWT_GENERATION_FAILED);
  }
};