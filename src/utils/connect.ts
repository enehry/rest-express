import config from "config";
import mongoose from "mongoose";
import logger from "./logger";

export default async function connect()  {
  const dbUri = config.get<string>("dbUri");

  try {
     mongoose.set('strictQuery', false);
     await mongoose.connect(dbUri);
     logger.info("Connected to database")
  } catch (error) {
    logger.error(`Error connecting to database: ${error}`);
    process.exit(1);
  }

}