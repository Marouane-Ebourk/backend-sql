const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send("access deiend");
  }
  try {
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
