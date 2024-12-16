const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const catchAsync = require("../middlewares/catchAsync");
const AppError = require("../middlewares/appError");
const { default: config } = require("../config/config");
const Auth = require('../services/auth.services');
const {userSignup, userLogin} = new Auth();
const generateToken = (payload) => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

const signUp = catchAsync(async (request, response, next) => {
  const { username, email, password, confirmPassword } = request.body;

  if (this.password.length < 7) {
    return next(new AppError("Password length must be greater than 7", 400));
  }

  if (password !== confirmPassword) {
    return next(
      new AppError("Password and confirm password must be the same", 400)
    );
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = await userSignup({
    username,
    email,
    password: hashedPassword,
    confirmPassword,
  });

  if (!newUser) {
    return next(new AppError("Failed to create user", 400));
  }

  const result = newUser.toJSON();
  delete result.deletedAt;
  delete result.password;

  result.token = generateToken({
    id: result.id,
  });

  return response.status(201).json({ status: "Success", data: result });
});

const login = catchAsync(async (request, response, next) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return next(
      new AppError("Please provide email, password, confirm password", 400)
    );
  }

  const result = await userLogin(email);
  const isVerifiedpasssword = await bcrypt.compare(password, result.password);

  if (!result || !isVerifiedpasssword) {
    return next(new AppError("Invalid credentials", 400));
  } else {
    const token = generateToken({
      id: result.id,
    });
    return response.status(201).json({ status: "Logged in", token });
  }
});

module.exports = { signUp, login, authentication };
