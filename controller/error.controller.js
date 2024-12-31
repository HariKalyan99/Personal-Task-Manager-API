const logger = require("../logger");

const globalErrorHandler = (error, request, response) => {
  if (error.name === "JsonWebTokenError") {
    logger.error("Invalid token");
    return response
      .status(401)
      .json({ status: "error", message: "Invalid token" });
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    const message =
      error.errors && error.errors[0]
        ? error.errors[0].message
        : "Unique constraint error";
    logger.error(`${message}`);

    return response.status(400).json({ status: "error", message });
  }

  if (error.name === "SequelizeValidationError") {
    const message =
      error.errors && error.errors[0]
        ? error.errors[0].message
        : "Validation error";
    logger.error(`${message}`);

    return response.status(400).json({ status: "error", message });
  }

  return response
    .status(500)
    .json({ status: "error", message: "Internal server error" });
};

module.exports = globalErrorHandler;
