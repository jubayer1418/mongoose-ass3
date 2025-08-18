import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config";

let server: Server;

const PORT = config.port;

async function main() {
  try {
    await mongoose.connect(config.database!);
    console.log("Connected to MongoDB Using Mongoose!!");
    server = app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
    return server;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
