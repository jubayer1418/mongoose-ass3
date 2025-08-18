"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRouter = void 0;
const express_1 = require("express");
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRouter = (0, express_1.Router)();
exports.borrowRouter.post("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        const borrowRecord = {
            book,
            quantity,
            dueDate: new Date(dueDate),
        };
        const result = yield borrow_model_1.Borrow.create(borrowRecord);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: result,
        });
    }
    catch (error) {
        console.error("Error borrowing book:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error,
        });
    }
}));
exports.borrowRouter.get("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails",
                },
            },
            {
                $unwind: "$bookDetails",
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn",
                    },
                    totalQuantity: 1,
                },
            },
            {
                $sort: { totalQuantity: -1 },
            },
        ]);
        return res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary,
        });
    }
    catch (error) {
        console.error("Error fetching ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error,
        });
    }
}));
