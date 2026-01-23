import express from "express";
import fs from "fs";
import { users } from "./MOCK_DATA.js";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Base Route");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const userId = +req.params.id;
  console.log(userId);
  const user = users.find((u) => u.id === userId);

  console.log(user);
  res.json(user);
});


app.post("/users", (req, res) => {
  console.log(req.body);
  const user = req.body;
  user.id = users.length + 1


  fs.appendFile("./MOCK_DATA.js", JSON.stringify(user), (err) => {
    res.status(201).json(user);
  });
  // users.push(user)

  // res.status(201).send("Got Post Route")
});

app.use((req, res) => {
  res.status(404).send("page not found :(");
});

app.listen(port, () => {
  console.log(`Server listing on port ${port}`);
});

//--------------------------------------------------------------------
// import express from "express";
// import { users } from "./MOCK_DATA.js";

// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Base Route");
// });

// app.get("/users", (req, res) => {
// //   console.log(users);
//   //   res.send("User Route");

//   res.json(users);
// });

// app.get("/posts", (req, res) => {
//   res.send("Post Route");
// });

// app.use((req, res) => {
//   res.status(404).send("page not found :(");
// });

// app.listen(port, () => {
//   console.log(`Server listing on port ${port}`);
// });

// --------------------------------------------------
// import express from 'express'
// import path from 'path'
// import { fileURLToPath } from 'url'

// // __dirname FOR ES MODULE
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//     // console.log(__filename)
//     // console.log(__dirname)
//     // console.log(path.join(__dirname, 'views', 'home.html'))
//     res.sendFile(path.join(__dirname, 'views', 'home.html'))
// })

// app.get('/about', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'about.html'))
// })

// // 404 Middleware
// app.use((req, res) => {
//     res.status(404).send('Page Not Found')
// })

// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`)
// })
