// const express = require("express");
import express from 'express'
const app = express();

// In-memory cache means storing cache inside Node.js RAM.

// ❌ Problem 1: Server Restart = Cache Lost

// When Node restarts, memory resets.

// ❌ Problem 2: Scaling Problem (Multiple Servers)

// If you have 3 servers:

// Server A cache ≠ Server B cache

// User request may go to different server → inconsistent performance.

// ❌ Problem 3: Memory Overflow

// If you store too much, RAM fills and server crashes.
const cache = {};

app.get("/users", async (req, res) => {
  const key = "users";

  if (cache[key]) {
    console.log("CACHE HIT");
    return res.json(cache[key]);
  }

  console.log("CACHE MISS");

  const users = await new Promise((resolve) =>
    setTimeout(() => resolve(["Ali", "Umar", "Ahmed"]), 2000)
  );

  cache[key] = users;

  res.json(users);
});


// Add TTL Support

function setCache(key, data, ttlSeconds) {
  cache[key] = {
    data,
    expiresAt: Date.now() + ttlSeconds * 1000,
  };
}

function getCache(key) {
  const cached = cache[key];

  if (!cached) return null;

  if (Date.now() > cached.expiresAt) {
    delete cache[key];
    return null;
  }

  return cached.data;
}


app.get("/products", async (req, res) => {
  const key = "products";
  const cachedData = getCache(key);

  if (cachedData) {
    console.log("CACHE HIT");
    return res.json(cachedData);
  }

  console.log("CACHE MISS");

  const products = await new Promise((resolve) =>
    setTimeout(() => resolve(["Laptop", "Phone", "Tablet"]), 2000)
  );

  setCache(key, products, 10); // cache for 10 seconds

  res.json(products);
});

app.listen(3000, () => console.log("Server running on port 3000"));


