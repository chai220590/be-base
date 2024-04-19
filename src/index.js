import cors from "cors";
import express from "express";

import compression from "compression";
import helmet from "helmet";
import config from "./configs/config.js";
import AuthRoutes from "./routes/auth.route.js";

// =============== connect mongodb
import instanceMongodb from "./db/mongo.connection.js";
// ===============

import HelloRoutes from "./routes/hello.route.js";

const app = express();

//initial app
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//helmet
app.use(helmet());

//compression
app.use(compression());

//init routes
app.use("/api/auth", AuthRoutes);
app.use("/api/hello", HelloRoutes);

const PORT = config.app.port;

app.listen(PORT, () => {
  console.log(`Let's go: ${PORT}`);
});
