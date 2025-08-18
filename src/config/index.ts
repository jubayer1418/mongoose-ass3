import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  nodeEnv: process.env.NODE_ENV,
  database: process.env.DATABASE_URL,
  port: process.env.PORT,
};
