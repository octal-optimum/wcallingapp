
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token,"Helloiamsiva", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
 
  if (!req.headers.authorization.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized request");
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = await verifyToken(token);
    
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).send(err.message);
  }
};