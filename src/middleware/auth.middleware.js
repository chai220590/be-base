import jwt from "jsonwebtoken";
import config from "../configs/config.js";

async function AuthMiddleware(req, res, next) {
    try {
        const token = (req.header("Authorization") || "").toString().replace("Bearer ", "");

        if (!token) {
            return res.status(403).json({
                success: false,
                message: "Access denied. No token provided.",
            });
        }

        const payload = jwt.verify(token, config.api.accessTokenKey);
        req.user = payload;
        next();
    } catch (error) {
        console.log({ error });
        if (error.message == "jwt expired") {
            return res.status(401).json({
                success: false,
                message: "Token is expired",
            });
        }
        return res.status(401).json({
            success: false,
            message: error,
        });
    }
}
export default AuthMiddleware;