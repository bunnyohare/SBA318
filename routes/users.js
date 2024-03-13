const express = require("express");
const router = express.Router();
const users = require("../data/users");

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("User Request Time: ", Date.now());
  next();
});

// GET all users
router.get('/', (req, res) => {
  res.json(users);
});

// GET user by ID
router.get('/:id', (req, res) => {
  try {
    const user = users.find((u) => u.id == req.params.id);
    if (user) res.json(user);
    next();
  } catch (error) {
    console.error(error);
  }
});

// POST new user
router.post('/', (req, res) => {
  if (req.body.name && req.body.username && req.body.email) {
    if (users.find((u) => u.username == req.body.username)) {
      res.json({ error: `Username already taken` });
      return;
    }

    const newUser = {
      id: users[users.length - 1].id + 1,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
    };

    users.push(newUser);
    res.json(users[users.length - 1]);
  } else {
    res.json({ error: "Insufficient Data" });
  }
});

// DELETE user
router.delete('/:id', (req, res) => {
  const user = users.find((u, i) => {
    if (u.id == req.params.id) {
      users.splice(i, 1);
      return true;
    }
  });

  if (user) res.json(user);
  else next();
});

module.exports = router;