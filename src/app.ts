// src/index.ts
import express from "express";
import { AppDataSource } from "./data-source";
import { userRouter } from "./routes/user.routes";

const app = express();
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source initialized");
        app.use("/users", userRouter);

        app.listen(3000, () => {
            console.log("Server running on http://localhost:3000");
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
