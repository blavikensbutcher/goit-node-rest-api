import mongoose from "mongoose";
import app from "./app.js";

// Usually we have a config file (config/index.js) where we store all config variables
const startServer = async () => {
    return mongoose
        .connect(process.env.DB_HOST)
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log("Database connection successful");
                console.log(
                    `Server is running. Use our API on port: ${process.env.PORT}`,
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
