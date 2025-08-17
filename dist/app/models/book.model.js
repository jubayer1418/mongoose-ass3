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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// {
//   "title": "The Theory of Everything",
//   "author": "Stephen Hawking",
//   "genre": "SCIENCE",
//   "isbn": "9780553380163",
//   "description": "An overview of cosmology and black holes.",
//   "copies": 5,
//   "available": true
// }
const bookSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "Author is required"],
        trim: true,
    },
    genre: {
        type: String,
        required: [true, "Genre is required"],
        enum: {
            values: [
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
            ],
            message: "{VALUE} is not a valid genre",
        },
        uppercase: true,
    },
    isbn: {
        type: String,
        required: [true, "ISBN is required"],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        default: "",
    },
    copies: {
        type: Number,
        required: [true, "Copies count is required"],
        min: [0, "Copies cannot be negative"],
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not an integer",
        },
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
bookSchema.post("findOneAndUpdate", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.Book.updateAvailability(doc._id);
        next();
    });
});
bookSchema.statics.updateAvailability = function (bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield exports.Book.findById(bookId);
        if (!book) {
            throw new Error("Book not found");
        }
        if (book.copies === 0) {
            book.available = false;
            yield book.save();
        }
        else {
            book.available = true;
            yield book.save();
        }
    });
};
exports.Book = mongoose_1.default.model("Book", bookSchema);
