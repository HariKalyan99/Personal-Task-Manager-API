const globalErrorHandler = (error, request, response) => {
    if (error.name === "JsonWebTokenError") {
      return response.status(401).json({ status: 'error', message: 'Invalid token' });
    }
  
    if (error.name === "SequelizeUniqueConstraintError") {
      const message = error.errors && error.errors[0] ? error.errors[0].message : 'Unique constraint error';
      return response.status(400).json({ status: 'error', message });
    }
  
    if (error.name === "SequelizeValidationError") {
      const message = error.errors && error.errors[0] ? error.errors[0].message : 'Validation error';
      return response.status(400).json({ status: 'error', message });
    }
  
    return response.status(500).json({ status: 'error', message: 'Internal server error', error: error.message });
  }
  
  module.exports = globalErrorHandler;
  