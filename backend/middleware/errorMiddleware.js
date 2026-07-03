import { AppError, ValidationError } from '../utils/errors.js';

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  // Log error details
  console.error('❌ Error:', {
    status: err.statusCode,
    message: err.message,
    endpoint: req.method + ' ' + req.path,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });

  // Handle custom AppError instances
  if (err instanceof AppError) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        errors: err.errors
      });
    }

    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.keys(err.errors).reduce((acc, key) => {
      acc[key] = err.errors[key].message;
      return acc;
    }, {});

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  // Handle Mongoose cast errors (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid resource ID format'
    });
  }

  // Handle Mongoose duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
    });
  }

  // Generic error response (don't expose details in production)
  const isDevelopment = process.env.NODE_ENV === 'development';
  res.status(err.statusCode || 500).json({
    success: false,
    message: isDevelopment ? err.message : 'An error occurred',
    ...(isDevelopment && { error: err })
  });
};

export default errorMiddleware;
