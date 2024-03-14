const express = require("express");
const router = express.Router();
const comments = require("../data/comments");

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Comments Request Time: ", Date.now());
  next();
});

// GET all comments
router.get('/', (req, res) => {
  res.json(comments);
});

// GET COMMENT by ID
router.get('/:id', (req, res, next) => {
  try {
    const comment = comments.find((p) => p.id === parseInt(req.params.id));
    if (!comment) {
      // Comment not found, send 404 response
      return res.status(404).send('Post not found');
    }
    res.json(comment);
  } catch (error) {
    // Handle errors
    console.error(error);
    next(error);
  }
});


// POST new Comment one comment per email address
router.post('/', (req, res) => {
  if (req.body.postId && req.body.Name && req.body.email && req.body.body) {
    if (comments.find((p) => p.email == req.body.email)) {
      res.json({ error: `Already commented.` });
      return;
    }

    const newComment = {
      id: comments[comments.length - 1].id + 1,
      postId: req.body.postId,
      email: req.body.email,
      body: req.body.body,
    };

    comments.push(newComment);
    res.json(comments[comments.length - 1]);
  } else {
    res.json({ error: "Insufficient Data" });
  }
});

// DELETE Comment 
router.delete('/:id', (req, res) => {
  const comment = comments.find((p, i) => {
    if (p.id == req.params.id) {
        comments.splice(i, 1);
      return true;
    }
  });
  if (comment) res.json(comment);
  else next();
});

module.exports = router;
