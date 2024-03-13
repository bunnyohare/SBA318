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


//MIDDLEWARE
//BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.get("/", (req, res) => {
  res.send("Work in progress");
});

// Lesson error handling middleware
app.use((req, res) => {
  res.status(404);
  res.json({ error: `Sorry, resource not found` });
});


app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
