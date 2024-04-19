import env from "../utils/env.js";
const dev = {
    app: {
        port: env("DEV_APP_PORT"),
    },
    connections: {
        mongoConnectionString: env("DEV_MONGO_CONNECTION_STRING"),
        mongoDBName: env("DEV_MONGO_DB_NAME"),
    },
    api: {
        accessTokenKey: env("DEV_ACCESS_TOKEN"),
        refreshTokenKey: env("DEV_REFRESH_TOKEN"),
    },
};
const product = {
    app: {
        port: env("PRO_APP_PORT"),
    },
    connections: {
        mongoConnectionString: env("PRO_MONGO_CONNECTION_STRING") || "",
        mongoDBName: env("PRO_MONGO_DB_NAME"),
    },
    api: {
        accessTokenKey: env("PRO_ACCESS_TOKEN"),
        refreshTokenKey: env("PRO_REFRESH_TOKEN"),
    },
};

const config = { dev, product };
const currentEnv = process.env.NODE_DEV || "dev";
export default config[currentEnv];
