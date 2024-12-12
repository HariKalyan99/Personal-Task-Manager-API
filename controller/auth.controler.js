const user = require("../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signUp = async (request, response) => {
  const { username, email, password, confirmPassword } = request.body;

  const newUser = await user.create({
    username,
    email,
    password,
    confirmPassword,
  });

  const result = newUser.toJSON();
  delete result.password;
  delete result.deletedAt;

  result.token = generateToken({
    id: result.id,
  });

  if (!result) {
    return response.status(400).json({
      status: "Failed",
      message: "Failed to create user",
    });
  } else {
    return response.status(201).json({ status: "Success", data: result });
  }
};

const login = async (request, response) => {
  const { email, password, confirmPassword } = request.body;

  if (!email || !password || !confirmPassword) {
    return response.status(400).json({
      status: "Failed",
      message: "Please provide email, password, confirm password",
    });
  }

  const result = await user.findOne({ where: { email } });

  if (!result || !(await bcrypt.compare(password, result.password))) {
    return response.status(400).json({
      status: "Failed",
      message: "Invalid credentials",
    });
  } else {
    const token = generateToken({
      id: result.id,
    });
    return response.status(201).json({ status: "Logged in", token });
  }
};

module.exports = { signUp, login };
