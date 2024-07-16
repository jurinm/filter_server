import { Request, Response } from "express";
import { filterMessages } from "../actions/filterMessages";
import mockMessages from "../../mockMessages";

export function filterController(req: Request, res: Response) {
  const { messages, filter } = req.body;
  const result = filterMessages(mockMessages, filter);

  if (Array.isArray(result)) {
    res.status(200).json({ result, error: "" });
  } else {
    res.json(result);
  }
}
