"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = require("express");
const book_model_1 = require("../models/book.model");
exports.booksRouter = (0, express_1.Router)();
exports.booksRouter.post("/books", async (req, res) => {
    const body = req.body;
    const book = await book_model_1.Book.create(body);
    res.status(201).json({
        success: true,
        message: "Book created successfuly",
        data: book,
    });
});
exports.booksRouter.get("/books", async (req, res) => {
    const query = {};
    const { filter, sortBy = "createdAt", sort = "asc", limit = 10, } = req.query;
    if (filter)
        query.genre = filter.toUpperCase();
    const sortOrder = sort.toLowerCase() === "desc" ? -1 : 1;
    const sortConfig = { [sortBy]: sortOrder };
    const books = await book_model_1.Book.find(query).sort(sortConfig).limit(Number(limit));
    res.status(201).json({
        success: true,
        message: "Book created successfuly",
        data: books,
    });
});
exports.booksRouter.get("/books/:bookId", async (req, res) => {
    const bookId = req.params.bookId;
    console.log(bookId);
    const book = await book_model_1.Book.findById(bookId);
    res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
    });
});
exports.booksRouter.patch("/books/:bookId", async (req, res) => {
    const bookId = req.params.bookId;
    const updateData = req.body;
    const updatedBook = await book_model_1.Book.findOneAndUpdate({ _id: bookId }, updateData, {
        new: true,
        runValidators: true,
    });
    if (!updatedBook) {
        return res.status(404).json({
            success: false,
            message: "Book not found",
        });
    }
    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: updatedBook,
    });
});
exports.booksRouter.delete("/books/:bookId", async (req, res) => {
    const bookId = req.params.bookId;
    console.log(bookId);
    const book = await book_model_1.Book.findByIdAndDelete(bookId);
    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
    });
});
//# sourceMappingURL=book.controller.js.map