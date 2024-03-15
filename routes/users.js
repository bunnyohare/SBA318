const express = require("express");
const router = express.Router();
const users = require("../data/users");

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("User Request Time: ", Date.now());
  next();
});

// Route for /user
router
  .route("/")
  .get((req, res) => {
    res.json(users);
  })
  .post((req, res) => {
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

// Route for /user/ID_OF_USER
router
  .route("/:id")
  .get((req, res, next) => {
    try {
      const user = users.find((u) => u.id === parseInt(req.params.id));
      if (!user) {
        // User not found, send 404 response
        return res.status(404).send("User not found");
      }
      res.json(user);
    } catch (error) {
      // Handle errors
      console.error(error);
      next(error);
    }
  })
  .delete((req, res) => {
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
