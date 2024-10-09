const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "SECRET"; // Ensure this is set in your .env

function extractToken(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }
    return authHeader.split(" ")[1]; // Extract the token
}

function userMiddleware(req, res, next) {
    const token = extractToken(req);
    if (!token) {
        return res.status(401).json({ msg: "No token provided" });
    }

    try {
        const decodedValue = jwt.verify(token, JWT_SECRET);
        if (decodedValue && decodedValue.userId) {
            req.userId = decodedValue.userId; // Attach userId to request
            next();
        } else {
            return res.status(403).json({ msg: "Invalid token or user not authenticated" });
        }
    } catch (e) {
        return res.status(403).json({ msg: "Token verification failed" });
    }
}
module.exports = { userMiddleware };
