import client from './redis-server'


export const rateLimiter = (limit, windowSeconds) => {
  return async (req, res, next) => {
    try {
      // You can use userId if logged in, or IP if public API
      const userKey = req.ip;
      const redisKey = `rate_limit:${userKey}`;

      // Increment request count
      const requestCount = await client.incr(redisKey);

      // If first request, set expiry
      if (requestCount === 1) {
        await client.expire(redisKey, windowSeconds);
      }

      // If exceeded limit
      if (requestCount > limit) {
        return res.status(429).json({
          success: false,
          message: `Too many requests. Try again after ${windowSeconds} seconds.`,
        });
      }

      next();
    } catch (err) {
      console.log("Rate limiter error:", err);
      next();
    }
  };
};


// app.get("/api/data", rateLimiter(5, 20), (req, res) => {
//     res.json({
//       success: true,
//       message: "You accessed protected API!",
//       time: new Date().toISOString(),
//     });
//   });


// const rateLimiter = (limit, windowSeconds) => {
//   return async (req, res, next) => {
//     try {
//       const userKey = req.ip;
//       const redisKey = `rate_limit:${userKey}`;

//       const requestCount = await client.incr(redisKey);

//       if (requestCount === 1) {
//         await client.expire(redisKey, windowSeconds);
//       }

//       const ttl = await client.ttl(redisKey);

//       const remaining = limit - requestCount;

//       // Add headers (Professional API practice)
//       res.setHeader("X-RateLimit-Limit", limit);
//       res.setHeader("X-RateLimit-Remaining", remaining > 0 ? remaining : 0);
//       res.setHeader("X-RateLimit-Reset", ttl);

//       if (requestCount > limit) {
//         return res.status(429).json({
//           success: false,
//           message: `Rate limit exceeded. Try again after ${ttl} seconds.`,
//         });
//       }

//       next();
//     } catch (err) {
//       console.log("Rate limiter error:", err);
//       next();
//     }
//   };
// };

// module.exports = rateLimiter;


// imiting how many requests a user can make in a specific time window.

// Example:

// max 10 requests per minute
// if user sends 11th request → block (429 Too Many Requests)

// This is heavily used in:

// Login APIs
// OTP APIs
// Public APIs
// Preventing brute-force attacks
// Preventing abuse/bots

// 🎯 Why Redis for Rate Limiting?
// Without Redis (memory)
// resets when server restarts
// not shared between servers
// With Redis
// fast
// shared across multiple servers
// supports TTL (automatic expiry)

// Rate Limiting Strategies
// 1) Fixed Window (Simple)

// Example:

// allow 10 requests in 60 seconds
// after 60 sec, reset counter

// This is easiest and most common.

// 🧠 How It Works (Redis Logic)

// For each user:

// create key: rate_limit:<userId>
// increment count using Redis INCR
// set expiry using Redis EXPIRE
// if count > limit → block