// Store for tracking request counts by IP
const requestCounts = {};

// Utility function to create a rate limiter
const createRateLimiter = (maxRequests, windowMs) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();

    // Initialize IP record if not exists
    if (!requestCounts[ip]) {
      requestCounts[ip] = [];
    }

    // Remove old requests outside the time window
    requestCounts[ip] = requestCounts[ip].filter(timestamp => now - timestamp < windowMs);

    // Check if limit is exceeded
    if (requestCounts[ip].length >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests from this IP, please try again later.',
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }

    // Add current request timestamp
    requestCounts[ip].push(now);
    next();
  };
};

// Global rate limiter: 100 requests per 15 minutes
export const globalLimiter = createRateLimiter(100, 15 * 60 * 1000);

// GET limiter: 60 requests per 15 minutes
export const getLimiter = createRateLimiter(60, 15 * 60 * 1000);

// POST limiter: 30 requests per 15 minutes
export const postLimiter = createRateLimiter(30, 15 * 60 * 1000);

// Strict limiter: 5 requests per 15 minutes
export const strictLimiter = createRateLimiter(5, 15 * 60 * 1000);
