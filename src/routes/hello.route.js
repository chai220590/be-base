import { Router } from "express";

import HelloService from "../services/hello.service.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const HelloRoutes = Router();

// get All
HelloRoutes.get("/", AuthMiddleware, new HelloService().sayHi);

export default HelloRoutes;