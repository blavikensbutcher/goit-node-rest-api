import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";

const startServer = async () => {
    return mongoose
        .connect(config.DB_HOST)
        .then(() => {
            app.listen(config.PORT, () => {
                console.log("Database connection successful");
                console.log(
                    `Server is running. Use our API on port: ${config.PORT}`,
                );
            });
        })
        .catch((error) => {
            console.log("Database connect unsuccessfully");
            console.error(error.message);
            process.exit(1);
        });
}

await startServer()
