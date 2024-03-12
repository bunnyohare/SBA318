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
router.route("/") //assumes /user
  // GET all USERS
router.get("/api/users", (req, res) => {
    res.json(users);
 });
  // GET USER by id
router.get("/api/users/:id", (req, res, next) => {
  try {
    const user = users.find((u) => u.id == req.params.id);
    if (user) res.json(user);
    next();
  } catch (error) {
    console.error(error);
  }
});
  // POST USER - create a new user
router.post("/api/users", (req, res) => {
    // Within the POST request route, we create a new
    // user with the data given by the client.
    // We should also do some more robust validation here,
    // but this is just an example for now.
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
  router.delete("/api/users/:id", (req, res) => {
  const user = users.find((u, i) => {
    if (u.id == req.params.id) {
      users.splice(i, 1);
      return true;
    }
  });

  if (user) res.json(user);
  else next();
});

// define the user settings page
// similarly, this route is "/user/settings".
router.get("/settings", (req, res) => {
  res.send("Get User Settings");
});

module.exports = router;
