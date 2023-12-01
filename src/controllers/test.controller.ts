import { Request, Response } from "express";

const getTest = (req: Request, res: Response) => {
  res.send("Hello World");
};

const testController = {
  getTest,
};

export default testController;
