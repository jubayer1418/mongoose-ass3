import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
