import { Request, Response, Router } from "express";
import { Book } from "../models/book.model";
interface BookQueryParams {
  filter?: string;
  sortBy?: string;
  sort?: "asc" | "desc";
  limit?: number;
}

export const booksRouter = Router();
booksRouter.post("/books", async (req: Request, res: Response) => {
  const body = req.body;
  const book = await Book.create(body);

  res.status(201).json({
    success: true,
    message: "Book created successfuly",
    data: book,
  });
});
booksRouter.get("/books", async (req: Request, res: Response) => {
  const query: Record<string, unknown> = {};

  const {
    filter,
    sortBy = "createdAt",
    sort = "asc",
    limit = 10,
  }: BookQueryParams = req.query;

  if (filter) query.genre = filter.toUpperCase();

  const sortOrder: number = sort.toLowerCase() === "desc" ? -1 : 1;
  const sortConfig: any = { [sortBy]: sortOrder };

  const books = await Book.find(query).sort(sortConfig).limit(Number(limit));
  res.status(201).json({
    success: true,
    message: "Book created successfuly",
    data: books,
  });
});
booksRouter.get("/books/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  console.log(bookId);
  const book = await Book.findById(bookId);
  res.status(200).json({
    success: true,
    message: "Book retrieved successfully",
    data: book,
  });
});
booksRouter.patch("/books/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const updateData = req.body;

  const updatedBook = await Book.findOneAndUpdate({ _id: bookId }, updateData, {
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
booksRouter.delete("/books/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  console.log(bookId);
  const book = await Book.findByIdAndDelete(bookId);
  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    data: null,
  });
});
