const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ mensaje: "Token requerido" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secreto");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ mensaje: "Token inválido" });
  }
};