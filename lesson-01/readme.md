# Node.js – Class 1 (Introduction)

This repository contains **Class 1** material for learning **Node.js from scratch**. This is the **first lecture** designed for beginners who are starting backend development.

---

## 📌 What is Node.js?

Node.js is a **JavaScript runtime environment** that allows us to run JavaScript **outside the browser**.

### Before Node.js

* JavaScript was only used in browsers
* Mainly for UI interactions (buttons, forms, alerts)

### After Node.js

* JavaScript can run on servers
* Build backend applications
* Work with files, APIs, databases, and servers

> Node.js is **not a programming language** and **not a framework**. It is built on **Google Chrome’s V8 Engine**.

---

## ❓ Why Use Node.js?

* Fast and efficient
* Non-blocking & asynchronous
* Same language for frontend & backend
* Large ecosystem (npm)
* Used for APIs, real-time apps, and microservices

---

## 🚀 First Node.js Server (HTTP Module)

### `server.js`

```js
import http from 'http'

const server = http.createServer((req, res) => {
    console.log("Request received!")
    res.end("Hello World")
})

server.listen(3000, () => {
    console.log("Server started on port 3000")
})
```

### How It Works

* `http.createServer()` → creates server
* `req` → client request
* `res` → server response
* `res.end()` → sends response
* `listen(3000)` → starts server

Open browser:

```
http://localhost:3000
```

---

## 📦 Core Modules in Node.js

Node.js has built-in modules (no installation required).

---

### 🖥 OS Module

```js
import os from 'os'
console.log(os.homedir())
```

---

## 📁 File System (fs Module)

Used to **read, write, update, and delete files**.

---

### ✏️ Write File (Sync)

```js
import fs from 'fs'

console.log("start")
fs.writeFileSync('./test.txt', 'Hello World')
console.log("end")
```

> Blocks execution (not recommended for large apps)

---

### ✏️ Write File (Async)

```js
console.log("start")
fs.writeFile('./test.txt', 'Hello NodeJs', (err) => {
    if (err) console.log(err)
})
console.log("end")
```

> Non-blocking (recommended)

---

### 📖 Read File (Sync)

```js
const data = fs.readFileSync('./test.txt', 'utf-8')
console.log(data)
```

---

### 📖 Read File (Async)

```js
fs.readFile('./test.txt', 'utf-8', (err, data) => {
    if (err) console.log(err)
    else console.log(data)
})
```

---

### ➕ Update File

```js
fs.appendFile('./test.txt', 'Hello JavaScript\n', (err) => {
    if (err) throw err
    console.log('File updated')
})
```

---

### ❌ Delete File

```js
fs.unlink('./test.txt', (err) => {
    if (err) throw err
    console.log('File deleted')
})
```

---

## 📂 Create Folder

```js
fs.mkdir('./views', (err) => {
    if (err) console.log(err)
})
```

---

## 🔁 Custom Modules

### `calc.js`

```js
export function add(a, b) {
    return a + b
}
```

### `app.js`

```js
import { add } from './calc.js'
console.log(add(2, 2))
```

---

## ⏱ Timers

```js
setTimeout(() => {
    console.log('Hello World')
}, 3000)
```

---

## 🌍 Global Objects

```js
console.log(global)
```

❌ Browser-only features (not available in Node.js):

```js
console.log(window)
alert('Hello')
```

---

## 🌐 Browser vs Node.js

| Browser  | Node.js      |
| -------- | ------------ |
| window   | global       |
| alert    | console.log  |
| DOM      | No DOM       |
| UI-based | Server-based |

---

## ✅ Class Summary

* What is Node.js
* Why Node.js is used
* First HTTP server
* Core modules
* File system operations
* Sync vs Async
* Global objects

---

## ⏭ Next Class

* Node.js Architecture
* Event Loop
* Blocking vs Non-Blocking I/O
* Introduction to npm

---

**End of Class 1**
