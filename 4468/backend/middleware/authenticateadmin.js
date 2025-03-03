const jwt = require("jsonwebtoken");

function authenticateAdmin(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_TOKEN, (err, admin) => {
    if (err) {
      console.error("Token verification failed:", err.message);
      return res.sendStatus(403);
    }
    
    if (!admin.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    
    req.email = admin.email;
    next();
  });
}

module.exports = authenticateAdmin;
