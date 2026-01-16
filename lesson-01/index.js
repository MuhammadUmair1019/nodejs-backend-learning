// ===============================
// Node.js Class 1 
// ===============================

// 1. HTTP MODULE – Create a simple server
import http from 'http';

const server = http.createServer((req, res) => {
    console.log("Request received");

    res.end("Hello World from Node.js");
});

server.listen(3000, () => {
    console.log("Server started on port 3000");
});


// ===============================
// 2. OS MODULE – System info
// ===============================

// import os from 'os';
// console.log("Home Directory:", os.homedir());


// ===============================
// 3. FILE SYSTEM (fs MODULE)
// ===============================

// import fs from 'fs';

// ---------- WRITE FILE (SYNC) ----------
// console.log("Start");
// fs.writeFileSync('./test.txt', 'Hello World');
// console.log("End");

// ---------- WRITE FILE (ASYNC) ----------
// console.log("Start");
// fs.writeFile('./test.txt', 'Hello Node.js', (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("File written successfully");
//     }
// });
// console.log("End");

// ---------- READ FILE (SYNC) ----------
// const data = fs.readFileSync('./test.txt', 'utf-8');
// console.log(data);

// ---------- READ FILE (ASYNC) ----------
// fs.readFile('./test.txt', 'utf-8', (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });

// ---------- UPDATE FILE ----------
// fs.appendFile('./test.txt', 'Hello JavaScript\n', (err) => {
//     if (err) throw err;
//     console.log("File updated");
// });

// ---------- DELETE FILE ----------
// fs.unlink('./test.txt', (err) => {
//     if (err) throw err;
//     console.log("File deleted");
// });

// ---------- CREATE FOLDER ----------
// fs.mkdir('./views', (err) => {
//     if (err) console.log(err);
// });


// ===============================
// CUSTOM MODULE EXAMPLE
// ===============================

// import { add } from './calc.js';
// console.log(add(2, 2));


// ===============================
// TIMER
// ===============================

// setTimeout(() => {
//     console.log("Hello after 3 seconds");
// }, 3000);


// ===============================
// GLOBAL OBJECT
// ===============================

// console.log(global);

// ❌ Browser-only (will not work in Node.js)
// console.log(window);
// alert("Hello");
