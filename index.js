const express = require("express");
const app = express();
const port = 5005;
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
//const postRoutes = require("./routes/post");
app.use("/user", userRoutes);
//app.use("/post", postRoutes);

const users = require("./data/users");
const posts = require("./data/posts");


// // DOCS error handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(404).json({ error: `Resource not found` });
// });

//MIDDLEWARE
//BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.get("/", (req, res) => {
  res.send("Work in progress");
});


//GET all Posts
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

//GET Post by id
app.get("/api/posts/:id", (req, res, next) => {
  const post = posts.find((p) => p.id == req.params.id);
  if (post) res.json(post);
  else next();
});

//Lesson error handling middleware
app.use((req, res) => {
  res.status(404);
  res.json({ error: `Resource not found` });
});

// //The code above written as a catch-all route
// app.get('/*', (req, res)=>{
//     res.status(404);
//     res.json({ error: `Resource not found` });
// })

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
