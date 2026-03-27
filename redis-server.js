// const express = require("express");
// const redis = require("redis");
import express from "express";
import redis from "redis";

const app = express();
export const client = redis.createClient();

client.on("error", (err) => console.log("Redis Error", err));

(async () => {
  await client.connect();
  console.log("Redis connected");
})();

app.get("/posts", async (req, res) => {
  const cacheKey = "posts";

  const cachedPosts = await client.get(cacheKey);

  if (cachedPosts) {
    console.log("CACHE HIT (Redis)");
    return res.json(JSON.parse(cachedPosts));
  }

  console.log("CACHE MISS (Redis)");

  // Simulating DB/API delay
  const posts = await new Promise((resolve) =>
    setTimeout(() => resolve([{ id: 1, title: "Hello Cache" }]), 2000)
  );

  await client.setEx(cacheKey, 30, JSON.stringify(posts)); // cache for 30 sec

  res.json(posts);
});

app.post("/posts", async (req, res) => {
    // imagine saving to database here
  
    await client.del("posts"); // invalidate cache
    res.json({ message: "Post added, cache cleared" });
  });

app.listen(3000, () => console.log("Server running on port 3000"));


// What is Redis?

// Redis is an in-memory database used for caching.

// Why Redis is powerful?
// Extremely fast
// Shared across multiple servers
// Supports TTL automatically
// Supports advanced data structures
// Redis Use Cases
// API caching
// Session storage
// Rate limiting
// Queues (BullMQ)
// Distributed locking

// When do we invalidate cache?

// Example:

// Product list cached
// New product added
// Cache must be deleted

// Cache Invalidation Strategies
// 1. TTL-based invalidation
// Cache expires automatically
// Simple, but may show old data for some time
// 2. Manual invalidation
// Delete cache when data changes
// More accurate, but needs discipline
// 3. Versioning cache keys

// Example:
// posts:v1
// posts:v2


// Task:

// Create a route:
// GET /user/:id

// Cache each user by ID
// TTL 20 seconds
// If cache hit, return from Redis

// Key should look like:
// user:5