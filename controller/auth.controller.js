const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config");
const { userLogin, userSignup } = require("../services/auth.services");
const logger = require("../logger");

const generateToken = (payload) => {
  return jwt.sign(payload, config.jwtsecret, {
    expiresIn: config.jwtexpiresin,
  });
};

const signUp = async (request, response) => {
  const { username, email, password, confirmPassword } = request.body;

  if (password.length < 7) {
    logger.warn("Password must be at least 7 characters long");
    return response
      .status(400)
      .json({ message: "Password must be at least 7 characters long" });
  }

  if (password !== confirmPassword) {
    logger.warn("Password and Confirm password must be the same");

    return response
      .status(400)
      .json({ message: "Password and Confirm password must be the same" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userSignup({
      username,
      email,
      password: hashedPassword,
      confirmPassword,
    });

    if (!newUser) {
      logger.error("Failed to create user");

      return response.status(500).json({ message: "Failed to create user" });
    }

    const result = newUser.toJSON();
    logger.info("User registered successfully");

    return response.status(201).json({
      message: "User registered successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    logger.error(`error:${error.message}`);

    return response
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const login = async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    logger.warn("Please provide both email and password");

    return response
      .status(400)
      .json({ message: "Please provide both email and password" });
  }

  try {
    const result = await userLogin(email);

    if (!result) {
      logger.error("Invalid credentials");

      return response.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordVerified = await bcrypt.compare(password, result.password);

    if (!isPasswordVerified) {
      logger.error("Invalid credentials");

      return response.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ id: result.id });
    logger.info("User logged in successfully");

    return response.status(200).json({
      message: "User logged in successfully",
      status: true,
      token,
      user: result.username,
    });
  } catch (error) {
    logger.error(`error:${error.message}`);

    return response
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = { signUp, login };
