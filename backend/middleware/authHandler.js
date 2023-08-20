const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        res.status(403);
        throw new Error("user not authorized");
      }
      // console.log(decode);
      req.user = decode.user;
      next();
    });
    if (!token) {
      res.status(403);
      throw new Error("user not authorized");
    }
  }
});

const authAdmin = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        res.status(403);
        throw new Error("user not authorized");
      }
      // console.log(decode);
      req.user = decode.user;
      if (req.user.role == "admin") {
        next();
      }
      else if (req.user.role == "manager") {
        res.status(403);
        throw new Error("you are not authorized as Admin");
      }
    });
    if (!token) {
      res.status(403);
      throw new Error("user not authorized");
    }
  }
});

module.exports = {validateToken,authAdmin};
