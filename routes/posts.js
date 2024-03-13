const express = require("express");
const router = express.Router();
const posts = require("../data/posts");

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Posts Request Time: ", Date.now());
  next();
});

// GET all posts
router.get('/', (req, res) => {
  res.json(posts);
});

// GET post by ID
router.get('/:id', (req, res, next) => {
  try {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) {
      // Post not found, send 404 response
      return res.status(404).send('Post not found');
    }
    res.json(post);
  } catch (error) {
    // Handle errors
    console.error(error);
    next(error);
  }
});


// POST new post
router.post('/', (req, res) => {
  if (req.body.userId && req.body.title && req.body.content) {
    if (posts.find((p) => p.title == req.body.title)) {
      res.json({ error: `title already taken` });
      return;
    }

    const newPost = {
      id: posts[posts.length - 1].id + 1,
      userId: req.body.userId,
      title: req.body.title,
      content: req.body.content,
    };

    posts.push(newPost);
    res.json(posts[posts.length - 1]);
  } else {
    res.json({ error: "Insufficient Data" });
  }
});

// DELETE post
router.delete('/:id', (req, res) => {
  const post = posts.find((p, i) => {
    if (p.id == req.params.id) {
      posts.splice(i, 1);
      return true;
    }
  });
  if (post) res.json(post);
  else next();
});

module.exports = router;
