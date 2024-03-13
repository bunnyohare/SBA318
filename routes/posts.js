const express = require("express");
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("User Request Time: ", Date.now());
  next();
});

// define the base user page routes
// note that the base route "/" is actually
// "/user/", because of the way the main app
// uses this router within index.js
router
  .route("/") //assumes /user
  // GET all POSTS
  .get("/api/posts", (req, res) => {
    res.json(posts);
  })
  // GET POSTS by id
  .get("/api/posts/:id", (req, res, next) => {
  try {
    const post = posts.find((p) => p.id == req.params.id);
    if (post) res.json(post);
    next();
  } catch (error) {
    console.error(error);
  }
})
  
  // DELETE post
  .delete("/api/posts/:id", (req, res) => {
  const post = posts.find((p, i) => {
    if (p.id == req.params.id) {
      users.splice(i, 1);
      return true;
    }
  });

  if (post) res.json([post]);
  else next();
});

// define the user settings page
// similarly, this route is "/post/settings".
router.get("/settings", (req, res) => {
  res.send("Get Post Settings");
});

module.exports = router;
