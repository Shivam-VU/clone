const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  const decode = jwt.verify(token, process.env.JWT_TOKEN, async (err, user) => {
    if (err) {
      console.error("Token verification failed:", err.message);
      return res.sendStatus(403);
    }
    req.email = user.email;
  });
  next()
}

module.exports = authenticateToken;
