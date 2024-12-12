const user = require("../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const catchAsync = require("../middlewares/catchAsync");
const AppError = require("../middlewares/appError");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signUp = catchAsync(async (request, response, next) => {
  const { username, email, password, confirmPassword } = request.body;

  const newUser = await user.create({
    username,
    email,
    password,
    confirmPassword,
  });

  if (!newUser) {
    return next(new AppError("Failed to create user", 400));
  }

  const result = newUser.toJSON();
  delete result.password;
  delete result.deletedAt;

  result.token = generateToken({
    id: result.id,
  });

  return response.status(201).json({ status: "Success", data: result });
});

const login = catchAsync(async (request, response, next) => {
  const { email, password} = request.body;

  if (!email || !password) {
    return next(
      new AppError("Please provide email, password, confirm password", 400)
    );
  }

  const result = await user.findOne({ where: { email } });

  if (!result || !(await bcrypt.compare(password, result.password))) {
    return next(new AppError("Invalid credentials", 400));
  } else {
    const token = generateToken({
      id: result.id,
    });
    return response.status(201).json({ status: "Logged in", token });
  }
});

module.exports = { signUp, login };
