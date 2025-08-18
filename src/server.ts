// import mongoose from "mongoose";
// import app from "./app";

// async function main() {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://mongoose-ass3:mongoose1234@cluster0.dxmnpk6.mongodb.net/mongoose-ass3?retryWrites=true&w=majority&appName=Cluster0"
//     );
//     app.listen(5000, () => {
//       console.log(`Example app listening on port ${5000}`);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
// main();
import mongoose from "mongoose";
import app from "./app";
import config from "./config";

const PORT = config.port || 5000;

async function connectDB() {
  try {
    await mongoose.connect(config.database as string);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
}

if (config.nodeEnv !== "production") {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
}

export default async function handler(req: any, res: any) {
  await connectDB();
  return app(req, res);
}
