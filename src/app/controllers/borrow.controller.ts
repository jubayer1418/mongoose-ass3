import { Request, Response, Router } from "express";
import { Borrow } from "../models/borrow.model";

interface BorrowRequest {
  book: string;
  quantity: number;
  dueDate: string;
}
export const borrowRouter = Router();
borrowRouter.post("/borrow", async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate }: BorrowRequest = req.body;

    const borrowRecord = {
      book,
      quantity,
      dueDate: new Date(dueDate),
    };

    const result = await Borrow.create(borrowRecord);

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error borrowing book:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
});
borrowRouter.get("/borrow", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
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
  } catch (error) {
    console.error("Error fetching ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
});
