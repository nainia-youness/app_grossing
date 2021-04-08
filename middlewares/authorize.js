// middlewares/auth.js
const jwt = require("jsonwebtoken");
const tconfig = require('../config/config');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.token.split(" ")[0];
        jwt.verify(token, tconfig.jwt_secret_t);
        next();
    } catch (error) {
        res.status(401).json({ message: "No valid token provided or expired" });
    }
};