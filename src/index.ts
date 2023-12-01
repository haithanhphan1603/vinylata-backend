import express, { Express, Request, Response, Application } from "express";
import helmet from "helmet";
import cors from "cors";
import xss from "xss";

import testRoutes from "./routes/testRoutes";
import userRoutes from "./routes/userRoutes";
import categoryRoutes from "./routes/categoryRoutes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(helmet());
app.use(cors());

app.use("/api/v1/test", testRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/categories", categoryRoutes);

export default app;
