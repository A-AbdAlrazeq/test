import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logsDir = path.join(__dirname, '../logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Simple logger utility
export const logger = {
  info: (message, data = {}) => {
    const log = {
      level: 'INFO',
      timestamp: new Date().toISOString(),
      message,
      ...data
    };
    console.log(JSON.stringify(log));
    fs.appendFileSync(path.join(logsDir, 'combined.log'), JSON.stringify(log) + '\n');
  },

  error: (message, data = {}) => {
    const log = {
      level: 'ERROR',
      timestamp: new Date().toISOString(),
      message,
      ...data
    };
    console.error(JSON.stringify(log));
    fs.appendFileSync(path.join(logsDir, 'error.log'), JSON.stringify(log) + '\n');
  },

  debug: (message, data = {}) => {
    if (process.env.NODE_ENV !== 'production') {
      const log = {
        level: 'DEBUG',
        timestamp: new Date().toISOString(),
        message,
        ...data
      };
      console.log(JSON.stringify(log));
    }
  }
};

// Logging middleware
export const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  // Log incoming request
  logger.info('Incoming Request', {
    method: req.method,
    url: req.url,
    ip: req.ip,
    body: req.body
  });

  // Log response after it's sent
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.info('Request Completed', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`
    });
  });

  next();
};

// Error logging wrapper for controllers
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    logger.error('Controller Error', {
      method: req.method,
      url: req.url,
      error: err.message,
      stack: err.stack
    });
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  });
};