// Store for tracking requests by IP
const requests = {};

// Create a simple rate limiter
const createRateLimiter = (limit, windowMs) => {
  return (req, res, next) => {
    const ip = req.ip || 'unknown';
    const now = Date.now();

    // Initialize if first request
    if (!requests[ip]) {
      requests[ip] = { count: 0, resetTime: now + windowMs };
    }

    // Reset if window expired
    if (now > requests[ip].resetTime) {
      requests[ip] = { count: 0, resetTime: now + windowMs };
    }

    // Check limit
    if (requests[ip].count >= limit) {
      return res.status(429).json({
        message: 'Too many requests. Try again later.',
        retryAfter: Math.ceil((requests[ip].resetTime - now) / 1000)
      });
    }

    // Increment counter
    requests[ip].count++;
    next();
  };
};

export const globalLimiter = createRateLimiter(100, 15 * 60 * 1000);
export const getLimiter = createRateLimiter(60, 15 * 60 * 1000);
export const postLimiter = createRateLimiter(30, 15 * 60 * 1000);
export const strictLimiter = createRateLimiter(5, 15 * 60 * 1000);
