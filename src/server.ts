import app from "./app";
import "dotenv/config";
import { AppDataSource } from "./data-source";

const port = process.env.APP_PORT;

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected!");
        app.listen(port, async () => {
            console.log(`Server is running on port ${port}!`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
