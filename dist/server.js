"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
let server;
const PORT = config_1.default.port;
async function main() {
    try {
        await mongoose_1.default.connect(config_1.default.database);
        console.log("Connected to MongoDB Using Mongoose!!");
        server = app_1.default.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
        return server;
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=server.js.map