import { Router } from "express";
import AuthService from "../services/auth.service.js";

const AuthRoutes = Router();

// đăng ký tài khoản
AuthRoutes.post("/register", new AuthService().register);

// đăng nhập
AuthRoutes.post("/login", new AuthService().login);

export default AuthRoutes;