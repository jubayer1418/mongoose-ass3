"use strict";
// import mongoose from "mongoose";
// import app from "./app";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const PORT = config_1.default.port || 5000;
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.database);
            console.log("✅ MongoDB connected");
        }
        catch (err) {
            console.error("❌ DB connection error:", err);
        }
    });
}
if (config_1.default.nodeEnv !== "production") {
    connectDB().then(() => {
        app_1.default.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    });
}
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectDB();
        return (0, app_1.default)(req, res);
    });
}
