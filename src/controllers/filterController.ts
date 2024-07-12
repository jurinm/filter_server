import { Request, Response } from "express";

export function filterController(req: Request, res: Response) {
  res.json({ testMessage: "test" });
}
