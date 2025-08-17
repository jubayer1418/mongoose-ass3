import express, { Application, Request, Response } from "express";
import { booksRouter } from "./app/controllers/book.controller";
import { borrowRouter } from "./app/controllers/borrow.controller";
import { errorHandler } from "./middleware/errorHandler";
const app: Application = express();

app.use(express.json());
app.use("/api", booksRouter);
app.use("/api", borrowRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});
app.use(errorHandler);
export default app;
