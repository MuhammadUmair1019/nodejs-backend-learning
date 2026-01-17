// ===============================
// Node.js - Class 2
// Topic: HTTP Server & Routing
// ===============================

// Understand how an HTTP server works in Node.js
// Use the built-in http module
// Handle requests and responses
// Perform basic routing using req.url
// Send HTML responses to the browser

import http from 'http'
// import fs from 'fs' // (Will be used later)

// Create Server
const server = http.createServer((req, res) => {

    // Log requested URL
    console.log(req.url)

    // Set response type as HTML
    res.setHeader("Content-Type", "text/html")

    // Basic Routing using switch
    switch (req.url) {

        case '/':
            res.end(`
                <h1>Home Page</h1>
                <p>Welcome to Node.js Server</p>
                <a href="/about">Go to About Page</a>
            `)
            break

        case '/about':
            res.end(`
                <h1>About Page</h1>
                <p>This is Node.js Class 2</p>
                <a href="/">Go Back Home</a>
            `)
            break

        default:
            res.end(`
                <h1>404 - Page Not Found</h1>
                <a href="/">Go Back Home</a>
            `)
    }
})

// Define Port
const PORT = 3000

// Start Server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
