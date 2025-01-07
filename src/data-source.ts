import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/user";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
    username: process.env.POSTGRES_USER || "your_username",
    password: process.env.POSTGRES_PASSWORD || "your_password",
    database: process.env.POSTGRES_DB || "your_database",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
});
