const jwt = require("jsonwebtoken");

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    console.log("here!")
    try {
      const token = req.headers.authorization.split(" ")[1]; // Bearer asfa.snfkaj.sfnjk
      if (!token) {
        return res.status(401).json({ message: "Не авторизован" });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== "admin") {
        if (decoded.role !== role) {
          return res.status(403).json({ message: "Нет доступа" });
        }
      }

      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({ message: "Не авторизован" });
    }
  };
};
