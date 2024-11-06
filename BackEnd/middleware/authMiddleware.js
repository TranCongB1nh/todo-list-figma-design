require('dotenv').config()
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const { httpStatusCodes } = require("../utils/constant");

function authenticateToken(handler) {
  return async (request, response) => {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      response.statusCode = httpStatusCodes.UNAUTHORIZED;
      response.end(JSON.stringify({ error: "Authorization token is missing or invalid." }));
      return;
    }

    const token = authHeader.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, secretKey); // Verify token validity and expiration
      

      request.user = { userId: decodedToken.userId }; // Attach userId to request
      await handler(request, response); // Continue processing the request
    } catch (error) {
      console.error("Token verification error:", error.message);
      response.statusCode = httpStatusCodes.UNAUTHORIZED;
      response.end(JSON.stringify({ error: "Invalid or expired token." }));
    }
  };
}

module.exports = authenticateToken;