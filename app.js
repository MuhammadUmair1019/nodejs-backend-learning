import express from "express";
import fs from "fs";

const app = express();
const port = 3000;

// Request Flow 

// Client Request
//       ↓
// Global Middleware (json, urlencoded)
//       ↓
// Logger Middleware
//       ↓
// Auth Middleware
//       ↓
// Matching Route Handler
//       ↓
// Response Sent

// 👉 Order matters
// Middleware always runs in the order it is written

/* =========================
   GLOBAL MIDDLEWARE
   Runs for every request
========================= */

// Parses incoming JSON data
app.use(express.json());

// Parses form data (URL encoded)
app.use(express.urlencoded({ extended: true }));

/* =========================
   CUSTOM MIDDLEWARE
========================= */


// Logger Middleware
app.use((req, res, next) => {
  console.log(`Logger → ${req.method} ${req.url}`);
  next(); // move to next middleware
});

// Authentication Middleware (dummy example)
app.use((req, res, next) => {
  console.log("Auth middleware executed");
  req.userRole = "admin"; // attach data to request
  next();
});

/* =========================
   ROUTES
========================= */

// Base route
app.get("/", (req, res) => {
  res.send("Base Route");
});

// Get all users
app.get("/users", (req, res) => {
  console.log("User Role:", req.userRole);

  const users = fs.readFileSync("./MOCK_DATA.json", "utf-8");
  res.send(users);
});

// Get single user by ID
app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);

  const users = fs.readFileSync("./MOCK_DATA.json", "utf-8");
  const user = JSON.parse(users).find(u => u.id === userId);

  res.json(user);
});

// Create new user
app.post("/users", (req, res) => {
  const users = fs.readFileSync("./MOCK_DATA.json", "utf-8");
  const allUsers = JSON.parse(users);

  const newUser = {
    id: allUsers.length + 1,
    ...req.body
  };

  allUsers.push(newUser);

  fs.writeFileSync(
    "./MOCK_DATA.json",
    JSON.stringify(allUsers, null, 2)
  );

  res.status(201).send("User created successfully");
});

// Delete user
app.delete("/users/:id", (req, res) => {
  const userId = Number(req.params.id);

  const users = fs.readFileSync("./MOCK_DATA.json", "utf-8");
  const filteredUsers = JSON.parse(users).filter(
    user => user.id !== userId
  );

  fs.writeFileSync(
    "./MOCK_DATA.json",
    JSON.stringify(filteredUsers, null, 2)
  );

  res.send("User deleted successfully");
});

/* =========================
   404 HANDLER
   Always at the bottom
========================= */

app.use((req, res) => {
  res.status(404).send("Page not found :(");
});

/* =========================
   SERVER START
========================= */

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
