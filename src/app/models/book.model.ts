import mongoose from "mongoose";
import { IBook, IBookModel } from "../interfaces/book.interface";
// {
//   "title": "The Theory of Everything",
//   "author": "Stephen Hawking",
//   "genre": "SCIENCE",
//   "isbn": "9780553380163",
//   "description": "An overview of cosmology and black holes.",
//   "copies": 5,
//   "available": true
// }
const bookSchema = new mongoose.Schema<IBook, IBookModel>(
  {
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
  },
  {
    timestamps: true,
  }
);
bookSchema.post("findOneAndUpdate", async function (doc, next) {
  await Book.updateAvailability(doc._id);
  next();
});

bookSchema.statics.updateAvailability = async function (bookId: string) {
  const book = await Book.findById(bookId);
  if (!book) {
    throw new Error("Book not found");
  }

  if (book.copies === 0) {
    book.available = false;
    await book.save();
  } else {
    book.available = true;
    await book.save();
  }
};

export const Book = mongoose.model<IBook, IBookModel>("Book", bookSchema);
