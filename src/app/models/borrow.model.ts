import mongoose, { Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import { Book } from "./book.model";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Missing required fields"],
    },
    quantity: {
      type: Number,
      required: [true, "Missing required fields"],
      min: [1, "Quantity must be positive"],
    },
    dueDate: {
      type: Date,
      required: [true, "Missing required fields"],
    },
  },
  { timestamps: true }
);

borrowSchema.pre("save", async function (next) {
  // const Book = this.model("Book");
  const book = await Book.findById(this.book);

  if (!book) {
    throw new Error("Book not found");
  }

  if (book.copies < this.quantity) {
    throw new Error(`Not enough copies available ${book.copies} left`);
  }

  book.copies -= this.quantity;
  await book.save();

  await Book.updateAvailability(this.book);

  next();
});

export const Borrow = mongoose.model<IBorrow>("Borrow", borrowSchema);
