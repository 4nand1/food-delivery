import { connect } from "mongoose";
import { env } from "../config/env";
import { seedDatabase } from "./seed";

export const connectToDatabase = async () => {
  await connect(env.mongoUrl);
  await seedDatabase();
};
