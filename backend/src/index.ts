import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { connectToDatabase } from "./database";
import { FoodRouter } from "./routes/food.routes";
import { CategoryRouter } from "./routes/category.routes";
import { AuthRouter, OrderRouter } from "./routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/foods", FoodRouter);
app.use("/categories", CategoryRouter);
app.use("/auth", AuthRouter);
app.use("/order", OrderRouter);

const bootstrap = async () => {
  try {
    await connectToDatabase();

    app.listen(env.port, () => {
      console.log(`Backend listening on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start backend", error);
    process.exit(1);
  }
};

void bootstrap();

export default app;
