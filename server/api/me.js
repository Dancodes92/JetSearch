const router = require("express").Router();

router.get("/me", (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = User.findByToken(token);
    if (!user) {
      return res.status(401).send({ error: "Not Authorized" });
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;
