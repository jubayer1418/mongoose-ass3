"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: "Validation failed",
            success: false,
            error: err,
        });
    }
    res.status(500).json({
        message: "Something went wrong",
        success: false,
        error: err.message,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map