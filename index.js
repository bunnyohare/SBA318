const express = require("express");
const app = express();
const port = 5005;
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");

app.use("/user", userRoutes);
app.use("/post", postRoutes);


const logReq = function (req, res, next) {
  console.log("Request Received");
  next();
};

app.use(logReq);

  // error handler use this in SBA for error handling middleware
  app.use((err, req, res, next) => {
    res.status(400).send(err.message);
  });

//MIDDLEWARE
//BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.get("/", (req, res) => {
  res.send("Work in progress");
});


// //GET all Posts
// app.get("/api/posts", (req, res) => {
//   res.json(posts);
// });

// //GET Post by id
// app.get("/api/posts/:id", (req, res, next) => {
//   const post = posts.find((p) => p.id == req.params.id);
//   if (post) res.json(post);
//   else next();
// });

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
