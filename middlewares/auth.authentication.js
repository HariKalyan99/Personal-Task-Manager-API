const config = require("../config");
const user = require("../db/models/user");
const jwt = require("jsonwebtoken");

const authentication = async (request, response, next) => {
  const authorizationHeader = request.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
    return response.status(401).json({ error: "Please log in to get access" });
  }
  
  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    return response.status(401).json({ error: "Token missing. Please log in" });
  }

  try {
    const decodedToken = jwt.verify(token, config.jwtsecret);
    const userId = decodedToken.id;

    const userExist = await user.findByPk(userId);
    if (!userExist) {
      return response.status(404).json({ error: "User no longer exists" });
    }

    request.user = userExist;
    next();
  } catch (error) {
    return response.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authentication;
