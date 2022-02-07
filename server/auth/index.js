const router = require("express").Router();
const Users = require("../db/models/User");

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await Users.authenticate(req.body) });
  } catch (error) {
    next(error);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await Users.create(req.body);
    res.send({ token: await user.generateToken() }, "User created");
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    const User = await Users.findByToken(req.headers.authorization);
    res.send(User);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

