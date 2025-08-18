import mongoose from "mongoose";
import app from "./app";

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://mongoose-ass3:mongoose1234@cluster0.dxmnpk6.mongodb.net/mongoose-ass3?retryWrites=true&w=majority&appName=Cluster0"
    );
    app.listen(5000, () => {
      console.log(`Example app listening on port ${5000}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
